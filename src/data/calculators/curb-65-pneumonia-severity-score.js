export const config = {
  "id": "curb-65-pneumonia-severity-score",
  "title": "CURB-65 Pneumonia Severity Score",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria",
      "data": [
        {
          "type": "checkbox",
          "label": "Confusion",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Urea (BUN > 19 mg/dL or 7 mmol/L)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Respiratory Rate ≥ 30 per minute",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Blood Pressure: Systolic < 90 mmHg or Diastolic ≤ 60 mmHg",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Age ≥ 65 years",
          "points": "1"
        }
      ]
    }
  ],
  "results": {
    "0": [
      "Low risk: 0.6% 30-day mortality.",
      "Consider outpatient treatment."
    ],
    "1": [
      "Low risk: 2.7% 30-day mortality.",
      "Consider outpatient treatment."
    ],
    "2": [
      "Moderate risk: 6.8% 30-day mortality.",
      "Short inpatient hospitalization or closely supervised outpatient treatment."
    ],
    "3": [
      "Severe risk: 14.0% 30-day mortality.",
      "Severe pneumonia; hospitalize and consider potential ICU admission."
    ],
    "4": [
      "Highest risk: 27.8% 30-day mortality.",
      "Severe pneumonia; hospitalize and consider potential ICU admission."
    ],
    "5": [
      "Highest risk: 27.8% 30-day mortality.",
      "Severe pneumonia; hospitalize and consider potential ICU admission."
    ]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "CURB-65 estimates the mortality of community-acquired pneumonia to help determine inpatient vs outpatient treatment",
      "Compared to the Pneumonia Severity Index (PSI), CURB-65 offers equal sensitivity of mortality prediction due to community-acquired pneumonia.  The specificity of CURB-65 (74.6%) is also higher than PSI (52.2%)"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Lim WS, van der Eerden MM, Laing R, et. al. Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study. Thorax. 2003 May;58(5):377-82.",
      "Lim WS, Macfarlane JT, Boswell TC, et. al. Study of community acquired pneumonia aetiology (SCAPA) in adults admitted to hospital: implications for management guidelines. Thorax. 2001 Apr;56(4):296-301."
    ]
  }
}
