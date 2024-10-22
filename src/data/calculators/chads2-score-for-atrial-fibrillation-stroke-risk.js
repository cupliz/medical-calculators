export const config = {
  "id": "chads2-score-for-atrial-fibrillation-stroke-risk",
  "title": "CHADS₂ Score for Atrial Fibrillation Stroke Risk",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Congestive Heart Failure, past or current",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Hypertension treated or untreated",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Age ≥ 75 years",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Diabetes Mellitus",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Prior ischemic stroke, TIA or thromboembolism",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/2"
      }
    }
  ],
  "results": {
    "0": [
      "Low risk of thromboembolic event. 1.9% risk of event per year if no warfarin.",
      "The adjusted stroke rate was the expected stroke rate per 100 person-years derived from the multivariable model assuming that aspirin was not taken."
    ],
    "1": [
      "Intermediate risk of thromboembolic event. 2.8% risk of event per year if no warfarin.",
      "The adjusted stroke rate was the expected stroke rate per 100 person-years derived from the multivariable model assuming that aspirin was not taken."
    ],
    "2": [
      "Intermediate risk of thromboembolic event. 4.0% risk of event per year if no warfarin.",
      "The adjusted stroke rate was the expected stroke rate per 100 person-years derived from the multivariable model assuming that aspirin was not taken."
    ],
    "3": [
      "High risk of thromboembolic event. 5.9% risk of event per year if no warfarin.",
      "The adjusted stroke rate was the expected stroke rate per 100 person-years derived from the multivariable model assuming that aspirin was not taken."
    ],
    "4": [
      "High risk of thromboembolic event. 8.5% risk of event per year if no warfarin.",
      "The adjusted stroke rate was the expected stroke rate per 100 person-years derived from the multivariable model assuming that aspirin was not taken."
    ],
    "5": [
      "Note: While history of stroke provides 2 points, most physicians would move these patients directly to the high risk group (>8.5% risk of event per year if no warfarin.)",
      "By points directly: High risk of thromboembolic event. 12.5% risk of event per year if no warfarin.",
      "The adjusted stroke rate was the expected stroke rate per 100 person-years derived from the multivariable model assuming that aspirin was not taken."
    ],
    "6": [
      "Note: While history of stroke provides 2 points, most physicians would move these patients directly to the high risk group (>8.5% risk of event per year if no warfarin.)",
      "By points directly: High risk of thromboembolic event. 18.2% risk of event per year if no warfarin.",
      "The adjusted stroke rate was the expected stroke rate per 100 person-years derived from the multivariable model assuming that aspirin was not taken."
    ]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "Estimates stroke risk in patients with atrial fibrillation",
      "The CHADS₂ score is one of several risk stratification schemes that can help determine the 1 year risk of an ischemic stroke in a non-anticoagulated patient with non-valvular atrial fibrillation and determine which antithrombotic therapy is most appropriate",
      "The CHA₂-DS₂-VASC score may be a better tool to assess stroke risk in patients with atrial fibrillation.  It risk stratifies these patients better than the CHADS2 score"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Gage BF, Waterman AD, Shannon W, et. al. Validation of clinical classification schemes for predicting stroke: results from the National Registry of Atrial Fibrillation. JAMA. 2001 Jun 13;285(22):2864-70.",
      "Gage BF, van Walraven C, Pearce L, Hart RG, Koudstaal PJ, Boode BS, Petersen P.; Selecting patients with atrial fibrillation for anticoagulation: stroke risk stratification in patients taking aspirin. Circulation. 2004 Oct 19;110(16):2287-92",
      "Go AS, Hylek EM, Chang Y, et. al. Anticoagulation therapy for stroke prevention in atrial fibrillation: how well do randomized trials translate into clinical practice?. JAMA. 2003 Nov 26;290(20):2685-92."
    ]
  }
}
