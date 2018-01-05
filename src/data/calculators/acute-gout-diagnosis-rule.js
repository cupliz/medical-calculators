export const config = {
  "id": "acute-gout-diagnosis-rule",
  "title": "Acute Gout Diagnosis Rule",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria:",
      "data": [
        {
          "type": "checkbox",
          "label": "Male",
          "points": "2"
        },
        {
          "type": "checkbox",
          "label": "History of Arthritis attack",
          "points": "2"
        },
        {
          "type": "checkbox",
          "label": "Onset ≤1 day",
          "points": "0.5"
        },
        {
          "type": "checkbox",
          "label": "Joint redness",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "1st metatarsophalangeal joint involvement",
          "points": "2.5"
        },
        {
          "type": "checkbox",
          "label":
            "Hypertension or Cardiac Disease (e.g. MI, Stroke, PVD, CHF, Angina)",
          "points": "1.5"
        },
        {
          "type": "checkbox",
          "label": "Serum uric acid > 0.35 mmol/L or 5.88 mg/dL",
          "points": "3.5"
        }
      ]
    }
  ],
  "results": {
    "0 - 4": [
      "Gout is unlikely. Estimated prevalence of gout is 2.2% in original study"
    ],
    "4.5 - 7.5": [
      "Estimated prevalence of gout is 31.2%. Patients often benefit the most from synovial fluid analysis for urate crystals"
    ],
    "8 - 13": [
      "Gout arthritis is very likely. Estimated prevalence of gout is 82.5%. Consider starting gout medications. "
    ]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "Gout flares are often treated with some combination of steroids, NSAIDS (classically, indomethacin), opioids for extreme pain, and colchicine.",
      "Management will depend on the patient's age and other risk factors for complications.",
      "After the initial flare, patients may benefit from urate-lowering therapies like allopurinol.",
      "This rule was developed and validated in Europe and may be less applicable to non-European populations"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Hein J. E. M. Janssens, Jaap Fransen, Eloy H. van de Lisdonk, et al. A Diagnostic Rule for Acute Gouty Arthritis in Primary Care Without Joint Fluid Analysis. Arch Intern Med. 2010;170(13):1120-1126",
      "Keinhorst L, Janssens HJM, Fransen J., Janssen M.Comment on: The validation of a diagnostic rule for gout without joint fluid analysis: A prospective study: Reply. Rheumatology (Oxford). 2015 APr;54(4):609-14 "
    ]
  }
}
