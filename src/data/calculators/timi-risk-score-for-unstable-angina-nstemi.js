export const config = {
  "id": "timi-risk-score-for-unstable-angina-nstemi",
  "title": "TIMI Risk Score for Unstable Angina/NSTEMI",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria",
      "data": [
        {
          "type": "checkbox",
          "label": "Age ≥ 65",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "≥ 3 CAD risk factors (Hypertension, Diabetes, High Cholesterol, Family History of CAD, Current Smoker)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Known CAD with > 50% stenosis",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Aspirin use in the past 7 days",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Severe angina ≥ 2 episodes in 24 hrs",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Elevated cardiac markers",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "ST deviation ≥ 0.5 mm",
          "points": "1"
        }
      ]
    }
  ],
  "results": {
    "0 - 1": [
      "5% risk at 2 weeks of: Death new or recurrent MI, severe recurrent ischemia requiring urgent revascularization"
    ],
    "2": [
      "8% risk at 2 weeks of: Death new or recurrent MI, severe recurrent ischemia requiring urgent revascularization"
    ],
    "3": [
      "13% risk at 2 weeks of: Death new or recurrent MI, severe recurrent ischemia requiring urgent revascularization"
    ],
    "4": [
      "20% risk at 2 weeks of: Death new or recurrent MI, severe recurrent ischemia requiring urgent revascularization"
    ],
    "5": [
      "26% risk at 2 weeks of: Death, new or recurrent MI, severe recurrent ischemia requiring urgent revascularization"
    ],
    "6 - 7": [
      "41% risk at 2 weeks of: Death, new or recurrent MI, severe recurrent ischemia requiring urgent revascularization"
    ]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "Estimates mortality in patients with unstable angina and non-ST elevation myocardial infarction (MI)",
      "Entry criteria: UA or NSTEMI defined as ischemic pain at rest within the past 24 hours with evidence of Coronary Artery Disease (ST segment deviation or + markers)",
      "TIMI Risk Score for Unstable Angina/NSTEMI can be used to help risk stratify patients with anginal symptoms but is better suited for patients with confirmed NSTEMI or unstable angina",
      "TIMI Risk Score for Unstable Angina/NSTEMI is the best known chest pain risk score tool, however newer tools such as the GRACE score provide better risk stratification for low vs. non-low risk patients."
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Antman EM1, Cohen M, Bernink PJ, McCabe CH, Horacek T, Papuchis G, Mautner B, Corbalan R, Radley D, Braunwald E. The TIMI risk score for unstable angina/non-ST elevation MI: A method for prognostication and therapeutic decision making. JAMA. 2000 Aug 16;284(7):835-42."
    ]
  }
}
