export const config = {
    "id": "sequential-organ-failure-assessment-score",
    "title": "Sequential Organ Failure Assessment (SOFA) Score",
    "type": "points",
    "points": 0,
    "questions": [
        {
            "group": "PaO₂/FiO2 (mmHg)",
            "data": {
                "type": "radio",
                "options": "<400 | <300 | <200 and mechanically ventilated | <100 and mechanically ventilated",
                "points": "1/2/3/4"
            }
        },
        {
            "group": "Platelet Count x 10³/µL",
            "data": {
                "type": "radio",
                "options":
                    "<150 | <100 | <50 | <20",
                "points": "1/2/3/4"
            }
        },
        {
            "group": "Glasgow Coma Scale",
            "data": {
                "type": "radio",
                "options": "13-14 | 10-12 | 6-9 | <6",
                "points": "1/2/3/4"
            }
        },
        {
            "group": "Bilirubin mg/dL (µmol/L)",
            "data": {
                "type": "radio",
                "options": "1.2-1.9 (>20-32 µmol/L) | 2.0-5.9 (33-101µmol/L) | 6.0-11.9 (102-204 µmol/L) | >12.0 (>204 µmol/L)",
                "points": "1/2/3/4"
            }
        },
        {
            "group": "Mean Arterial Pressure or Vasopressor Administration required",
            "data": {
                "type": "radio",
                "options": "No Hypotension | MAP <70 | Dopamine < 5µg/kg/min or dobutamine (any dose) | Dopamine > 5µg/kg/min or Epi/Norepi <0.1µg/kg/min | Dopamine > 15µg/kg/min or Epi/Norepi > 0.1µg/kg/min",
                "points": "0/1/2/3/4"
            }
        },
        {
            "group": "Creatinine or Urine Output (Use worst value)",
            "data": {
                "type": "radio",
                "options": "Cr <1.2 mg/dL or Urine <106 µmol/L | Cr 1.2-1.9 mg/dL or Urine 106-168 µmol/L | Cr 2.0-3.4 mg/dL or Urine 177-301 µmol/L | Cr 3.5-4.9 mg/dL or Urine 309-433 µmol/L or <500ml/day | Cr >5.0 mg/dL or Urine >442 µmol/L",
                "points": "0/1/2/3/4"
            }
        }
    ],
    "results": {
        "0 - 8": [
            "An initial SOFA score <9 predicted a mortality < 33%"
        ],
        "9 - 11": [
            "An initial SOFA score 9-11 predicted a mortality risk of 40-50%"
        ],
        "12 - 24": [
            "An initial SOFA score > 11 predicted a mortality of 95%"
        ]
    },
    "notes": {
        "type": "unordered-list",
        "content": [
            "The SOFA score is a mortality prediction score based on the degree of dysfunction of 6 organ systems",
            "The SOFA score can be used on all patients admitted into an ICU.",
            "There is no evidence if the score can be reliably used in patients who have been transferred from another ICU"
        ]
    },
    "references": {
        "type": "ordered-list",
        "content": [
            "Vincent JL, Moreno R, Takala J, Willatts S, De Mendonça A, Bruining H, Reinhart CK, Suter PM, Thijs LG., The SOFA (Sepsis-related Organ Failure Assessment) score to describe organ dysfunction/failure. On behalf of the Working Group on Sepsis-Related Problems of the European Society of Intensive Care Medicine. Intensive Care Med. 1996 Jul;22(7):707-10."
        ]
    }
}
