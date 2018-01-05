export const config = {
  "id": "abc-score-massive-blood-transfusion",
  "title": "ABC Score for Massive Blood Transfusion",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria:",
      "data": [
        {
          "type": "checkbox",
          "label": "Penetrating Mechanism?",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Systolic BP ≥90mmHg?",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Heart Rate ≥120bpm?",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Positive Ultrasound FAST Exam?",
          "points": "1"
        }
      ]
    }
  ],
  "results": {
    "0 - 1": [
      "Less likely to require a massive transfusion (i.e. ≥10 units of packed RBCs)"
    ],
    "2 - 4": [
      "Likely to require massive blood transfusion (i.e. ≥10 units of packed RBCs)"
    ]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "Massive transfusion protocols are specific to institution but often are 1:1:1 or 1:1:2 for fresh frozen plasma, platelets and packed Red Blood Cells (JAMA 2015)",
      "The ABC Score helps to predict if trauma patients should receive blood through a massive transfusion protocol but it does not indicate if trauma patients should receive blood"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Nunez TC, Voskresensky IV, Dossett LA, Shinall R, Dutton WD, Cotton BA. Early prediction of massive transfusion in trauma: simple as ABC (assessment of blood consumption)? J Trauma. 2009 Feb;66(2):346-52.",
      "Cotton BA, Dossett LA, Haut ER, Shafi S, Nunez TC, Au BK, Zaydfudim V, Johnston M, Arbogast P, Young PP. Multicenter validation of a simplified score to predict massive transfusion in trauma. J Trauma. 2010 Jul;69 Suppl 1:S33-9."
    ]
  }
}
