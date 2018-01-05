export const config = {
  "id": "tia-prognosis-risk-of-stroke-by-90-days-after-presentation",
  "title": "TIA Prognosis: Risk of Stroke by 90 Days After Presentation",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria",
      "data": [
        {
          "type": "checkbox",
          "label": "Patient > 60 yrs",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Concurrent Diabetes",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "TIA lasted > 10 minutes",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Patient experienced weakness during TIA",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Patient experienced speech problems during TIA",
          "points": "1"
        }
      ]
    }
  ],
  "results": {
    "0": ["90 Day Risk of Stroke: Virtually no Risk"],
    "1": ["90 Day Risk of Stroke: 3% Risk"],
    "2": ["90 Day Risk of Stroke: 7% Risk"],
    "3": ["90 Day Risk of Stroke: 11% Risk"],
    "4": ["90 Day Risk of Stroke: 15% Risk"],
    "5": ["90 Day Risk of Stroke: 34% Risk"]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Johnston SC, Gress DR, Browner WS, Sidney S. Short-term prognosis after emergency department diagnosis of TIA. JAMA. 2000; 284: 2901-6."
    ]
  }
}
