export const config = {
  "id": "aims65-score-upper-gi-bleeding",
  "title": "AIMS65 Score for Upper GI Bleeding Mortality",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Albumin <3g/dL (30g/L)",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "INR >1.5",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Alteration in mental status",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Systolic BP ≤90mmHg",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Age ≥65 years",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    }
  ],
  "results": {
    "0": ["0.3% in-hospital mortality risk"],
    "1": ["1.2% in-hospital mortality risk"],
    "2": ["5.3% in-hospital mortality risk"],
    "3": ["10.3% in-hospital mortality risk"],
    "4": ["16.5% in-hospital mortality risk"],
    "5": ["24.5% in-hospital mortality risk"]
  },
  "notes": [
    {
      "type": "unordered-list",
      "content": [
        "AIMS65 Score can be used to determine the risk of in-hospital mortality for patients wiht acute upper GI bleeding",
        "The score was derived retrospectively by Saltzman et al in a 2011 study from a population of >29K patients from 187 hospitals who were admitted with acute upper GI bleeding from 2004-2005 ",
        "The AIMS65 score is superior to the Glasgow-Blatchford Score in predicting mortality but the GBS is superior in predicting need for transfusion (Hyett 2013)",
        "Validation studies (Robertson 2016) demonstrate that the AIMS65 score is superior to the Glasgow-Blatchford and Pre-endoscopy Rockall Score for predicting in-hospital mortality, ICU admission and length of stay"
      ]
    }
  ],
  "references": [
    {
      "type": "ordered-list",
      "content": [
        "Saltzman JR, Tabak YP, Hyett BH, Sun X et al. A simple risk score accurately predicts in-hospital mortality, length of stay and cost in acute upper GI bleeding. Gastroinste Endosc. 2011;74:1215-1224",
        "Robertson M, et al. Risk stratification in acute upper GI bleeding: comparison of the AIMS65 score with the Glasgow-Blatchford and Rockall scoring systems. Gastrointestinal Endosc. 83.6(2016):1151-1160",
        "Thandassery RB, Sharma M, John AK, et al. Clinical Application of AIMS65 Scores to Predict Outcomes in Patients wiht Upper Gastrointestinal Hemorrhage. Clinical Endoscopy. 2015;48(5):380-384."
      ]
    }
  ]
}
