export const config = {
  "id": "ottawa-knee-rule-x-ray-knee-injury",
  "title": "Ottawa Knee Rule for use of X-Ray in Knee Injury",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria:",
      "data": [
        {
          "type": "checkbox",
          "label": "Age ≥ 55yrs",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Isolated tenderness of patella (no bone tenderness of knee other than patella)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Tenderness of head of fibula",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Inability to flex to 90°",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Inability to bear weight both immediately and in the Emergency department for 4 steps",
          "points": "1"
        }
      ]
    }
  ],
  "results": {
    "0": ["X-Ray not indicated"],
    "1 - 6": ["X-Ray is indicated"]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "Ottawa Knee Rule describes criteria for low risk knee trauma patients that do not require knee imaging ",
      "Patients who do not have any of the Ottawa Knee Rules criteria present do not require an X-Ray. If one or more of the criteria is met, then an X-Ray is recommended."
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Stiell IG, Greenberg GH, Wells GA, et. al. Prospective validation of a decision rule for the use of radiography in acute knee injuries. JAMA. 1996 Feb 28;275(8):611-615.",
      "Stiell IG, Wells GA, McDowell I, et. al. Use of radiography in acute knee injuries: need for clinical decision rules. Acad Emerg Med. 1995 Nov;2(11):966-73."
    ]
  }
}
