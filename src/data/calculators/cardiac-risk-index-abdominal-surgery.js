export const config = {
  "id": "cardiac-risk-index-abdominal-surgery",
  "title": "Cardiac Risk Index for Abdominal Surgery",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria",
      "data": [
        {
          "type": "checkbox",
          "label":
            "Patient has Coronary artery disease (MI or positive stress test)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "History of Congestive Heart Failure",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "History of Cerebrovascular disease (TIA or stroke)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Patient has diabetes and is on insulin",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Chronic renal insufficiency (Creatinine > 2mg/dL or 176.8 µmol/L)",
          "points": "1"
        }
      ]
    }
  ],
  "results": {
    "0 - 1": ["Approximate risk of cardiac complication: <1%"],
    "2": ["Approximate risk of cardiac complication: 3%"],
    "3 - 5": ["Approximate risk of cardiac complication: 8.1%"]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Lee TH, Marcantonio ER, Mangione CM, et al. Derivation and prospective validation of a simple index for prediction of cardiac risk of major noncardiac surgery. Circulation. 1999; 100: 1043-9."
    ]
  }
}