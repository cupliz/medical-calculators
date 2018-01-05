export const config = {
  "id": "has-bled-score-for-major-bleeding-risk",
  "title": "HAS-BLED Score for Major Bleeding Risk",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria",
      "data": [
        {
          "type": "checkbox",
          "label": "Uncontrolled hypertension (Systolic ≥ 160mmHg)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Renal disease (Dialysis, transplant or Creatinine >2.26mg/dL (200µmol/L)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Liver disease (Cirrhosis or bilirubin levels >2x normal with AST/ALT/AP >3x normal)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Stroke history",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Prior major bleeding or predisposition to bleeding",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Labile INR (Unstable/High INRs, time in therapeutic range <60%)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Alcohol use ≥ 8 drinks/week",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Age > 65 yrs",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Medication usage that predisposes patient to bleeding (NSAIDs, Antiplatelet agents)",
          "points": "1"
        }
      ]
    }
  ],
  "results": {
    "0 - 1": [
      "Low Risk for major bleeding (~1 in 100 patient years); Anticoagulation should be considered"
    ],
    "2": [
      "Moderate Risk for major bleeding (~2 in 100 patient years); Anticoagulation can be considered"
    ],
    "3 - 10": [
      "High Risk for major bleeding; Alternatives to anticoagulation should be considered"
    ]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "HAS-BLED Score estimates the risk of major bleeding for atrial fibrillation patients to determine whether to start anticoagulation therapy",
      "Scores >5 were too rare to determine risk but the risk of major bleeding is likely >10%",
      "A study comparing HAS-BLED to HEMORR2HAGES and ATRIA showed the HAS-BLED score was superior in assessing risk"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Pisters R, Lane DA, Nieuwlaat R, de Vos CB, Crijns HJ, Lip GY. A novel user-friendly score (HAS-BLED) to assess 1-year risk of major bleeding in patients with atrial fibrillation: the Euro Heart Survey. Chest. 2010 Nov;138(5):1093-100. doi: 10.1378/chest.10-0134. Epub 2010 Mar 18.",
      "Lip GY, Frison L, Halperin JL, Lane DA. Comparative validation of a novel risk score for predicting bleeding risk in anticoagulated patients with atrial fibrillation: the HAS-BLED (Hypertension, Abnormal Renal/Liver Function, Stroke, Bleeding History or Predisposition, Labile INR, Elderly, Drugs/Alcohol Concomitantly) score. J Am Coll Cardiol. 2011 Jan 11;57(2):173-80. doi: 10.1016/j.jacc.2010.09.024. Epub 2010 Nov 24."
    ]
  }
}
