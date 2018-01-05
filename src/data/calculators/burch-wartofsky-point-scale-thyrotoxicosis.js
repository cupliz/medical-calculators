export const config = {
  "id": "burch-wartofsky-point-scale-thyrotoxicosis",
  "title": "Burch-Wartofsky Point Scale for Thyrotoxicosis",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Temperature",
      "data": {
        "type": "radio",
        "options":
          "37.2-37.7°C (99-99.9°F) | 37.8-38.2°C (100-100.9°F) | 38.3-38.8°C (101-101.9°F) | 39.3-39.9°C (103-103.9°F) | ≥40°C (≥104°F)",
        "points": "5/10/15/20/25/30"
      }
    },
    {
      "group": "Central Nervous System Effects",
      "data": {
        "type": "radio",
        "options":
          "Absent | Mild (Agitation) | Moderate (Seizures, coma) | Severe (Seizures, coma)",
        "points": "0/10/20/30"
      }
    },
    {
      "group": "Gastrointestinal-hepatic dysfunction",
      "data": {
        "type": "radio",
        "options":
          "Absent | Moderate (Diarrhea, Nausea/vomiting, Abdominal pain) | Severe (Unexplained jaundice)",
        "points": "0/10/15"
      }
    },
    {
      "group": "Congestive Heart Failure",
      "data": {
        "type": "radio",
        "options":
          "Absent | Mild (Pedal Edema) | Moderate (Bibasilar rales) | Severe (Pulmonary Edema)",
        "points": "0/5/10/15"
      }
    },
    {
      "group": "Heart Rate",
      "data": {
        "type": "radio",
        "options":
          "90-109 bpm | 110-119 bpm | 120-129 bpm | 130-139 bpm | ≥140 bpm",
        "points": "5/10/15/20/25"
      }
    },
    {
      "group": "Atrial Fibrillation",
      "data": {
        "type": "radio",
        "options": "None | Present",
        "points": "0/10"
      }
    },
    {
      "group": "Precipitating Event",
      "data": {
        "type": "radio",
        "options": "None | Yes",
        "points": "0/10"
      }
    }
  ],
  "results": {
    "10 - 24": [
      "Unlikely to represent thyroid storm. Investigate diagnosis of thyrotoxicosis and obtain additional imaging (e.g. thyroid ultrasound, radioactive iodine uptake and scan)"
    ],
    "25 - 44": [
      "Impending thyroid storm. Consider thionamides and symptom management along with ICU monitoring"
    ],
    "45 - 140": [
      "Highly suggestive of thyroid storm. Consider rapid and aggressive multimodal management in ICU"
    ]
  },
  "references": [
    {
      "type": "ordered-list",
      "content": [
        "Burch HB, Wartofsky L. Life-threatening thyrotoxicosis. Thyroid storm. Endocrinol Metab Clin North Am. 1993 Jun;22(2):263-77."
      ]
    }
  ]
}
