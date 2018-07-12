export const config = {
    "id": "abcd2-score-for-tia",
    "title": "ABCD² Score for TIA",
    "type": "points",
    "points": 0,
    "questions": [
        {
            "group": "Concordant ST elevation > 1mm in leads with a positive QRS complex",
            "data": {
                "type": "radio",
                "options": "Yes | No",
                "points": "5/0"
            }
        },
        {
            "group": "Concordant ST depression > 1mm in V1-V3",
            "data": {
                "type": "radio",
                "options": "Yes | No",
                "points": "3/0"
            }
        },
        {
            "group": "Excessively discordant ST elevation in leads with a negative QRS",
            "data": {
                "type": "radio",
                "options":
                    "Yes | No",
                "points": "2/0"
            }
        }
    ],
    "results": {
        "0 - 2": [
            "In the original Sgarbossa criteria, a score of < 3 is not usually considered diagnostic of acute MI, but also does not rule out MI. In these patients, repeating ECGs and cardiac enzymes may be helpful."
        ],
        "3 - 10": [
            "A score of ≥3 has a specificity of 90% for diagnosing acute MI. The Modified Sgarbossa Criteria does not use the point system, it is positive if any of the criteria are met"
        ]
    },
    "notes": {
        "type": "unordered-list",
        "content": [
            "The modified Sgarbossa Criteria (which changes the third criteria) does not use the points system, it is positive if any criteria are met.",
            "Sgarbossa's Criteria does not rule out myocardial infarction in patients with pre-existing Left Bundle Branch Block (it is not sufficiently sensitive), but in patients with ≥ 3 points, it is specific for MI.",
            "Stephen Smith's modified Sgarbossa Criteria has looked at excessively discordant ST elevation and has changed this slightly. This has been referenced by Dr. Sgarbossa and should now be included in Sgarbossa criteria."
        ]
    },
    "references": {
        "type": "ordered-list",
        "content": [
            "Sgarbossa EB1, Pinski SL, Barbagelata A, Underwood DA, Gates KB, Topol EJ, Califf RM, Wagner GS. Electrocardiographic diagnosis of evolving acute myocardial infarction in the presence of left bundle-branch block. GUSTO-1 (Global Utilization of Streptokinase and Tissue Plasminogen Activator for Occluded Coronary Arteries) Investigators."
        ]
    }
}
