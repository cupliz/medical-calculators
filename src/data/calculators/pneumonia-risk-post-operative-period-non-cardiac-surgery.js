export const config = {
  "id": "pneumonia-risk-post-operative-period-non-cardiac-surgery",
  "title": "Pneumonia Risk in Post Operative Period of Non-Cardiac Surgery",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria:",
      "data": [
        {
          "type": "checkbox",
          "label": ">10% weight loss over 6 months",
          "points": "7"
        },
        {
          "type": "checkbox",
          "label": "History of COPD",
          "points": "4"
        },
        {
          "type": "checkbox",
          "label": "General anesthetic used",
          "points": "4"
        },
        {
          "type": "checkbox",
          "label": "Sensorium impariment",
          "points": "4"
        },
        {
          "type": "checkbox",
          "label": "History of CVA",
          "points": "4"
        },
        {
          "type": "checkbox",
          "label": ">4 units blood transfusion",
          "points": "3"
        },
        {
          "type": "checkbox",
          "label": "Emergency operation",
          "points": "3"
        },
        {
          "type": "checkbox",
          "label": "History of chronic corticosteroid use",
          "points": "3"
        },
        {
          "type": "checkbox",
          "label": "History of smoking within 1 year",
          "points": "3"
        },
        {
          "type": "checkbox",
          "label":
            "History of alcohol use (>2 drinks/day within last 2 weeks)",
          "points": "2"
        }
      ]
    },
    {
      "group": "Type of Surgery",
      "data": [
        {
          "type": "checkbox",
          "label": "AAA repair",
          "points": "15"
        },
        {
          "type": "checkbox",
          "label": "Thoracic surgery",
          "points": "14"
        },
        {
          "type": "checkbox",
          "label": "Upper abdominal surgery",
          "points": "10"
        },
        {
          "type": "checkbox",
          "label": "Neck surgery",
          "points": "8"
        },
        {
          "type": "checkbox",
          "label": "Neurosurgery",
          "points": "8"
        },
        {
          "type": "checkbox",
          "label": "Vascular surgery",
          "points": "3"
        }
      ]
    },
    {
      "group": "Patient Age",
      "data": [
        {
          "type": "checkbox",
          "label": ">80 years",
          "points": "17"
        },
        {
          "type": "checkbox",
          "label": "70-79 years",
          "points": "13"
        },
        {
          "type": "checkbox",
          "label": "60-69 years",
          "points": "9"
        },
        {
          "type": "checkbox",
          "label": "50-59 years",
          "points": "4"
        },
        {
          "type": "checkbox",
          "label": "<50 years",
          "points": "0"
        }
      ]
    },
    {
      "group": "Patient's Functional status",
      "data": [
        {
          "type": "checkbox",
          "label": "Dependent",
          "points": "10"
        },
        {
          "type": "checkbox",
          "label": "Partially dependent",
          "points": "6"
        },
        {
          "type": "checkbox",
          "label": "Independent",
          "points": "0"
        }
      ]
    },
    {
      "group": "BUN concentration",
      "data": [
        {
          "type": "checkbox",
          "label": "< 8mg% (2.86 mmol/L)",
          "points": "4"
        },
        {
          "type": "checkbox",
          "label": "22-29 mg% (7.85-10.6 mmol/L)",
          "points": "2"
        },
        {
          "type": "checkbox",
          "label": "≥ 30mg% (10.7 mmol/L)",
          "points": "3"
        }
      ]
    }
  ],
  "results": {
    "0 - 15": ["Risk of pneumonia 0.24%"],
    "16 - 25": ["Risk of pneumonia 1.19%"],
    "26 - 40": ["Risk of pneumonia 4%"],
    "41 - 55": ["Risk of pneumonia 9.4%"],
    "56 - 84": ["Risk of pneumonia 15.8%"]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Arozullah AM, Khuri SF, Henderson WG, et. al. Development and validation of a multifactorial risk index for predicting postoperative pneumonia after major noncardiac surgery. Ann Intern Med. 2001 Nov 20;135(10):847-57."
    ]
  }
}
