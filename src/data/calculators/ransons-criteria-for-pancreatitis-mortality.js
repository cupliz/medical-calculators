export const config = {
  "id": "ransons-criteria-for-pancreatitis-mortality",
  "title": "Ranson's Criteria for Pancreatitis Mortality",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria at time of patient admission to hospital",
      "data": [
        {
          "type": "checkbox",
          "label": "Age > 55",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Glucose >200 mg/dL (>10 mmol/L)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "WBC > 16,000",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "AST > 250",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "LDH > 350",
          "points": "1"
        }
      ]
    },
    {
      "group": "Criteria that may develop over the first 2 hospital days",
      "data": [
        {
          "type": "checkbox",
          "label": "Hct drops 10% or greater from time of admission",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "BUN increases >5 mg/dL (>1.79 mmol/L) from time of admission",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Ca <8 mg/dL (<2 mmol/L) within 48 hours",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Arterial pO2 <60 mmHg within 48 hours",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Base deficit (24 - HCO3) >4 mg/dL within 48 hours",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Fluid needs > 6L within 48 hours",
          "points": "1"
        }
      ]
    }
  ],
  "results": {
    "0 - 2": ["Mortality is 1%"],
    "3 - 4": ["Mortality is 16%"],
    "5 - 6": ["Mortality is 40%"],
    "7 - 11": ["Mortality is almost 100%"]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "Estimates mortality of patients with pancreatitis based on initial and 48 hour lab values",
      "The BISAP score is another alternative to estimate pancreatitis mortality with fewer variables that is as accurate"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Ranson JH, Rifkind KM, Turner JW. Prognostic signs and nonoperative peritoneal lavage in acute pancreatitis. Surg Gyne Ob. 143:209, 1976."
    ]
  }
}
