export const config = {
  "id": "bleeding-risk-major-complication-warfarin-therapy",
  "title": "Bleeding Risk (Major Complication) on Warfarin Therapy",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria",
      "data": [
        {
          "type": "checkbox",
          "label": "Age ≥60yrs",
          "points": "1.6"
        },
        {
          "type": "checkbox",
          "label": "Malignancy Present",
          "points": "2.2"
        }
      ]
    },
    {
      "group": "Age",
      "data": {
        "type": "radio",
        "options": "Female/Male",
        "points": "1.3/0"
      }
    }
  ],
  "results": {
    "0": ["Risk of any bleeding complications: 0-1%"],
    "1.3 - 3": ["Risk of any bleeding complications: 1-2%"],
    "3.1 - 5.1": ["Risk of any bleeding complications: 7-14%"]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Kuijer PM, Hutten BA, Prins MH, Buller HR. Prediction of the risk of bleeding during anticoagulant treatment for venous thromboembolism. Arch Intern Med. 1999; 159: 457-60."
    ]
  }
}
