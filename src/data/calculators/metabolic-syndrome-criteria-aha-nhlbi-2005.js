export const config = {
  "id": "metabolic-syndrome-criteria-aha-nhlbi-2005",
  "title": "Metabolic Syndrome Criteria (AHA/NHLBI 2005)",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria",
      "data": [
        {
          "type": "checkbox",
          "label":
            "Abdominal obesity (Male waist > 101 cm (40 in). Female waist > 88.9cm (35 in)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Triglycerides ≥ 150 mg/dL or on Triglyceride lowering Rx",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "HDL cholesterol (Male < 40; Female < 50) or on HDL improvement Rx",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Blood Pressure ≥130/≥85 or on BP Rx",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Fasting glucose ≥100 mg/dL or on Glucose lowering Rx",
          "points": "1"
        }
      ]
    }
  ],
  "results": {
    "0 - 2": ["Absent"],
    "3 - 5": ["Present"]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "This criteria set was proposed by the American Heart Association and the National Heart Lung and Blood Institute.",
      "Metabolic syndrome is a constellation of interrelated risk factors of metabolic origin that appear to directly promote the development of atherosclerotic cardiovascular disease.",
      "The predominant underlying risk factors for the syndrome appear to be abdominal obesity and insulin resistance; other associated conditions can be physical inactivity, aging and hormonal imbalance."
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Grundy SM, Cleeman JI, Daniels SR, et. al. American Heart Association; National Heart, Lung, and Blood Institute. Diagnosis and management of the metabolic syndrome: an American Heart Association/National Heart, Lung, and Blood Institute Scientific Statement. Circulation. 2005 Oct 25;112(17):2735-52. Epub 2005 Sep 12."
    ]
  }
}
