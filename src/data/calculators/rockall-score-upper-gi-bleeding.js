export const config = {
  "id": "rockall-score-upper-gi-bleeding",
  "title": "Rockall Score for Upper GI Bleeding",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Patient Age",
      "data": {
        "type": "radio",
        "options": "<60 years | 60-79 years | ≥80 years",
        "points": "0/1/2"
      }
    },
    {
      "group": "Shock",
      "data": {
        "type": "radio",
        "options":
          "No shock | Tachycardia (SBP≥100mmHg and HR≥100bpm) | Hypotension (SBP<100mmHg)",
        "points": "0/1/2"
      }
    },
    {
      "group": "Co-morbidities",
      "data": {
        "type": "radio",
        "options":
          "No major co-morbidity | Any co-morbidity except renal failure, liver failure and/or disseminated malignancy | Renal failure, Liver failure, and/or disseminated malignancy",
        "points": "0/2/3"
      }
    },
    {
      "group": "Diagnosis",
      "data": {
        "type": "radio",
        "options":
          "Mallory-Weiss tear | No lesion identified and no stigmata of recent hemorrhage | All other diagnoses | Malignancy of upper GI tract",
        "points": "0/0/1/2"
      }
    },
    {
      "group": "Major stigmata of recent hemorrhage",
      "data": {
        "type": "radio",
        "options":
          "None | Dark spot only | Blood in upper GI tract | Adherent clot | Visibile or spurting vessel",
        "points": "0/0/2/2/2"
      }
    }
  ],
  "results": {
    "0": ["Low risk; 4.9% rebleeding risk with 0% mortality risk"],
    "1": ["Low risk, 3.4% rebleeding risk with 0% mortality risk"],
    "2": ["Moderate risk 5.3% rebleeding risk with 0.2% mortality risk"],
    "3": ["Moderate risk 11.2% rebleeding risk with 2.9% mortality risk"],
    "4": ["Moderate risk 14.1% rebleeding risk with 5.3% mortality risk"],
    "5": ["High risk 24.1% rebleeding risk with 10.8% mortality risk"],
    "6": ["High risk 32.9% rebleeding risk with 17.3% mortality risk"],
    "7": ["High risk 43.8% rebleeding risk with 27% mortality risk"],
    "8 - 11": ["High risk 41.8% rebleeding risk with 41.1% mortality risk"]
  },
  "notes": [
    {
      "type": "unordered-list",
      "content": [
        "Rockall Score is used for known upper GI bleed patients with a completed endoscopy",
        "Patients who have not yet had endoscopy should be assessed wiht the Pre-Endoscopy Rockall Score",
        "The Rockall score predicts mortality better than chance alone but should be interpreted with caution. Other scores such as the Glasgow-Blatchford Score may perform better especially for identifying very low risk patients.",
        "Consider diagnostic endoscopy for patients with high risk of mortality from upper GI bleeding",
        "Consider ICU care for patients who are hemodynamically unstable from upper GI bleeding"
      ]
    }
  ],
  "references": [
    {
      "type": "ordered-list",
      "content": [
        "Rockall TA, Logan RF, Devlin HB, Northfield TC. Risk assessment after acute upper gastrointestinall haemorrhage. Gut. 1996 Mar;38(3):316-21.",
        "Vreeburg EM, Terwee CB, et al. Validation of the Rockall risk scoring system in up per gastrointestinal bleeding. Gut 1999;44:331-335"
      ]
    }
  ]
}
