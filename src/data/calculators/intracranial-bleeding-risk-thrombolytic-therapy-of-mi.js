export const config = {
  "id": "intracranial-bleeding-risk-thrombolytic-therapy-of-mi",
  "title": "Intracranial Bleeding Risk From Thrombolytic Therapy of MI",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria",
      "data": [
        {
          "type": "checkbox",
          "label": "Patient is ≥75 years",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Patient ethnic group is Black",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Female Patient",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Prior history of stroke",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Systolic Blood Pressure ≥ 160 mmHg",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Body weight ≤65kg for Female, ≤80kg for Male patients",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "INR >4 or prothrombin time >24 secs",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "TPA used instead of another thrombolytic",
          "points": "1"
        }
      ]
    }
  ],
  "results": {
    "0 - 1": ["Risk of Cerebral Bleeding: 0.69%"],
    "2": ["Risk of Cerebral Bleeding: 1.02%"],
    "3": ["Risk of Cerebral Bleeding: 1.63%"],
    "4": ["Risk of Cerebral Bleeding: 2.49%"],
    "5 - 8": ["Risk of Cerebral Bleeding: 4.11%"]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Brass LM, Lichtman JH, Wang Y, et al. Intracranial hemorrhage associated with thrombolytic therapy for elderly patients with acute myocardial infarction. Stroke. 2000; 31: 1802-11."
    ]
  }
}
