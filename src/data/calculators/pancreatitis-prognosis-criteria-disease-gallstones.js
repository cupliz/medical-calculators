export const config = {
  "id": "pancreatitis-prognosis-criteria-disease-gallstones",
  "title": "Pancreatitis Prognosis Criteria When Disease Due to Gallstones",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria at time of patient admission:",
      "data": [
        {
          "type": "checkbox",
          "label": "Age >70yrs",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Glucose > 220 mg/dL",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "WBC > 18,000",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "AST > 250",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "LDH > 400",
          "points": "1"
        }
      ]
    },
    {
      "group": "Criteria that may develop over first 2 hospital days:",
      "data": [
        {
          "type": "checkbox",
          "label": "BUN rises >2mg/dL",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Base deficit >5",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Hct drop ≥10% ",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Calcium < 8mg/dL",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Fluid sequestration >4L",
          "points": "1"
        }
      ]
    }
  ],
  "results": {
    "0 - 2": ["Pancreatitis Mortality Risk is 1.8%"],
    "3 - 4": ["Pancreatitis Mortality Risk is 11%"],
    "5 - 6": ["Pancreatitis Mortality Risk is 33%"],
    "7 - 10": ["Pancreatitis Mortality Risk is almost 100%"]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Ranson JH, Rifkind KM, Turner JW. Prognostic signs and nonoperative peritoneal lavage in acute pancreatitis. Surg Gyne Ob. 143:209, 1976.",
      "Ranson JH. Etiological and prognostic factors in human acute pancreatitis: a review. Am J Gastroenterol. 1982 Sep;77(9):633-8."
    ]
  }
}
