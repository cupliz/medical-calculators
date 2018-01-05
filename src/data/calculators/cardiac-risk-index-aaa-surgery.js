export const config = {
  "id": "cardiac-risk-index-aaa-surgery",
  "title": "Cardiac Risk Index for AAA Surgery",
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
    "0 - 1": ["Approximate risk of cardiac complication: up to 7%"],
    "2": ["Approximate risk of cardiac complication: 3.8%"],
    "3 - 5": ["Approximate risk of cardiac complication: 11.5%"]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "The index score helps to identify patients at higher risk for cardiac complications post surgery",
      "In the Lee study, patients with 2 risk factors had a paradoxical decrease in cardiac complication rates"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Lee TH, Marcantonio ER, Mangione CM, et al. Derivation and prospective validation of a simple index for prediction of cardiac risk of major noncardiac surgery. Circulation. 1999; 100: 1043-9."
    ]
  }
}
