export const config = {
  "id": "vancouver-chest-pain-rule",
  "title": "Vancouver Chest Pain Rule",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Step 1:"
    },
    {
      "group":
        "Abnormal initial ECG (e.g. ST elevation, ST depression >0.5mm, Q waves, LVH, paced rhythm or LBBB)",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      },
      "showPoints": false
    },
    {
      "group": "Positive troponin at 2 hours",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      },
      "showPoints": false
    },
    {
      "group": "Prior ACS or nitrate use",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      },
      "showPoints": false
    },
    {
      "group": "Step 2 (Only if Step 1 answers are all No):"
    },
    {
      "group": "Does palpation reproduce pain?",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/4"
      },
      "showPoints": false
    },
    {
      "group": "Step 3 (Only if Step 2 answer is No):"
    },
    {
      "group": "Age ≥50 years",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      },
      "showPoints": false
    },
    {
      "group": "Does pain radiate to neck, jaw or left arm?",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "5/5"
      },
      "showPoints": false
    }
  ],
  "results": {
    "0": ["Low risk for adverse event. Candidate for early discharge"],
    "1 - 3": [
      "Standard Evaluation. This patient is not a candidate for early discharge and should receive a standard chest pain evaluation"
    ],
    "4": [
      "Low risk if chest pain is reproducible. Candidate for early discharge. Step 3 is not required."
    ],
    "5 - 10": [
      "Standard Evaluation. This patient is not a candidate for early discharge and should receive a standard chest pain evaluation"
    ]
  },
  "showPointsInResults": false,
  "notes": {
    "type": "unordered-list",
    "content": [
      "Vancouver Chest Pain Rule identifies chest pain patients who are at low risk and candidates for early discharge",
      "If the answers to Step 1 are no to all, move to Step 2. Otherwise proceed with chest pain evaluation",
      "If the answer to Step 2 is yes, proceed to early discharge. If no, move to Step 3",
      "If the answers to Step 3 are no to all, proceed to early discharge. If not, proceed with chest pain evaluation"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Scheuermeyer FX, Wong H, Yu E, Boychuk B, Innes G, Grafstein E, Gin K, Christenson J.Development and validation of a prediction rule for early discharge of low-risk emergency department patients with potential ischemic chest pain. CJEM. 2014 Mar;16(2):106-19."
    ]
  }
}
