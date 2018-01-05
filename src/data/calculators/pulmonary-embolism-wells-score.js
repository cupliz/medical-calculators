export const config = {
  "id": "pulmonary-embolism-wells-score",
  "title": "Pulmonary Embolism Wells Score",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria",
      "data": [
        {
          "type": "checkbox",
          "label": "Clinical symptoms of DVT",
          "points": "3"
        },
        {
          "type": "checkbox",
          "label": "No alternative diagnosis better explains the illness",
          "points": "3"
        },
        {
          "type": "checkbox",
          "label": "Pulse > 100bpm",
          "points": "1.5"
        },
        {
          "type": "checkbox",
          "label": "Immobilization for ≥3 days or surgery in last 4 weeks",
          "points": "1.5"
        },
        {
          "type": "checkbox",
          "label": "Prior history of DVT or Pulmonary Embolism",
          "points": "1.5"
        },
        {
          "type": "checkbox",
          "label": "Hemoptysis",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Malignancy with treatment within 6 months",
          "points": "1"
        }
      ]
    }
  ],
  "results": {
    "0 - 1.5": [
      "Risk: Low probability of Pulmonary Embolism (1.3% chance in an ED patient population). Consider d-dimer testing to rule out PE"
    ],
    "2 - 6": [
      "Risk: Moderate probability of Pulmonary Embolism (16.2% chance in an ED patient population). Consider high sensitivity d-dimer testing"
    ],
    "6.5 - 13": [
      "Risk: High probability of Pulmonary Embolism (40.6% chance in an ED patient population). Consider CTA. D-dimer testing not recommended."
    ]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "The Wells Score helps to stratify the risk of pulmonary embolism and is often used in conjunction with d-dimer testing to evaluate for PE",
      "It is not intended to diagnose pulmonary embolisms but to help guide clinical workup by predicting pre-test probability of PE and appropriate testing to rule out the diagnosis"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Wells PS, Anderson DR, Rodger M, et. al. Derivation of a simple clinical model to categorize patients probability of pulmonary embolism: increasing the models utility with the SimpliRED D-dimer. Thromb Haemost. 2000 Mar;83(3):416-20."
    ]
  }
}
