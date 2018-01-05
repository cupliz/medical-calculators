export const config = {
  "id": "rule-of-sevens-lyme-meningitis",
  "title": "Rule of 7s for Lyme Meningitis",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Number of days of headache",
      "data": {
        "type": "radio",
        "options": "<7 | ≥7",
        "points": "0/1"
      }
    },
    {
      "group": "CSF Mononuclear cells",
      "data": {
        "type": "radio",
        "options": "<70% | ≥70%",
        "points": "0/1"
      }
    },
    {
      "group": "7th (or other) Cranial Nerve Palsy",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    }
  ],
  "results": {
    "0": [
      "Low risk for Lyme Meningitis. Antibiotics not recommended, consider close patient follow-up and use clinical judgement regarding patient disposition"
    ],
    "1 - 3": [
      "Not low risk for Lyme Meningitis. Consider antibiotics to cover Borrelia burgdoreferi"
    ]
  },
  "notes": [
    {
      "type": "unordered-list",
      "content": [
        "Rule of 7s is used to assist in distinguishing Lyme meningitis from aseptic meningitis and to start antibiotics for suspected Lyme",
        "Use in pediatric patients (2-18 years) in a Lyme endemic area with CSF pleocytosis, defined as CSF WBC ≥ 10 cells/mm^3 (corrected for CSF RBC if >500 using a ratio of 1 WBC for every 500 RBC)"
      ]
    }
  ],
  "references": [
    {
      "type": "ordered-list",
      "content": [
        "Garro AC, Rutman M, Simonsen K, Jaeger JL, Chapin K, Lockhart G. Prospective validation of a clinical prediction model for Lyme meningitis in children. Pediatrics. 2009 May;123(5):e829-34.",
        "Cohn KA, Thompson AD, et al. Validation of a Clinical Prediction Rule to Distinguish Lyme Meningitis From Aseptic Meningitis. Pediatrics. 2012; 129(1):e46-53"
      ]
    }
  ]
}
