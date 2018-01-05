export const config = {
  "id": "heart-score-major-cardiac-events",
  "title": "HEART Score for Major Cardiac Events",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "History",
      "data": {
        "type": "radio",
        "options":
          "Slightly suspicious | Moderately suspicious | Highly suspicious",
        "points": "0/1/2"
      }
    },
    {
      "group": "ECG/EKG",
      "data": {
        "type": "radio",
        "options":
          "Normal | Non-specific repolarization disturbance | Significant ST depression",
        "points": "0/1/2"
      }
    },
    {
      "group": "Patient Age",
      "data": {
        "type": "radio",
        "options": "<45 | 45-65 | ≥65",
        "points": "0/1/2"
      }
    },
    {
      "group":
        "Risk factors (e.g. Hypertension, High cholesterol, Diabetes, Obesity, Smoking etc.)",
      "data": {
        "type": "radio",
        "options":
          "No known risk factors | 1-2 risk factors | ≥3 risk factors or history of atherosclerotic disease",
        "points": "0/1/2"
      }
    },
    {
      "group":
        "Initial Troponin (Use local assays and corresponding cutoffs)",
      "data": {
        "type": "radio",
        "options": "≤ Normal limit | 1-2X Normal limit | >2X Normal limit",
        "points": "0/1/2"
      }
    }
  ],
  "results": {
    "0 - 3": [
      "Low Risk: 0.9-1.7% risk of adverse cardiac event. In the HEART Score study, these patients were discharged (0.99% in the retrospective study, 1.7% in the prospective study)"
    ],
    "4 - 6": [
      "Moderate Risk: 12-16.6% risk of adverse cardiac event. In the HEART Score study, these patients were admitted to the hospital. (11.6% retrospective, 16.6% prospective)"
    ],
    "7 - 10": [
      "High risk: 50-65% risk of adverse cardiac event. In the HEART Score study, these patients were candidates for early invasive measures. (65.2% retrospective, 50.1% prospective)"
    ]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "The HEART score was developed in 2008 in a cohort of 122 patients presenting with chest pain in an emergency room",
      "Use in patients ≥ 21 years old presenting with symptoms suggestive of Acute Coronary Syndrome",
      "Do not use on clinically unstable patients or if new ST-segment elevation requires immediate intervention (i.e.≥ 1mm)"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Six, AJ., Backus, BE., Kelder, JC., Chest pain in the emergency room: value of the HEART Score. Neth Neart J. 2008 June; 16(6):191-196"
    ]
  }
}
