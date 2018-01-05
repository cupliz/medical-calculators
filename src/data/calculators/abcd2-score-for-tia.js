export const config = {
  "id": "abcd2-score-for-tia",
  "title": "ABCD² Score for TIA",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Age ≥ 60 yrs",
      "data": {
        "type": "radio",
        "options": "Yes | No",
        "points": "1/0"
      }
    },
    {
      "group": "Blood Pressure ≥ 140/90 mmHg",
      "data": {
        "type": "radio",
        "options": "Yes | No",
        "points": "1/0"
      }
    },
    {
      "group": "Clinical features of TIA",
      "data": {
        "type": "radio",
        "options":
          "Unilateral weakness | Speech disturbance without weakness | Other symptoms",
        "points": "2/1/0"
      }
    },
    {
      "group": "Duration of symptoms",
      "data": {
        "type": "radio",
        "options": "≥60 min | 10-59 min | <10 min",
        "points": "2/1/0"
      }
    },
    {
      "group": "Diabetes history",
      "data": {
        "type": "radio",
        "options": "Yes | No",
        "points": "1/0"
      }
    }
  ],
  "results": {
    "0 - 3": [
      "Low Risk; 2-day stroke risk 1.0%, 7-day stroke risk 1.2%, 90-day stroke risk 3.1%"
    ],
    "4 - 5": [
      "Moderate Risk; 2-day stroke risk 4.1%, 7-day stroke risk 5.9%, 90-day stroke risk 9.8%"
    ],
    "6 - 7": [
      "High Risk; 2-day stroke risk 8.1%, 7-day stroke risk 11.7%, 90-day stroke risk 17.8%"
    ]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "The ABCD² score was developed to help stratify the stroke risk for patients presenting with a transient ischmeic attack (TIA).",
      "The score was developed in a non-emergency/outpatient setting. It has been shown to have lower accuracy when used by non-specialists.",
      "The largest prospective study using the ABCD² score in the emergency department showed that the score performed poorly (low sensitivity for low risk patients and low specificity for high risk patients)",
      "Several other studies have shown that as the ABCD² score increases the risk of a subsequent stroke increases",
      "Patients who have a low baseline risk of stroke (<2.0%) are at a low risk for having a stroke in the next 7 days (0.4-0.8%)"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Johnston SC1, Rothwell PM, Nguyen-Huynh MN, Giles MF, Elkins JS, Bernstein AL, Sidney S. Validation and refinement of scores to predict very early stroke risk after transient ischaemic attack. Lancet. 2007 Jan 27;369(9558):283-92."
    ]
  }
}
