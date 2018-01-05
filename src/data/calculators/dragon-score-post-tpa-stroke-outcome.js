export const config = {
  "id": "dragon-score-post-tpa-stroke-outcome",
  "title": "DRAGON Score for Post-TAP Stroke Outcome",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "HyperDense Cerebral Artery/Early Infarct on CT scan",
      "data": {
        "type": "radio",
        "options": "No | Either | Both",
        "points": "0/1/2"
      }
    },
    {
      "group": "Modified Rankin Scale >1, Prestroke",
      "data": {
        "type": "radio",
        "options": "No | Either",
        "points": "0/1"
      }
    },
    {
      "group": "Age",
      "data": {
        "type": "radio",
        "options": "<65 yrs | 65-79 yrs | ≥80 yrs",
        "points": "0/1/2"
      }
    },
    {
      "group": "Onset of Treatment >90 min",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Glucose at Baseline >8mmol/L (144 mg/dL)",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Baseline NIH Stroke Scale",
      "data": {
        "type": "radio",
        "options": "0-4 | 5-9 | 10-15 | ≥16",
        "points": "0/1/2/3"
      }
    }
  ],
  "results": {
    "0 - 1": [
      ">99% likelihood of a good outcome (mRS 0-2); 0% likelihood of a miserable outcome (mRS 5-6)"
    ],
    "2": [
      ">96% likelihood of a good outcome (mRS 0-2); 2% likelihood of a miserable outcome (mRS 5-6)"
    ],
    "3": [
      ">87% likelihood of a good outcome (mRS 0-2); 7% likelihood of a miserable outcome (mRS 5-6)"
    ],
    "4": [">81% likelihood of a good outcome (mRS 0-2)"],
    "5": [">83% likelihood of a miserable outcome (mRS 5-6)"],
    "6": [">90% likelihood of a miserable outcome (mRS 5-6)"],
    "7": [">97% likelihood of a miserable outcome (mRS 5-6)"],
    "8 - 10": [
      "0% likelihood of a good outcome (mRS 0-2); >99% likelihood of a miserable outcome (mRS 5-6)"
    ]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "The DRAGON Score is used to predict 3 month outcomes in ischemic stroke patients receiving intravenous thrombolysis (tPA)",
      "For patients with a DRAGON score that predicts a miserable outcome even if tPA is given, consider the risk/benefit of giving IV thrombolytics",
      "These patients may be potential candidates for endovascular thrombectomy, although the benefits of this procedure have not yet been demonstrated in literature"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Strbian D, Meretoja A, Ahlhelm FJ, Pitkäniemi J, Lyrer P, Kaste M, Engelter S, Tatlisumak T. Predicting outcome of IV thrombolysis-treated ischemic stroke patients: the DRAGON score. Neurology. 2012 Feb 7;78(6):427-32.",
      "Strbian D, Seiffge DJ, Breuer L, et al. Validation of the DRAGON Score in 12 Stroke Centers in Anterior and Posterior Circulation.Stroke. 2013;STROKEAHA.113.002033"
    ]
  }
}
