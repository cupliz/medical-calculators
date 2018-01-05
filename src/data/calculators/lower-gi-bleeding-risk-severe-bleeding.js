export const config = {
  "id": "lower-gi-bleeding-risk-severe-bleeding",
  "title": "Lower GI Bleeding and Risk of Severe Bleeding",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria:",
      "data": [
        {
          "type": "checkbox",
          "label": "Pulse ≥100bpm",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Systolic Blood Pressure ≤115mmHg",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Patient had associated syncope",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Blood per rectum during first 4h of evaluation",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Patient on aspirin",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Patient has ≥3 comorbid conditions",
          "points": "1"
        }
      ]
    }
  ],
  "results": {
    "0": ["Risk of Severe Bleeding: 9%"],
    "1 - 3": ["Risk of Severe Bleeding: 43%"],
    "4 - 6": ["Risk of Severe Bleeding: 84%"]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Strate LL, Orav EJ, Syngal S. Early predictors of severity in acute lower intestinal tract bleeding. Arch Intern Med. 2003; 163: 838-43."
    ]
  }
}
