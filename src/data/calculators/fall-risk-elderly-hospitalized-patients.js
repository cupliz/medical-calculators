export const config = {
  "id": "fall-risk-elderly-hospitalized-patients",
  "title": "Fall Risk in Elderly Hospitalized Patients",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria:",
      "data": [
        {
          "type": "checkbox",
          "label":
            "History of fall at presentation or fall since admission",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Patient displays agitation",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Visually impaired",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Frequent urination",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Patient has poor mobility",
          "points": "1"
        }
      ]
    }
  ],
  "results": {
    "0 - 1": ["Risk of falling: 2.4-4.1%"],
    "2 - 5": ["Risk of falling: 42 to 65.3%"]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Oliver D, Britton M, Seed P, et. al. Development and evaluation of evidence based risk assessment tool (STRATIFY) to predict which elderly inpatients will fall: case-control and cohort studies. BMJ. 1997 Oct 25;315(7115):1049-1053."
    ]
  }
}
