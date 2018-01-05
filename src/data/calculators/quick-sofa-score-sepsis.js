export const config = {
  "id": "quick-sofa-score-sepsis",
  "title": "qSOFA Score for Sepsis",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria",
      "data": [
        {
          "type": "checkbox",
          "label": "Altered mental status GCS <15",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Respiratory rate ≥ 22",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Systolic BP ≤ 100mmHg",
          "points": "1"
        }
      ]
    }
  ],
  "results": {
    "0 - 1": [
      "Not High Risk; If sepsis is still suspected, continue to monitor, evaluate and initiate treatment as appropriate"
    ],
    "2 - 3": [
      "High Risk: Patients meeting this qSOFA criteria should have infection considered even if it was previously not suspected. Assess for evidence of organ dysfunction with blood test including serum lactate. Calculate full SOFA Score"
    ]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "qSOFA helps to identify high risk patients for inpatient mortality with suspected infection outside the ICU",
      "This calculator is used to predict mortality and not to diagnose sepsis, per 2017 Surviving Sepsis Guidelines",
      "A positive qSOFA Score (≥2 points) may suggest a high risk of poor outcome in patients with suspected infection",
      "However a positive qSOFA Score alone should not trigger sepsis-directed interventions like initiation of broad spectrum antibiotics. It should instead prompt further investigation of the presence of organ dysfunction or to increase frequency of monitoring ",
      "The Sepsis 3 task force recommends that a positive qSOFA Score should prompt the calculation of a SOFA score to confirm the diagnosis of sepsis"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Seymour CW, Liu VX, Iwashyna TJ, et. al. Assessment of Clinical Criteria for Sepsis For the Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3), JAMA. 2016; 315(8):762-774",
      "Rhodes A, Evans LE, Alhazzani W, et. al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock. Crit Care Med. 2017, Mar;45(3):486-552"
    ]
  }
}
