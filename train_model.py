"""
DiaCare - prediabetes risk model training pipeline
===================================================

Educational risk-awareness project. NOT a diagnostic tool.

What this script does
---------------------
 1. Loads the NHANES files you downloaded (.xpt or .csv) for several cycles
 2. Merges them on SEQN
 3. Builds ONLY the features the DiaCare website actually collects
 4. Derives the target from HbA1c (LBXGH) - never from DIQ160
 5. Trains Logistic Regression, Random Forest and XGBoost
 6. Compares them (accuracy, precision, recall, F1, ROC-AUC, confusion matrix)
 7. Picks the best model using CROSS-VALIDATION on the training data
    (the test set is only used for the final report)
 8. Calibrates the winner and saves it for the backend

Features  (website question -> NHANES variable)
-----------------------------------------------
 age                  What is your age?                 RIDAGEYR
 sex_male             What is your sex?                 RIAGENDR  (1 = male)
 bmi                  height + weight (auto BMI)        BMXBMI
 family_history       Does diabetes run in family?      MCQ300C
 high_blood_pressure  Told you have high BP?            BPQ020
 physical_activity    Minutes of activity per week      PAQ605-PAQ675 (see below)

Data-leakage rules followed here
--------------------------------
 * HbA1c (LBXGH) is used ONLY to create the target. It is not a feature.
 * DIQ160 (self-reported prediabetes) is not used at all.
 * DIQ010 (told you have diabetes) is used ONLY to exclude people who
   already have a diabetes diagnosis, because treatment changes their
   HbA1c. It is not a feature and not the target.

Usage
-----
   pip install -r requirements.txt
   python train_model.py --data-dir ./nhanes_data --out-dir ./artifacts

Put these files for each cycle in --data-dir (suffix letter = cycle):
   DEMO_E.xpt  BMX_E.xpt  MCQ_E.xpt  BPQ_E.xpt  PAQ_E.xpt  GHB_E.xpt  [DIQ_E.xpt]
   (E = 2007-08, F = 2009-10, G = 2011-12, H = 2013-14, I = 2015-16, J = 2017-18)
You can use only the cycles you have; .csv versions also work.
"""

import argparse
import json
import sys
import warnings
from datetime import datetime, timezone
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
import sklearn
from sklearn.calibration import CalibratedClassifierCV, calibration_curve
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.base import clone
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    brier_score_loss,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
    roc_auc_score,
    roc_curve,
)
from sklearn.model_selection import (
    GridSearchCV,
    StratifiedKFold,
    cross_val_predict,
    train_test_split,
)
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

try:
    from xgboost import XGBClassifier
    XGBOOST_AVAILABLE = True
except ImportError:  # the script still works, XGBoost is just skipped
    XGBOOST_AVAILABLE = False


# ======================================================================
# SETTINGS  (keep the website limits in sync with script.js)
# ======================================================================

RANDOM_STATE = 42
TEST_SIZE = 0.20
CV_FOLDS = 5
DECISION_THRESHOLD = 0.50       # default cut-off for accuracy / precision / recall / F1
# Every model is ALSO reported at a 'tuned' cut-off chosen on the TRAINING data
# (best F1 on out-of-fold predictions). A screening tool with modest signal
# often under-flags at 0.50, so looking at both is more honest.

# Must match AGE_MIN / AGE_MAX and INPUT_LIMITS in script.js
AGE_MIN = 20
AGE_MAX = 69
BMI_MIN = 10
BMI_MAX = 70

# True : target = HbA1c >= 5.7  (prediabetes OR diabetes range)  vs Normal
# False: target = Prediabetes vs Normal, rows in the diabetes range are dropped
INCLUDE_DIABETES_RANGE_IN_POSITIVE_CLASS = True

# Drop people who already report a diabetes diagnosis (DIQ010 == 1)
EXCLUDE_DIAGNOSED_DIABETES = True

CYCLES = {
    "E": "2007-2008",
    "F": "2009-2010",
    "G": "2011-2012",
    "H": "2013-2014",
    "I": "2015-2016",
    "J": "2017-2018",
}

REQUIRED_FILES = ["DEMO", "BMX", "MCQ", "BPQ", "PAQ", "GHB"]
OPTIONAL_FILES = ["DIQ"]

# Columns we need from each file
COLUMNS_NEEDED = {
    "DEMO": ["SEQN", "RIDAGEYR", "RIAGENDR"],
    "BMX": ["SEQN", "BMXBMI"],
    "MCQ": ["SEQN", "MCQ300C"],
    "BPQ": ["SEQN", "BPQ020"],
    "GHB": ["SEQN", "LBXGH"],
    "DIQ": ["SEQN", "DIQ010"],
    # PAQ columns are listed in ACTIVITY_DOMAINS below
}

# NHANES 2007-2018 physical-activity questionnaire (GPAQ style).
# Each tuple = (yes/no question, days per week, minutes per day)
ACTIVITY_DOMAINS = [
    ("PAQ605", "PAQ610", "PAD615"),   # vigorous work
    ("PAQ620", "PAQ625", "PAD630"),   # moderate work
    ("PAQ635", "PAQ640", "PAD645"),   # walking / cycling for transport
    ("PAQ650", "PAQ655", "PAD660"),   # vigorous recreation
    ("PAQ665", "PAQ670", "PAD675"),   # moderate recreation
]
COLUMNS_NEEDED["PAQ"] = ["SEQN"] + [c for domain in ACTIVITY_DOMAINS for c in domain]

# physical_activity category from TOTAL weekly minutes (all five domains, all
# intensities added up - exactly what the website question asks):
#   0: < 30   1: 30-149   2: 150-299   3: >= 300
ACTIVITY_CUTOFFS = [30, 150, 300]

# The exact column order the backend must use
FEATURES = [
    "age",
    "bmi",
    "sex_male",
    "family_history",
    "high_blood_pressure",
    "physical_activity",
]


# ======================================================================
# 1. LOAD + MERGE
# ======================================================================

def find_file(data_dir: Path, stem: str, suffix: str):
    """Find e.g. DEMO_E.xpt / demo_e.csv (case-insensitive)."""
    wanted = {f"{stem}_{suffix}.xpt", f"{stem}_{suffix}.csv"}
    for path in data_dir.iterdir():
        if path.name.lower() in {w.lower() for w in wanted}:
            return path
    return None


def read_any(path: Path) -> pd.DataFrame:
    if path.suffix.lower() == ".xpt":
        return pd.read_sas(path, format="xport")
    return pd.read_csv(path)


def load_nhanes(data_dir: Path, cycles) -> pd.DataFrame:
    """Load every file for every cycle, then merge everything on SEQN."""
    tables = {}

    for stem in REQUIRED_FILES + OPTIONAL_FILES:
        frames = []
        for suffix in cycles:
            path = find_file(data_dir, stem, suffix)
            if path is None:
                continue

            frame = read_any(path)
            missing = [c for c in COLUMNS_NEEDED[stem] if c not in frame.columns]
            if missing:
                sys.exit(f"ERROR: {path.name} is missing columns {missing}")

            frames.append(frame[COLUMNS_NEEDED[stem]])
            print(f"  loaded {path.name:<14} {len(frame):>6} rows")

        if frames:
            tables[stem] = pd.concat(frames, ignore_index=True)
        elif stem in REQUIRED_FILES:
            sys.exit(
                f"ERROR: no {stem}_<cycle> file found in {data_dir}.\n"
                f"       Expected e.g. {stem}_E.xpt or {stem}_E.csv"
            )
        else:
            print(f"  (optional {stem} files not found - skipping)")

    merged = tables["DEMO"]
    for stem in ["BMX", "MCQ", "BPQ", "PAQ", "GHB"]:
        merged = merged.merge(tables[stem], on="SEQN", how="inner")

    if "DIQ" in tables:
        merged = merged.merge(tables["DIQ"], on="SEQN", how="left")

    merged["SEQN"] = merged["SEQN"].astype(int)
    print(f"\nMerged on SEQN: {len(merged)} participants "
          f"have DEMO + BMX + MCQ + BPQ + PAQ + GHB")
    return merged


# ======================================================================
# 2. CLEAN + BUILD FEATURES + TARGET
# ======================================================================

def yes_no(series: pd.Series) -> pd.Series:
    """NHANES coding: 1 = Yes, 2 = No, 7 = Refused, 9 = Don't know -> NaN."""
    return series.map({1: 1.0, 2: 0.0})


def weekly_activity_minutes(df: pd.DataFrame) -> pd.Series:
    """
    Total minutes per week across the five PAQ domains.
    If ANY domain is unknown (refused / don't know / incomplete) the whole
    value is NaN and the person is dropped - we never guess.
    """
    total = pd.Series(0.0, index=df.index)

    for yes_no_col, days_col, minutes_col in ACTIVITY_DOMAINS:
        answer = df[yes_no_col]
        days = df[days_col].where(df[days_col].between(1, 7))
        minutes = df[minutes_col].where(df[minutes_col].between(1, 1440))

        domain_minutes = pd.Series(np.nan, index=df.index)
        domain_minutes[answer == 2] = 0.0                      # No -> 0 min
        yes_rows = answer == 1
        domain_minutes[yes_rows] = (days * minutes)[yes_rows]  # NaN if incomplete

        total = total + domain_minutes                         # NaN propagates

    return total


def build_dataset(merged: pd.DataFrame):
    """Returns (features, target_binary, label_3class, cleaning_report)."""
    report = {"participants_merged": int(len(merged))}
    df = merged.copy()

    # --- optional exclusion: already diagnosed with diabetes
    if EXCLUDE_DIAGNOSED_DIABETES and "DIQ010" in df.columns:
        before = len(df)
        df = df[df["DIQ010"] != 1]
        report["excluded_diagnosed_diabetes"] = int(before - len(df))

    # --- age range (must match the website)
    before = len(df)
    df = df[df["RIDAGEYR"].between(AGE_MIN, AGE_MAX)]
    report["dropped_outside_age_range"] = int(before - len(df))

    # --- features
    out = pd.DataFrame(index=df.index)
    out["age"] = df["RIDAGEYR"]
    out["bmi"] = df["BMXBMI"]
    out["sex_male"] = df["RIAGENDR"].map({1: 1.0, 2: 0.0})
    out["family_history"] = yes_no(df["MCQ300C"])
    out["high_blood_pressure"] = yes_no(df["BPQ020"])

    minutes = weekly_activity_minutes(df)
    out["physical_activity"] = np.select(
        [minutes < ACTIVITY_CUTOFFS[0],
         minutes < ACTIVITY_CUTOFFS[1],
         minutes < ACTIVITY_CUTOFFS[2]],
        [0, 1, 2],
        default=3,
    ).astype(float)
    out.loc[minutes.isna(), "physical_activity"] = np.nan

    # BMI must be in the range the website allows
    out.loc[~out["bmi"].between(BMI_MIN, BMI_MAX), "bmi"] = np.nan

    # --- target from HbA1c (LBXGH). HbA1c is NOT a feature.
    hba1c = df["LBXGH"]
    label = pd.Series(
        np.select(
            [hba1c < 5.7, hba1c < 6.5, hba1c >= 6.5],
            ["Normal", "Prediabetes", "Diabetes"],
            default="",
        ),
        index=df.index,
    )
    label[hba1c.isna()] = np.nan

    # --- missing values: drop incomplete rows (no guessing)
    complete = out.notna().all(axis=1) & label.notna()
    report["dropped_missing_values"] = int((~complete).sum())
    out, label = out[complete], label[complete]

    if not INCLUDE_DIABETES_RANGE_IN_POSITIVE_CLASS:
        keep = label != "Diabetes"
        report["dropped_diabetes_range_rows"] = int((~keep).sum())
        out, label = out[keep], label[keep]

    target = label.isin(
        ["Prediabetes", "Diabetes"]
        if INCLUDE_DIABETES_RANGE_IN_POSITIVE_CLASS
        else ["Prediabetes"]
    ).astype(int)

    # integer-like columns back to int
    for column in ["sex_male", "family_history", "high_blood_pressure",
                   "physical_activity"]:
        out[column] = out[column].astype(int)

    report["final_rows"] = int(len(out))
    report["class_counts_3way"] = label.value_counts().to_dict()
    report["positive_rate"] = round(float(target.mean()), 4)
    report["age_min_in_data"] = int(out["age"].min())
    report["age_max_in_data"] = int(out["age"].max())

    return out[FEATURES], target, label, report


# ======================================================================
# 3. MODELS
# ======================================================================

def make_preprocessor() -> ColumnTransformer:
    """
    age, bmi                -> standardised
    physical_activity (0-3) -> one-hot (so no straight-line assumption)
    sex_male, family_history, high_blood_pressure -> already 0/1
    """
    return ColumnTransformer(
        [
            ("numeric", StandardScaler(), ["age", "bmi"]),
            ("activity",
             OneHotEncoder(categories=[[0, 1, 2, 3]], handle_unknown="ignore"),
             ["physical_activity"]),
            ("binary", "passthrough",
             ["sex_male", "family_history", "high_blood_pressure"]),
        ]
    )


def candidate_models():
    """name -> (pipeline, small hyper-parameter grid)"""
    models = {
        "Logistic Regression": (
            Pipeline([
                ("prep", make_preprocessor()),
                ("clf", LogisticRegression(max_iter=2000)),
            ]),
            {"clf__C": [0.1, 1.0, 10.0]},
        ),
        "Random Forest": (
            Pipeline([
                ("prep", make_preprocessor()),
                ("clf", RandomForestClassifier(
                    n_estimators=300, random_state=RANDOM_STATE, n_jobs=-1)),
            ]),
            {
                "clf__max_depth": [4, 6, 8],
                "clf__min_samples_leaf": [20, 50],
            },
        ),
    }

    if XGBOOST_AVAILABLE:
        models["XGBoost"] = (
            Pipeline([
                ("prep", make_preprocessor()),
                ("clf", XGBClassifier(
                    subsample=0.8, colsample_bytree=0.8,
                    eval_metric="logloss", random_state=RANDOM_STATE,
                    n_jobs=-1)),
            ]),
            {
                "clf__max_depth": [2, 3, 4],
                "clf__learning_rate": [0.03, 0.1],
                "clf__n_estimators": [200, 400],
            },
        )
    else:
        print("WARNING: xgboost is not installed - skipping XGBoost.\n"
              "         Install it with:  pip install xgboost")

    return models


def metrics_at(y_true, probability, threshold) -> dict:
    predicted = (probability >= threshold).astype(int)
    tn, fp, fn, tp = confusion_matrix(y_true, predicted).ravel()
    return {
        "accuracy": accuracy_score(y_true, predicted),
        "precision": precision_score(y_true, predicted, zero_division=0),
        "recall": recall_score(y_true, predicted, zero_division=0),
        "f1": f1_score(y_true, predicted, zero_division=0),
        "confusion_matrix": {
            "true_negative": int(tn), "false_positive": int(fp),
            "false_negative": int(fn), "true_positive": int(tp),
        },
    }


def tune_threshold(estimator, X_train, y_train, cv) -> float:
    """Cut-off with the best F1 on out-of-fold TRAINING predictions."""
    oof = cross_val_predict(clone(estimator), X_train, y_train, cv=cv,
                            method="predict_proba")[:, 1]
    grid = np.linspace(0.05, 0.95, 91)
    scores = [f1_score(y_train, (oof >= t).astype(int), zero_division=0)
              for t in grid]
    return float(grid[int(np.argmax(scores))])


def evaluate(model, X_test, y_test, tuned_threshold) -> dict:
    probability = model.predict_proba(X_test)[:, 1]
    default = metrics_at(y_test, probability, DECISION_THRESHOLD)
    tuned = metrics_at(y_test, probability, tuned_threshold)

    return {
        "roc_auc": roc_auc_score(y_test, probability),
        "brier": brier_score_loss(y_test, probability),
        "threshold": DECISION_THRESHOLD,
        **{k: v for k, v in default.items() if k != "confusion_matrix"},
        "confusion_matrix": default["confusion_matrix"],
        "tuned_threshold": round(tuned_threshold, 2),
        **{f"tuned_{k}": v for k, v in tuned.items() if k != "confusion_matrix"},
        "confusion_matrix_tuned": tuned["confusion_matrix"],
    }


# ======================================================================
# 4. MAIN
# ======================================================================

def main():
    parser = argparse.ArgumentParser(description="Train the DiaCare risk model")
    parser.add_argument("--data-dir", required=True, type=Path,
                        help="folder containing the NHANES .xpt / .csv files")
    parser.add_argument("--out-dir", default=Path("artifacts"), type=Path,
                        help="where to save the model + reports")
    parser.add_argument("--cycles", nargs="+", default=list(CYCLES),
                        help="cycle letters to use, e.g. --cycles G H I J")
    parser.add_argument("--no-tune", action="store_true",
                        help="skip hyper-parameter search (much faster)")
    args = parser.parse_args()

    if not args.data_dir.is_dir():
        sys.exit(f"ERROR: data folder not found: {args.data_dir}")
    args.out_dir.mkdir(parents=True, exist_ok=True)

    warnings.filterwarnings("ignore", category=UserWarning)

    # ---- load + build ------------------------------------------------
    print("\n[1/5] Loading NHANES files")
    merged = load_nhanes(args.data_dir, [c.upper() for c in args.cycles])

    print("\n[2/5] Cleaning and building features / target")
    X, y, label3, report = build_dataset(merged)
    for key, value in report.items():
        print(f"  {key}: {value}")

    if y.nunique() < 2 or len(X) < 500:
        sys.exit("ERROR: not enough usable rows or only one class. "
                 "Check that your files are complete.")

    # ---- split -------------------------------------------------------
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=TEST_SIZE, stratify=y, random_state=RANDOM_STATE)
    print(f"\n  train: {len(X_train)} rows   test: {len(X_test)} rows "
          f"(positive rate {y_train.mean():.1%} / {y_test.mean():.1%})")

    # ---- train + compare --------------------------------------------
    print("\n[3/5] Training and comparing models "
          f"({'no tuning' if args.no_tune else 'with small grid search'})")
    cv = StratifiedKFold(n_splits=CV_FOLDS, shuffle=True,
                         random_state=RANDOM_STATE)

    fitted, rows = {}, []
    for name, (pipeline, grid) in candidate_models().items():
        print(f"  training {name} ...")
        if args.no_tune:
            grid = {}
        search = GridSearchCV(pipeline, grid or {}, scoring="roc_auc",
                              cv=cv, n_jobs=1, refit=True)
        search.fit(X_train, y_train)

        fitted[name] = search.best_estimator_
        tuned_threshold = tune_threshold(search.best_estimator_,
                                         X_train, y_train, cv)
        metrics = evaluate(search.best_estimator_, X_test, y_test,
                           tuned_threshold)
        rows.append({
            "model": name,
            "cv_roc_auc": search.best_score_,      # <- used to pick the winner
            **metrics,
            "best_params": json.dumps(search.best_params_),
        })

    results = pd.DataFrame(rows)
    matrices = ["confusion_matrix", "confusion_matrix_tuned", "best_params"]

    print("\nRanking quality (threshold-free):")
    print(results[["model", "cv_roc_auc", "roc_auc", "brier"]]
          .round(4).to_string(index=False))

    print(f"\nTest-set metrics at the default cut-off ({DECISION_THRESHOLD}):")
    print(results[["model", "accuracy", "precision", "recall", "f1"]]
          .round(4).to_string(index=False))

    print("\nTest-set metrics at a cut-off tuned on TRAINING data (best F1):")
    print(results[["model", "tuned_threshold", "tuned_accuracy",
                   "tuned_precision", "tuned_recall", "tuned_f1"]]
          .round(4).to_string(index=False))

    print("\nConfusion matrices on the test set:")
    for row in rows:
        print(f"  {row['model']}")
        print(f"     at {DECISION_THRESHOLD}: {row['confusion_matrix']}")
        print(f"     at {row['tuned_threshold']}: {row['confusion_matrix_tuned']}")

    # ---- choose the winner (cross-validation, NOT the test set) -------
    best_name = results.sort_values("cv_roc_auc", ascending=False).iloc[0]["model"]
    print(f"\nBest model by cross-validated ROC-AUC: {best_name}")
    print("(Not assumed in advance - chosen from the table above.)")

    # ---- calibrate + risk tiers ---------------------------------------
    print("\n[4/5] Calibrating the best model and setting risk tiers")
    best_pipeline = clone(fitted[best_name])
    calibrated = CalibratedClassifierCV(best_pipeline, method="sigmoid", cv=5)
    calibrated.fit(X_train, y_train)

    p_test_raw = fitted[best_name].predict_proba(X_test)[:, 1]
    p_test_cal = calibrated.predict_proba(X_test)[:, 1]
    brier_raw = brier_score_loss(y_test, p_test_raw)
    brier_cal = brier_score_loss(y_test, p_test_cal)
    print(f"  Brier score  before calibration: {brier_raw:.4f}   "
          f"after: {brier_cal:.4f}   (lower is better)")

    # Tier cut-offs from out-of-fold predictions on the TRAINING data only
    oof = cross_val_predict(
        CalibratedClassifierCV(clone(best_pipeline), method="sigmoid", cv=5),
        X_train, y_train, cv=cv, method="predict_proba")[:, 1]
    low_max, high_min = np.percentile(oof, [33.3, 66.7])

    tier = np.where(p_test_cal < low_max, "Low",
                    np.where(p_test_cal < high_min, "Moderate", "High"))
    tier_table = {
        name: {
            "people": int((tier == name).sum()),
            "observed_positive_rate": round(float(y_test[tier == name].mean()), 4),
        }
        for name in ["Low", "Moderate", "High"] if (tier == name).any()
    }
    print(f"  tier cut-offs: Low < {low_max:.3f} <= Moderate < {high_min:.3f} <= High")
    print(f"  observed rate of elevated HbA1c per tier (test set): {tier_table}")

    frac_pos, mean_pred = calibration_curve(
        y_test, p_test_cal, n_bins=8, strategy="quantile")

    # ---- save ---------------------------------------------------------
    print("\n[5/5] Saving")
    model_path = args.out_dir / "diacare_model.joblib"
    joblib.dump(calibrated, model_path)

    metadata = {
        "trained_at_utc": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "selected_model": best_name,
        "selection_rule": "highest cross-validated ROC-AUC on the training set",
        "features": FEATURES,
        "age_min": AGE_MIN,
        "age_max": AGE_MAX,
        "bmi_min": BMI_MIN,
        "bmi_max": BMI_MAX,
        "physical_activity_cutoffs_minutes_per_week": ACTIVITY_CUTOFFS,
        "sex_handling": "sex 'unspecified' -> average of predictions for male and female",
        "target_definition": (
            "HbA1c (LBXGH) >= 5.7% (prediabetes or diabetes range) vs < 5.7%"
            if INCLUDE_DIABETES_RANGE_IN_POSITIVE_CLASS else
            "Prediabetes (5.7-6.4%) vs Normal (<5.7%); diabetes range removed"
        ),
        "excluded_diagnosed_diabetes": EXCLUDE_DIAGNOSED_DIABETES,
        "risk_tiers": {
            "low_max": round(float(low_max), 4),
            "high_min": round(float(high_min), 4),
            "method": "33rd / 67th percentile of out-of-fold training predictions "
                      "(tiers are RELATIVE, not absolute medical risk)",
            "observed_positive_rate_test": tier_table,
        },
        "calibration": {
            "method": "sigmoid (Platt), 5-fold",
            "brier_before": round(float(brier_raw), 5),
            "brier_after": round(float(brier_cal), 5),
            "reliability_bins": [
                {"mean_predicted": round(float(a), 3),
                 "observed_fraction": round(float(b), 3)}
                for a, b in zip(mean_pred, frac_pos)
            ],
        },
        "data_report": report,
        "n_train": int(len(X_train)),
        "n_test": int(len(X_test)),
        "test_metrics": rows,
        "library_versions": {
            "scikit-learn": sklearn.__version__,
            "pandas": pd.__version__,
            "numpy": np.__version__,
        },
        "notes": [
            "Trained on US NHANES data; may not transfer to other populations.",
            "NHANES survey weights are not used, so results are not "
            "population-representative.",
            "The score is a relative screening score. It is NOT a personal "
            "medical probability and NOT a diagnosis.",
        ],
    }
    (args.out_dir / "model_metadata.json").write_text(
        json.dumps(metadata, indent=2, default=str), encoding="utf-8")

    results.drop(columns=["confusion_matrix", "confusion_matrix_tuned"]).to_csv(
        args.out_dir / "model_comparison.csv", index=False)

    # optional ROC curve picture for your report
    try:
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt

        plt.figure(figsize=(6, 5))
        for name, model in fitted.items():
            fpr, tpr, _ = roc_curve(y_test, model.predict_proba(X_test)[:, 1])
            auc = roc_auc_score(y_test, model.predict_proba(X_test)[:, 1])
            plt.plot(fpr, tpr, label=f"{name} (AUC {auc:.3f})")
        plt.plot([0, 1], [0, 1], "k--", label="Chance")
        plt.xlabel("False positive rate")
        plt.ylabel("True positive rate")
        plt.title("ROC curves (test set)")
        plt.legend()
        plt.tight_layout()
        plt.savefig(args.out_dir / "roc_curves.png", dpi=150)
        plt.close()
    except ImportError:
        pass

    print(f"  model     -> {model_path}")
    print(f"  metadata  -> {args.out_dir / 'model_metadata.json'}")
    print(f"  table     -> {args.out_dir / 'model_comparison.csv'}")
    print("\nDone. Remember: this is a risk-awareness tool, not a diagnosis.")


if __name__ == "__main__":
    main()
