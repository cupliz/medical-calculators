export const config = {
  "id": "bleeding-risk-index-warfarin-therapy",
  "title": "Bleeding Risk Index for Warfarin Therapy",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria",
      "data": [
        {
          "type": "checkbox",
          "label": "Patient Age ≥65yrs",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "History of CVA",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "History of GI bleeding",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Recent Myocardial Infarction, Anemia with HCT <30%, Creatinine 1.5 or Diabetes",
          "points": "1"
        }
      ]
    }
  ],
  "results": {
    "0": ["Risk of Major Bleeding: 2% @ 3 months, 3% at 12 months"],
    "1 - 2": ["Risk of Major Bleeding: 5% @ 3 months, 12% at 12 months"],
    "3 - 4": ["Risk of Major Bleeding: 23% @ 3 months, 48% at 12 months"]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Wells PS, Forgie MA, Simms M, et al. The outpatient bleeding risk index: validation of a tool for predicting bleeding rates in patients treated for DVT and PE. Arch Intern Med. 2003; 163: 917-20.",
      "Beyth RJ, Quinn LM, Landefeld CS. Prospective evaluation of an index for predicting the risk of major bleeding in outpatients treated with warfarin. Am J Med. 1998 Aug;105(2):91-99."
    ]
  }
}
