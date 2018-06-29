export const config = {
    "id": "acr-ti-rads",
    "title": "ACR TI-RADS",
    "type": "points",
    "points": 0,
    "questions": [
        {
            "group": "Composition (Choose 1)",
            "data": {
                "type": "radio",
                "options": "Cystic/Almost completely cystic | Spongiform | Mixed cystic and solid | Solid or almost completely solid",
                "points": "0/0/1/2"
            }
        },
        {
            "group": "Echogenicity (Choose 1)",
            "data": {
                "type": "radio",
                "options": "Anechoic | Hyperechoic or Isoechoic | Hypoechoic | Very hypoechoic",
                "points": "0/1/2/3"
            }
        },
        {
            "group": "Shape (Choose 1)",
            "data": {
                "type": "radio",
                "options": "Wider-than-tall | Taller-than-wide",
                "points": "0/3"
            }
        },
        {
            "group": "Margin (Choose 1)",
            "data": {
                "type": "radio",
                "options":
                    "Smooth | Ill-defined | Lobulated or irregular | Extra-thyroidal extension",
                "points": "0/0/2/3"
            }
        },
        {
            "group": "Echogenic Foci (Choose All That Apply)",
            "data": [
                {
                    "type": "checkbox",
                    "label": "None or large comet-tail artifacts",
                    "points": "0"
                },
                {
                    "type": "checkbox",
                    "label": "Macrocalcifications",
                    "points": "1"
                },
                {
                    "type": "checkbox",
                    "label": "Peripheral (rim) calcifications",
                    "points": "2"
                },
                {
                    "type": "checkbox",
                    "label": "Punctate echogenic foci",
                    "points": "3"
                }
            ]
        }
    ],
    "results": {
        "0 - 2": ["TR1 Benign; No FNA"],
        "2": ["TR2 Not Suspicious; No FNA"],
        "3": ["TR3 Mildly Suspicious; FNA if ≥ 2.5cm, Follow if ≥ 1.5cm"],
        "4 - 6": ["TR4 Moderately Suspicious; FNA if ≥ 1.5cm, Follow if ≥ 1cm"],
        "7 - 17": ["TR5 Highly Suspicious; FNA if ≥ 1cm, Follow if ≥ 0.5cm"]
    },
    "notes": {
        "type": "unordered-list",
        "content": [
            "Thyroid Imaging Reporting and Data System (TI-RADS) is a risk-stratification system to inform practitioners which nodules warrant biopsy"
        ]
    },
    "references": {
        "type": "ordered-list",
        "content": [
            "Grant EG, Tessler FN, Hoang JK et. al. Thyroid Ultrasound Reporting Lexicon: White Paper of the ACR Thyroid Imaging, Reporting and Data System (TI-RADS) Committee, J Am Coll Radiol. 2015 Dec;12(12 Pt A):1272-9. "
        ]
    }
}
