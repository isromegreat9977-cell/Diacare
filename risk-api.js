/* =========================================
   DIACARE - RISK ESTIMATE API LAYER

   script.js calls only ONE function:

       DiaCareRiskAPI.predict(payload)

   and always receives:

       {
         risk_level:  "low" | "moderate" | "high",
         probability: number | null,
         source:      "model" | "mock"
       }

   To switch from the demo to the real trained model:
     1. Start the backend  (see backend/app.py)
     2. Set USE_MOCK_PREDICTION to false below
     3. Set API_URL to your backend address
========================================= */

const DIACARE_RISK_CONFIG = {

  /* TEMPORARY: true  = use the demo scoring rule at the bottom of this file
                 false = call the real backend / trained model            */
  USE_MOCK_PREDICTION: true,

  /* Where the backend runs. Use an https:// address once the site is
     hosted online (browsers block http:// calls from https:// pages). */
  API_URL: "http://127.0.0.1:5000/predict",

  /* Give up if the backend takes longer than this */
  TIMEOUT_MS: 10000

};


/* =========================================
   REAL BACKEND CALL

   Request body  (built in script.js -> buildRiskPayload):
     {
       age, sex ("male" | "female" | "unspecified"),
       height (cm), weight (kg), bmi,
       family_history (0/1), high_blood_pressure (0/1),
       physical_activity (0-3)
     }

   Response body:
     { "risk_level": "Low" | "Moderate" | "High", "probability": 0.18 }
========================================= */

async function predictWithBackend(payload) {

  const controller = new AbortController();

  const timer = setTimeout(
    () => controller.abort(),
    DIACARE_RISK_CONFIG.TIMEOUT_MS
  );

  try {

    const response = await fetch(
      DIACARE_RISK_CONFIG.API_URL,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      }
    );

    if (!response.ok) {
      throw new Error(`Backend returned HTTP ${response.status}`);
    }

    const data = await response.json();

    const level = String(data.risk_level || "").toLowerCase();

    if (!["low", "moderate", "high"].includes(level)) {
      throw new Error("Backend returned an unexpected risk_level");
    }

    return {
      risk_level: level,
      probability:
        typeof data.probability === "number"
          ? data.probability
          : null,
      source: "model"
    };

  } finally {

    clearTimeout(timer);

  }

}


/* =========================================================
   TEMPORARY MOCK - NOT A MACHINE-LEARNING PREDICTION
   ---------------------------------------------------------
   This exists only so the interface can be developed and
   demonstrated before the trained model is connected.

   It is a simple, transparent points rule loosely inspired by
   public risk-score questionnaires. It has NOT been trained or
   validated, it returns NO probability, and the results page
   labels it clearly as "Demo mode".

   DELETE this function (and set USE_MOCK_PREDICTION to false)
   once the real backend is running.
========================================================= */

function mockPredict(payload) {

  let points = 0;

  /* age */
  if (payload.age >= 55)      points += 3;
  else if (payload.age >= 45) points += 2;
  else if (payload.age >= 35) points += 1;

  /* BMI */
  if (payload.bmi >= 40)      points += 3;
  else if (payload.bmi >= 30) points += 2;
  else if (payload.bmi >= 25) points += 1;

  /* sex: "unspecified" adds nothing */
  if (payload.sex === "male") points += 1;

  /* other factors */
  if (payload.family_history === 1)       points += 1;
  if (payload.high_blood_pressure === 1)  points += 1;
  if (payload.physical_activity === 0)    points += 1;

  const level =
    points >= 5 ? "high"
    : points >= 3 ? "moderate"
    : "low";

  /* small delay so the loading state is visible, like a real request */
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        risk_level: level,
        probability: null,      /* a mock must never invent a probability */
        source: "mock"
      });
    }, 400);
  });

}


/* =========================================
   PUBLIC INTERFACE
========================================= */

const DiaCareRiskAPI = {

  config: DIACARE_RISK_CONFIG,

  predict(payload) {

    if (DIACARE_RISK_CONFIG.USE_MOCK_PREDICTION) {
      return mockPredict(payload);
    }

    return predictWithBackend(payload);

  }

};
