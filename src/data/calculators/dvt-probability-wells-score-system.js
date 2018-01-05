export const config = {
  "id": "dvt-probability-wells-score-system",
  "title": "DVT Probability: Wells Score System",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Clinical Findings",
      "data": [
        {
          "type": "checkbox",
          "label":
            "Paralysis, paresis or recent orthopedic casting of lower extremity",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Recently bedridden (> 3 days) or major surgery within last 4 weeks",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Localized tenderness in deep vein system",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Entire leg is swollen",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Calf swelling >3 cm compared to other leg (measured 10 cm below tibial tuberosity)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Pitting edema, confined to symptomatic leg",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Collateral non varicose superficial veins",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Active cancer, treatment or palliation within 6 months",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Alternative diagnosis more likely than DVT (Baker's cyst, cellulitis, muscle damage, superficial venous thrombosis, post phlebitic syndrome, inguinal lymphadenopathy, external venous compression)",
          "points": "-2"
        }
      ]
    }
  ],
  "results": {
    "-2 - 0": ["Low risk; 5% probability of DVT"],
    "1 - 2": ["Moderate risk of DVT; 17% probability of DVT"],
    "3 - 8": ["High risk of DVT; 53% probability of DVT"]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "The Wells clinical prediction guide quantifies the probability of deep venous thrombosis (DVT) in patients",
      "The model enables the reliable stratification of patients into high, moderate and low risk categories.",
      "Based on the 2003 Wells study, DVT can be ruled out in a patient who is judged clinically unlikely to have a DVT and who has a negative D-dimer test. Ultrasound testing can be safely omitted in such patients. "
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Wells PS, Anderson DR, Bormanis J, et. al. Value of assessment of pretest probability of deep-vein thrombosis in clinical management. Lancet. 1997 Dec 20-27;350(9094):1795-8.",
      "Wells PS, Anderson DR, Rodger M, Forgie M, Kearon C, Dreyer J, Kovacs G, Mitchell M, Lewandowski B, Kovacs MJ. Evaluation of D-dimer in the diagnosis of suspected deep-vein thrombosis. N Engl J Med. 2003 Sep 25;349(13):1227-35."
    ]
  }
}
