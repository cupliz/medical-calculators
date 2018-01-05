export const config = {
  "id": "bode-index-copd",
  "title": "BODE Index for COPD Survival Prediction",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "FEV1 % Predicted After Bronchodialator",
      "data": {
        "type": "radio",
        "options": "≥65% | 50-64% | 36-49% | ≤35%",
        "points": "0/1/2/3"
      }
    },
    {
      "group": "6 min Walk Distance",
      "data": {
        "type": "radio",
        "options": "≥350m | 250-349m | 150-249m | ≤149m",
        "points": "0/1/2/3"
      }
    },
    {
      "group": "mMRC Dyspnea Scale",
      "data": {
        "type": "radio",
        "options":
          "mMRC 0: Dyspnea only with strenous exercise | mMRC 1: Dyspnea when hurrying or walking a slight hill | mMRC 2: Stops for breath when walking at own pace on level ground | mMRC 3: Must stop due to breathlessness after walking 91m (100 yds) or after a few mins | mMRC 4: Cannot leave house, breathless on dressing/undressing",
        "points": "0/0/1/2/3"
      }
    },
    {
      "group": "Body Mass Index",
      "data": {
        "type": "radio",
        "options": ">21 | ≤21",
        "points": "0/1"
      }
    }
  ],
  "results": {
    "0 - 2": ["Approximate 4 year survival: 80%"],
    "3 - 4": ["Approximate 4 year survival: 67%"],
    "5 - 6": ["Approximate 4 year survival: 57%"],
    "7 - 10": ["Approximate 4 year survival: 18%"]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "BODE stands for Body mass index, airflow Obsruction, Dyspnea and Exercise capacity",
      "Used to predict survival in COPD patients but is not suitable to guide therapy or management",
      "BODE index is best used to help inform discussions with patients on their prognosis and goals of care",
      "Should not be used during acute exacerbations of COPD and it does not predict clinical response to therapy",
      "Patients with a higher BODE index have a higher risk of death from respiratory causes (e.g. respiratory failure, pneumonia, or pulmonary embolism)"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Celli BR, Cote CG, Marin JM, et. al. The Body-Mass Index, Airflow Obstruction, Dyspnea and Exercise Capacity Index in Chronic Obstructive Pulmonary Disease. N Engl J Med. 2004 Mar 4;350(10):1005-12.",
      "Mahler DA, Wells CK. Evaluation of clinical methods for rating dyspnea. Chest. 1988 Mar;93(3):580-6.",
      "Marin JM, Carrizo SJ, Casanova C., et. al. Prediction of risk of COPD exacerbations by the BODE index. respir Med. 2009; 103(3):373-8"
    ]
  }
}
