export const config = {
  "id": "timi-risk-score-for-stemi",
  "title": "TIMI Risk Score for STEMI",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Criteria",
      "data": [
        {
          "type": "checkbox",
          "label": "Diabetes, Hypertension or Angina",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Systolic Blood Pressure <100 mm Hg",
          "points": "3"
        },
        {
          "type": "checkbox",
          "label": "Heart rate > 100 bpm",
          "points": "2"
        },
        {
          "type": "checkbox",
          "label": "Killip class II-IV",
          "points": "2"
        },
        {
          "type": "checkbox",
          "label": "Body weight < 67 kg (150 lb)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Anterior ST elevation or Left Bundle Branch Block",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Time to treatment > 4 hrs",
          "points": "1"
        }
      ]
    },
    {
      "group": "Age",
      "data": {
        "type": "radio",
        "options": "≥ 75 yrs | 65-74 yrs | < 65 yrs",
        "points": "3/2/0"
      }
    }
  ],
  "results": {
    "0": ["30 Day mortality after an MI 0.8%"],
    "1": ["30 Day mortality after an MI 1.6%"],
    "2": ["30 Day mortality after an MI 2.2%"],
    "3": ["30 Day mortality after an MI 4.4%"],
    "4": ["30 Day mortality after an MI 7.3%"],
    "5": ["30 Day mortality after an MI 12%"],
    "6": ["30 Day mortality after an MI 16%"],
    "7": ["30 Day mortality after an MI 23%"],
    "8": ["30 Day mortality after an MI 27%"],
    "9 - 14": ["30 Day mortality after an MI 36%"]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "TIMI Risk Score predicts 30 day mortality in patients with ST Elevation Acute Myocardial Infarction (STEMI).",
      "The TIMI Score for STEMI was developed from the InTIME II trial of 15K STEMI patients which included studying these patients for thrombolytics. It did not include patients with cardiogenic shock or severe hypertension (BP >180/>110)",
      "Entry criteria: Chest pain for > 30 minutes, ST elevation, symptom onset < 6 hours, fibrinolytic eligible.",
      "Can be used on patients who are post-cath who may have bleeding risks to objectify risk-benefit of post PCI medications."
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Morrow DA, Antman EM, Charlesworth A, et. al. TIMI risk score for ST-elevation myocardial infarction: A convenient, bedside, clinical score for risk assessment at presentation: An intravenous nPA for treatment of infarcting myocardium early II trial substudy. Circulation. 2000 Oct 24; 102(17):2031-7.",
      "Morrow DA, Antman EM, Parsons L, de Lemos JA, Cannon CP, Giugliano RP, McCabe CH, Barron HV, Braunwald E. Application of the TIMI risk score for ST-elevation MI in the National Registry of Myocardial Infarction 3. JAMA. 2001 Sep 19;286(11):1356-9."
    ]
  }
}
