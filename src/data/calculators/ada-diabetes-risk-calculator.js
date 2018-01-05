export const config = {
  "id": "ada-diabetes-risk-calculator",
  "title": "ADA Diabetes Risk Calculator",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Patient Age",
      "data": {
        "type": "radio",
        "options": "<40 yrs | 40-49 yrs | 50-59 yrs | ≥60 yrs",
        "points": "0/1/2/3"
      }
    },
    {
      "group": "Gender",
      "data": {
        "type": "radio",
        "options": "Female | Male",
        "points": "0/1"
      }
    },
    {
      "group": "Gestational Diabetes (Female Patients Only)",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group":
        "Hypertension (History of Hypertension and/or BP≥140/90 mmHg)",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "First degree relative with Diabetes",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Physically active",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "BMI",
      "data": {
        "type": "radio",
        "options": "<25 | 25-30 | 30-39 | ≥40",
        "points": "0/1/2/3"
      }
    }
  ],
  "results": {
    "1 - 4": [
      "Not high risk. T2DM screening not recommended by ADA guidelines."
    ],
    "5 - 10": [
      "High risk. Patient should be formally screened for diabetes per ADA guidelines"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "American Diabetes Association: Classification and Diagnosis of Diabetes. Diabetes Care. 2016 Jan;39 Suppl 1:S13-22",
      "Bang H, Edwards AM, Bomback AS, et al. Development and Validation of a Patient Self-assessment Score for Diabetes Risk .Ann Intern Med. 2009;151(11):775-783."
    ]
  }
}
