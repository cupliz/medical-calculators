export const config = {
  "id": "myelodysplastic-syndrome-international-prognostic-scoring-system",
  "title":
    "Myelodysplastic Syndrome International Prognostic Scoring System",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Percentage of Bone Marrow Blasts",
      "data": {
        "type": "radio",
        "options": "<5% | 5-10% | 11-20% | 21-30%",
        "points": "0/0.5/1.5/2"
      }
    },
    {
      "group": "Karyotype",
      "data": {
        "type": "radio",
        "options":
          "Normal, Y-, 5q-, 20q- | Abnormal chromosome 7 or ≥3 more abnormalities | All other cytogenic abnormalities ",
        "points": "0/1/0.5"
      }
    },
    {
      "group":
        "Cytopenias (Hemoglobin <10g/dL, ANS < 1,800/µL, Platelet count < 100,000/µL",
      "data": {
        "type": "radio",
        "options":
          "No cytopenia/Cytopenia of 1 cell type | Cytonpenia of 2 or 3 cell types",
        "points": "0/0.5"
      }
    }
  ],
  "results": {
    "0": ["Prognostic Score: Low (Median survival of 5.7 years)"],
    "0.5 - 1": [
      "Prognostic Score: Intermediate 1 (Median survival of 3.5 years)"
    ],
    "1.5 - 2": [
      "Prognostic Score: Intermediate 2 (Median survival of 1.2 years)"
    ],
    "2.5 - 3.5": ["Prognostic Score: High (Median survival of 0.4 years)"]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Greenberg P, Cox C, LeBeau MM et. al. International Scoring System for Evaluating Prognosis in Myelodysplastic Syndromes. Blood. 1997; 89;6: 2079 - 2088. Erratum in Blood 1998; 91:1100.",
      "Greenberg P, Cox C, LeBeau MM et. al. International Scoring System for Evaluating Prognosis in Myelodysplastic Syndromes. Blood. 1997; 89;6: 2079 - 2088. Erratum in Blood 1998; 91:1100."
    ]
  }
}
