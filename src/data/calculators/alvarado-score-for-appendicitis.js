export const config = {
  "id": "alvarado-score-for-appendicitis",
  "title": "Alvarado Score for Acute Appendicitis",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Signs:",
      "data": [
        {
          "type": "checkbox",
          "label": "Right lower quadrant tenderness?",
          "points": "2"
        },
        {
          "type": "checkbox",
          "label": "Elevated temperature (37.3°C or 99.1°F)?",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Rebound tenderness?",
          "points": "1"
        }
      ]
    },
    {
      "group": "Symptoms:",
      "data": [
        {
          "type": "checkbox",
          "label": "Migration of pain to the right lower quadrant?",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Anorexia?",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Nausea or vomiting?",
          "points": "1"
        }
      ],
    },
    {
      "group": "Laboratory Values:",
      "data": [
        {
          "type": "checkbox",
          "label": "Leukocytosis > 10,000?",
          "points": "2"
        },
        {
          "type": "checkbox",
          "label": "Leukocyte left shift?",
          "points": "1"
        }
      ]
    }
  ],
  "results": {
    "0 - 4": [
      "Unlikely appendicitis by the Alvarado Score."
    ],
    "5 - 6": [
      "Possible appendicitis by the Alvarado Score"
    ],
    "7 - 8": [
      "Probable/likely appendicitis by the Alvarado Score."
    ],
    "9 - 10": [
      "Definite appendicitis by the Alvarado Score."
    ]
  }
}
