"""
DiaCare backend API
===================

Loads the model trained by ml/train_model.py and answers the website.

    POST /predict   ->  { "risk_level": "Low|Moderate|High", "probability": 0.18 }
    GET  /health    ->  { "status": "ok", ... }

Run (from the project folder):
    pip install -r backend/requirements.txt
    python backend/app.py

The model files are read from ml/artifacts/ by default.
Set DIACARE_ARTIFACTS=/other/folder to change that.

IMPORTANT: "probability" is the model's calibrated SCREENING SCORE on
NHANES-style data. It is not a person's actual medical probability, and
the risk tiers are relative. This is a risk-awareness tool, not a diagnosis.
"""

import json
import os
from pathlib import Path

import joblib
import pandas as pd
from flask import Flask, jsonify, request

ARTIFACT_DIR = Path(
    os.environ.get(
        "DIACARE_ARTIFACTS",
        Path(__file__).resolve().parent.parent / "ml" / "artifacts",
    )
)

# Websites allowed to call this API. Add your hosted site address here, e.g.
#   DIACARE_ALLOWED_ORIGINS="https://yourname.github.io"
ALLOWED_ORIGINS = {
    origin.strip()
    for origin in os.environ.get(
        "DIACARE_ALLOWED_ORIGINS",
        "http://127.0.0.1:5500,http://localhost:5500,"
        "http://127.0.0.1:8000,http://localhost:8000",
    ).split(",")
    if origin.strip()
}

ALLOW_FILE_ORIGIN = os.environ.get("DIACARE_ALLOW_FILE_ORIGIN", "1") == "1"

app = Flask(__name__)


# ----------------------------------------------------------------------
# Load the model once, when the server starts
# ----------------------------------------------------------------------

def load_artifacts():
    model_path = ARTIFACT_DIR / "diacare_model.joblib"
    meta_path = ARTIFACT_DIR / "model_metadata.json"

    if not model_path.exists() or not meta_path.exists():
        raise SystemExit(
            f"Model files not found in {ARTIFACT_DIR}\n"
            "Train the model first:  python ml/train_model.py "
            "--data-dir <nhanes folder> --out-dir ml/artifacts"
        )

    return (
        joblib.load(model_path),
        json.loads(meta_path.read_text(encoding="utf-8")),
    )


MODEL, META = load_artifacts()
FEATURES = META["features"]
LIMITS = {
    "age": (META["age_min"], META["age_max"]),
    "bmi": (META["bmi_min"], META["bmi_max"]),
}
TIERS = META["risk_tiers"]


# ----------------------------------------------------------------------
# Input validation (never trust the browser)
# ----------------------------------------------------------------------

class BadInput(ValueError):
    pass


def number(data, key, low, high, integer=False):
    value = data.get(key)

    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise BadInput(f"'{key}' must be a number")
    if value != value or value in (float("inf"), float("-inf")):
        raise BadInput(f"'{key}' must be a finite number")
    if integer and int(value) != value:
        raise BadInput(f"'{key}' must be a whole number")
    if not low <= value <= high:
        raise BadInput(f"'{key}' must be between {low} and {high}")

    return value


def clean_payload(data):
    if not isinstance(data, dict):
        raise BadInput("Request body must be a JSON object")

    age = number(data, "age", *LIMITS["age"], integer=True)
    height = number(data, "height", 100, 250)
    weight = number(data, "weight", 30, 300)

    # Recalculate BMI on the server so a wrong value cannot slip through
    bmi = weight / ((height / 100) ** 2)
    if not LIMITS["bmi"][0] <= bmi <= LIMITS["bmi"][1]:
        raise BadInput("height and weight give an unrealistic BMI")

    sex = data.get("sex")
    if sex not in ("male", "female", "unspecified"):
        raise BadInput("'sex' must be 'male', 'female' or 'unspecified'")

    return {
        "age": age,
        "bmi": bmi,
        "sex": sex,
        "family_history": int(number(data, "family_history", 0, 1, True)),
        "high_blood_pressure": int(number(data, "high_blood_pressure", 0, 1, True)),
        "physical_activity": int(number(data, "physical_activity", 0, 3, True)),
    }


# ----------------------------------------------------------------------
# Prediction
# ----------------------------------------------------------------------

def score(clean):
    """
    sex 'male' / 'female' -> use it.
    sex 'unspecified'     -> average the prediction for male and female,
                             so no biological value is invented.
    """
    def row(sex_male):
        values = {**clean, "sex_male": sex_male}
        return [values[name] for name in FEATURES]

    if clean["sex"] == "unspecified":
        rows = [row(1), row(0)]
    else:
        rows = [row(1 if clean["sex"] == "male" else 0)]

    frame = pd.DataFrame(rows, columns=FEATURES)
    return float(MODEL.predict_proba(frame)[:, 1].mean())


def tier(probability):
    if probability < TIERS["low_max"]:
        return "Low"
    if probability < TIERS["high_min"]:
        return "Moderate"
    return "High"


@app.post("/predict")
def predict():
    data = request.get_json(silent=True)

    try:
        clean = clean_payload(data)
    except BadInput as error:
        return jsonify({"error": str(error)}), 400

    probability = score(clean)

    return jsonify({
        "risk_level": tier(probability),
        "probability": round(probability, 2),
        "model": META["selected_model"],
    })


@app.get("/health")
def health():
    return jsonify({
        "status": "ok",
        "model": META["selected_model"],
        "trained_at_utc": META["trained_at_utc"],
    })


# ----------------------------------------------------------------------
# CORS (so the website, served from another address, may call this API).
# Flask answers the browser's OPTIONS "preflight" request automatically;
# this hook just adds the permission headers.
# ----------------------------------------------------------------------

@app.after_request
def add_cors_headers(response):
    origin = request.headers.get("Origin")

    allowed = origin in ALLOWED_ORIGINS or (
        ALLOW_FILE_ORIGIN and origin == "null"      # page opened as file://
    )

    if allowed:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.headers["Vary"] = "Origin"

    return response


if __name__ == "__main__":
    # Development server only. Use a production server (e.g. gunicorn)
    # if you ever host this publicly.
    app.run(host="127.0.0.1", port=5000, debug=False)
