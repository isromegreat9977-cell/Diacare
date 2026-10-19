# DiaCare

A diabetes and prediabetes **awareness** website with a **risk-awareness
screening quiz**. It is not a medical or diagnostic tool.

## Project structure

```
index.html        page (quiz + result markup updated)
style.css         original styles + new section at the bottom
script.js         original site code + new quiz logic
risk-api.js       NEW  one place that talks to the model (has the temporary mock)
find-care.js      NEW  "Find Care" finder: nearby hospitals, clinics and labs
backend/          NEW  small Flask API that serves the trained model
  app.py
  requirements.txt
ml/               NEW  NHANES training pipeline
  train_model.py
  requirements.txt
```

## What the quiz contains (19 questions)

- **Part 1, Risk Assessment (7 questions)** - the only answers sent to the
  model: age, sex, height, weight (BMI calculated automatically), family
  history, high blood pressure, weekly activity.
- **Part 2, Symptoms & Awareness (12 optional questions)** - thirst, urination,
  tiredness, vision, slow healing, hunger, weight loss, tingling/numbness,
  dark skin patches, sugary drinks, recent blood-sugar test, check-up.
  These are for awareness only and are **never** sent to the model.
  To use any of them in the model you would first need a matching NHANES
  variable, a retrained model, and a new feature in `train_model.py` and the
  backend.

## Results page

- Risk level (LOW / MODERATE / HIGH), never a diagnosis.
- Two donut charts that summarise the visitor's OWN answers: how their five
  risk factors line up, and their symptom answers. They are not a diagnosis
  and not a probability. Drawn with plain SVG, so there is no chart library.
- Factor explanations, tips, symptom awareness notes and the disclaimer.

## Find Care (nearby hospitals, clinics, labs)

`find-care.js` needs no API key and no backend:

1. The visitor clicks "Use my location" (or types a city/area).
2. Position: browser geolocation, or a typed place looked up with OpenStreetMap
   Nominatim.
3. Places: OpenStreetMap Overpass API returns hospitals, clinics and
   laboratories within 5 / 10 / 25 km, shown nearest first with Directions,
   Call and Website links, filters, and a Google Maps fallback link.

Things to know:

- Location only works on `https://` pages or `http://localhost` (not on a
  plain `http://` host). GitHub Pages is https, so it works there.
- OpenStreetMap is volunteer-edited, so some places are missing. Being listed
  does not prove a place offers diabetes tests, so the page says "call ahead".
- Nominatim and Overpass are free public services with fair-use limits. That
  is fine for a college project; a busy public site should use its own
  geocoding/places provider.
- DiaCare does not store the location. The coordinates are sent only to the
  OpenStreetMap services above.

## 1. Run the website (works right now, no Python needed)

Just open `index.html` in a browser. The quiz runs in **demo mode**: a simple
points rule produces LOW / MODERATE / HIGH and the result page says clearly
that it is a demo, not a trained model.

A local server is slightly nicer (optional):

```
python -m http.server 8000      # then open http://localhost:8000
```

## 2. Train the model

1. Download these NHANES files (SAS transport `.XPT`) from the CDC NHANES site
   for the cycles you want (2007-08 to 2017-18 all use the same activity
   questionnaire): `DEMO`, `BMX`, `MCQ`, `BPQ`, `PAQ`, `GHB`, and `DIQ`.
   Put them in one folder, e.g. `nhanes_data/` (names like `DEMO_J.xpt`).
2. Install and run:

```
pip install -r ml/requirements.txt
python ml/train_model.py --data-dir nhanes_data --out-dir ml/artifacts
```

Useful options: `--cycles G H I J` (use only some cycles), `--no-tune`
(faster, skips the small grid search).

The script prints a comparison table (accuracy, precision, recall, F1,
ROC-AUC, confusion matrices) for Logistic Regression, Random Forest and
XGBoost, picks the winner by **cross-validated ROC-AUC on the training
data**, calibrates it and saves:

- `ml/artifacts/diacare_model.joblib` the model
- `ml/artifacts/model_metadata.json` features, risk tiers, metrics, limits
- `ml/artifacts/model_comparison.csv` and `roc_curves.png` for your report

## 3. Connect the trained model to the website

```
pip install -r backend/requirements.txt
python backend/app.py            # serves http://127.0.0.1:5000
```

Then in `risk-api.js` change one line:

```js
USE_MOCK_PREDICTION: false,
```

Open the site and finish the quiz. The demo notice disappears and the result
shows a "model score". Finally delete the `mockPredict` function.

If you host the website online (for example GitHub Pages), a page served over
`https://` cannot call an `http://` API. Host the backend somewhere with
HTTPS, set `API_URL` in `risk-api.js`, and set the environment variable
`DIACARE_ALLOWED_ORIGINS="https://yourname.github.io"` for the backend.
GitHub Pages cannot run Python, so the backend needs a separate host.

## API

`POST /predict`

```json
{
  "age": 21, "sex": "male | female | unspecified",
  "height": 175, "weight": 70, "bmi": 22.86,
  "family_history": 0, "high_blood_pressure": 0,
  "physical_activity": 1
}
```

`height` is in cm, `weight` in kg, `physical_activity` is 0 = under 30,
1 = 30-149, 2 = 150-299, 3 = 300+ minutes per week.

Response: `{ "risk_level": "Low", "probability": 0.18 }`

The backend recomputes BMI itself and rejects impossible values.

## Website question -> NHANES variable

| Website question | Model feature | NHANES |
|---|---|---|
| Age (20-69) | `age` | RIDAGEYR |
| Sex | `sex_male` | RIAGENDR (see note) |
| Height + weight -> BMI | `bmi` | BMXBMI |
| Diabetes in family | `family_history` | MCQ300C |
| Told you have high BP | `high_blood_pressure` | BPQ020 |
| Weekly activity minutes | `physical_activity` | PAQ605-PAQ675 |

Symptom questions are **never** sent to the model.
HbA1c (LBXGH) is used only to build the target. DIQ160 is not used.

## Limitations (please read, and say them in your report)

- NHANES is US data. It may not describe people elsewhere (for example in
  India) as well, and the website supports Indian users and Hindi.
- NHANES survey weights are not used, so results are not population-estimates.
- Without a blood test the model is weak at separating individuals. Expect a
  modest ROC-AUC (roughly 0.65-0.75 is typical for questionnaire-only models).
  Report your real numbers; do not oversell them.
- The "probability" is a calibrated screening score. The Low / Moderate / High
  tiers are relative (thirds of the training scores), not absolute risk.
- A single yes/no cannot match NHANES activity data, so the quiz asks for
  total weekly minutes and the training script totals the same five NHANES
  domains. People still estimate minutes imperfectly.
- Family history (MCQ300C) means a close blood relative (parent or sibling)
  with diabetes in NHANES; the quiz question explains this wording.
- "Prefer not to say" for sex: the backend averages the prediction for male
  and female, so no value is invented.
- BMI cut-offs are the general ones; some guidelines use lower cut-offs for
  South Asian adults (a note on the result page mentions this).
- The Find Care list can only show what OpenStreetMap knows. In a very crowded
  area each kind of place is capped at 100 results per search.
- Ages 20-69 only. Change `AGE_MIN`/`AGE_MAX` in `script.js` **and**
  `train_model.py` together.
