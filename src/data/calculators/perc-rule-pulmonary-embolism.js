export const config = {
  "id": "perc-rule-pulmonary-embolism",
  "title": "PERC Rule for Pulmonary Embolism",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria",
      "data": [
        {
          "type": "checkbox",
          "label": "Age ≥ 50yrs",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Heart Rate ≥ 100bpm",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "SaO2 in room air <95%",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Unilateral leg swelling",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Hemoptysis",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Recent surgery or trauma",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Prior Pulmonary Embolism or Deep Vein Thrombosis",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Hormone use (e.g. oral contraceptives, hormone replacement therapy)",
          "points": "1"
        }
      ]
    }
  ],
  "results": {
    "0": [
      "No need for further workup; <2% chance of PE. If no criteria is positive and doctor's pre-test probability is ≤15% then the PERC Rule criteria are satisfied"
    ],
    "1 - 8": [
      "If any criteria are positive then the PERC Rule cannot be used to rule out PE in this patient"
    ]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "PERC Rule helps to rule out Pulmonay Embolism if no criteria are present and pre-test probability is ≤15%",
      "If there is a low risk patient who is not PERC negative, consider a d-dimer for further evaluation",
      "If the d-dimer test is negative and clinical gestalt determines a pre-test probability is ≤15% then the patient does not require further testing for PE",
      "If the d-dimer test is positive, further testing such as CT-angiogram or a V/Q scan should be performed"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Kline JA, Mitchell AM, Kabrhel C, Richman PB, Courtney DM. Clinical criteria to prevent unnecessary diagnostic testing in emergency department patients with suspected pulmonary embolism. J Thromb Haemost. 2004 Aug;2(8):1247-55.",
      "Kline JA, Courtney DM, Kabrhel C, Moore CL, Smithline HA, Plewa MC, Richman PB, O'Neil BJ, Nordenholz K. Prospective multicenter evaluation of the pulmonary embolism rule-out criteria. J Thromb Haemost. 2008 May;6(5):772-80."
    ]
  }
}
