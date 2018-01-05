export const config = {
  "id": "bleeding-risk-on-warfarin-therapy-any-bleeding-complication",
  "title": "Bleeding Risk on Warfarin Therapy (Any Bleeding Complication)",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria",
      "data": [
        {
          "type": "checkbox",
          "label": "Age >= 60",
          "points": "1.6"
        },
        {
          "type": "checkbox",
          "label": "Malignacy Present",
          "points": "2.2"
        }
      ]
    },
    {
      "group": "Age",
      "data": {
        "type": "radio",
        "options": "Female | Male",
        "points": "1.3/0"
      }
    }
  ],
  "results": {
    "0": ["Risk of any bleeding complications: 0-4%"],
    "1.3 - 3": ["Risk of any bleeding complications: 6-8%"],
    "3.1 - 5.1": ["Risk of any bleeding complications: 17-26%"]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Kuijer PM, Hutten BA, Prins MH, Buller HR. Prediction of the risk of bleeding during anticoagulant treatment for venous thromboembolism. Arch Intern Med. 1999; 159: 457-60."
    ]
  }
}
