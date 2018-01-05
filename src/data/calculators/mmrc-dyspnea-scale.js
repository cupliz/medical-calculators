export const config = {
  "id": "mmrc-dyspnea-scale",
  "title": "mMRC Dyspnea Scale",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Symptom severity",
      "data": {
        "type": "radio",
        "options":
          "Dyspnea only with strenuous exercise | Dyspnea when hurrying or walking up a slight hill | Walks slower than people of similar age due to dyspnea or has to stop for breath when walking at own pace | Stops for breath after walking 91m (100 yards) or after a few min | Too dyspneic to leave house or breathless when dressing",
        "points": "0/1/2/3/4"
      }
    }
  ],
  "results": {
    "0": ["Grade 0"],
    "1": ["Grade 1"],
    "2": ["Grade 2"],
    "3": ["Grade 3"],
    "4": ["Grade 4"]
  },
  "notes": [
    {
      "type": "unordered-list",
      "content": [
        "The mMRC Dyspnea scale is best used to establish baseline functional impairment caused by dyspnea",
        "The mMRC is correlated with morbidity and mortality for patients with respiratory disease, but there is no evidence that confirms attributable cause and effect between mMRC Dyspnea scale scores and patient centered outcomes",
        "The score must be contextualized with an individual patient's history, physical and available diagnostic test results",
        "For patients with higher mMRC grade ≥2 and clinical findings consistent with respiratory disease, consider spirometry (FEV1 and FVC), determining the patient's BODE index and/or GOLD stage as well as targeted diagnostic and/or therapeutic interventions"
      ]
    }
  ],
  "references": [
    {
      "type": "ordered-list",
      "content": [
        "Mahler DA, Wells CK, Evaluation of clinical methods for rating dyspnea. Chest. 1988 Mar;93(3):580-6",
        "Hajiro T, Nishimura K, Tsukino M, Ikeda A, Koyama H, Izumi T. Analysis of clinical methods used to evaluate dyspnea in patients with chronic obstructive pulmonary disease. Am J Respir. Crit. Care Med. 1998 Oct;158(4):1185-9."
      ]
    }
  ]
}
