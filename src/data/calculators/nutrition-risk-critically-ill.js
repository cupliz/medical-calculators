export const config = {
    "id": "nutrition-risk-critically-ill",
    "title": "Nutrition Risk in the Critically Ill",
    "type": "points",
    "points": 0,
    "questions": [
        {
            "group": "Age in years",
            "data": {
                "type": "radio",
                "options": "<50 | 50-74 | ≥75",
                "points": "0/1/2"
            }
        },
        {
            "group": "APACHE II Score",
            "data": {
                "type": "radio",
                "options": "<15 | 15-19 | 20-27 | ≥28",
                "points": "0/1/2/3"
            }
        },
        {
            "group": "SOFA Score (Initial, on presentation)",
            "data": {
                "type": "radio",
                "options":
                    "<6 | 6-9 | ≥10",
                "points": "0/1/2"
            }
        },
        {
            "group": "Number of Co-morbidities",
            "data": {
                "type": "radio",
                "options": "0-1 | ≥2",
                "points": "0/1"
            }
        },
        {
            "group": "Days in hospital to ICU admission",
            "data": {
                "type": "radio",
                "options": "0 | ≥1",
                "points": "0/1"
            }
        },
        {
            "group": "IL-6 µ/mL (Optional)",
            "data": {
                "type": "radio",
                "options": "0-399 | ≥400",
                "points": "0/1"
            }
        }
    ],
    "results": {
        "0": [
            "Low Risk; ~1% mortality at 28 days"
        ],
        "1": [
            "Low Risk; ~2% mortality at 28 days"
        ],
        "2": [
            "Low Risk; ~3% mortality at 28 days"
        ],
        "3": [
            "Low Risk; ~8% mortality at 28 days"
        ],
        "4": [
            "Low Risk; ~11% mortality at 28 days"
        ],
        "5": [
            "Low Risk; ~20% mortality at 28 days"
        ],
        "6": [
            "High Risk; ~30% mortality at 28 days"
        ],
        "7": [
            "High Risk; ~45% mortality at 28 days"
        ],
        "8": [
            "High Risk; ~58% mortality at 28 days"
        ],
        "9": [
            "High Risk; ~70% mortality at 28 days"
        ],
        "10": [
            "High Risk; ~80% mortality at 28 days"
        ],
    },
    "notes": {
        "type": "unordered-list",
        "content": [
            "The NUTRIC score was developed to help identify ICU patients who are likely to have a mortality benefit from aggressive nutrition therapy",
            "The NUTRIC Score is recommended by the American College of Gastroenterology clinical guidelines on nutrition therapy",
            "It can be calculated without IL-6 which is not commonly ordered in ICU settings without sacrificing predictive power",
            "SOFA score is the Sequential Organ Failure Assessment score which predicts ICU mortality based on lab results and clinical data"
        ]
    },
    "references": {
        "type": "ordered-list",
        "content": [
            "Heyland DK, Dhaliwal R, Jiang X, Day AG, Identifying critically ill patients who benefit the most from nutrition therapy: the development and initial validation of a novel risk assessment tool. Crit Care. 2011;15(6):R268"
        ]
    }
}
