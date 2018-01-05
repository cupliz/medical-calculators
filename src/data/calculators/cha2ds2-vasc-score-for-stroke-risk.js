export const config = {
  "id": "cha2ds2-vasc-score-for-stroke-risk",
  "title": "CHA₂DS₂-VASc Score for Stroke Risk",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Clinical Features",
      "data": [
        {
          "type": "checkbox",
          "label": "Congestive Heart Failure / LV dysfunction",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Hypertension",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Diabetes Mellitus",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "History of Stroke or TIA or thromboembolism",
          "points": "2"
        },
        {
          "type": "checkbox",
          "label":
            "Vascular disease (History of MI, PVD or aortic atherosclerosis)",
          "points": "1"
        }
      ]
    },
    {
      "group": "Age",
      "data": {
        "type": "radio",
        "options": "< 65 yrs | 65-74 yrs | ≥ 75 yrs",
        "points": "0/1/2"
      }
    },
    {
      "group": "Sex",
      "data": {
        "type": "radio",
        "options": "Male | Female",
        "points": "0/1"
      }
    }
  ],
  "results": {
    "0": [
      "Low risk of stroke. Patient may not require anticoagulation.",
      "Stroke risk was 0.2% per year in 90K patients and 0.3% risk of stroke/TIA/systemic embolism (the Swedish Atrial Fibrillation Cohort Study)"
    ],
    "1": [
      "Low to moderate risk of stroke. Consider antiplatelet or anticoagulation therapy",
      "Stroke risk was 0.6% per year in 90K patients and 0.9% risk of stroke/TIA/systemic embolism (the Swedish Atrial Fibrillation Cohort Study)"
    ],
    "2": [
      "Moderate-high risk of stroke. Patient should be an anticoagulation candidate",
      "Stroke risk was 2.2% per year in 90K patients and 2.9% risk of stroke/TIA/systemic embolism (the Swedish Atrial Fibrillation Cohort Study)"
    ],
    "3": [
      "Moderate-high risk of stroke. Patient should be an anticoagulation candidate",
      "Stroke risk was 3.2% per year in 90K patients and 4.6% risk of stroke/TIA/systemic embolism (the Swedish Atrial Fibrillation Cohort Study)"
    ],
    "4": [
      "Moderate-high risk of stroke. Patient should be an anticoagulation candidate",
      "Stroke risk was 4.8% per year in 90K patients and 6.7% risk of stroke/TIA/systemic embolism (the Swedish Atrial Fibrillation Cohort Study)"
    ],
    "5": [
      "Moderate-high risk of stroke. Patient should be an anticoagulation candidate",
      "Stroke risk was 7.2% per year in 90K patients and 10.0% risk of stroke/TIA/systemic embolism (the Swedish Atrial Fibrillation Cohort Study)"
    ],
    "6": [
      "Moderate-high risk of stroke. Patient should be an anticoagulation candidate",
      "Stroke risk was 9.7% per year in 90K patients and 13.6% risk of stroke/TIA/systemic embolism (the Swedish Atrial Fibrillation Cohort Study)"
    ],
    "7": [
      "Moderate-high risk of stroke. Patient should be an anticoagulation candidate",
      "Stroke risk was 10.8% per year in 90K patients and 15.2% risk of stroke/TIA/systemic embolism (the Swedish Atrial Fibrillation Cohort Study)"
    ],
    "8": [
      "Moderate-high risk of stroke. Patient should be an anticoagulation candidate",
      "Stroke risk was 11.2% per year in 90K patients and 15.7% risk of stroke/TIA/systemic embolism (the Swedish Atrial Fibrillation Cohort Study)"
    ],
    "9": [
      "Moderate-high risk of stroke. Patient should be an anticoagulation candidate",
      "Stroke risk was 12.2% per year in 90K patients and 17.4% risk of stroke/TIA/systemic embolism (the Swedish Atrial Fibrillation Cohort Study)"
    ]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "The CHA₂DS₂-VASc score was developed after identifying additional stroke risk factors in patients with Atrial Fibrillation",
      "The Lip-Halperin Chest publication seeks to refine the the CHADS₂ risk stratification score by adding more points for patients ≥75 yrs and for vascular disease.",
      "A 0 score is a low risk and may not require anticoagulation therapy, a 1 score is of low to moderate risk and one may consider antiplatelet or anticoagulation and a score of 2 or more is moderate high risk and patients should be put on anticoagulation therapy"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Lip GY, Halperin JL. Improving stroke risk stratification in atrial fibrillation. Am J Med. 2010 Jun;123(6):484-8. Review.",
      "Lip GY, Nieuwlaat R, Pisters R, Lane DA, Crijns HJ. Refining clinical risk stratification for predicting stroke and thromboembolism in atrial fibrillation using a novel risk factor-based approach: the euro heart survey on atrial fibrillation. Chest. 2010 Feb;137(2):263-72."
    ]
  }
}
