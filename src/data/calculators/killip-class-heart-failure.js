export const config = {
  "id": "killip-class-heart-failure",
  "title": "Killip Classification for Heart Failure",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Classification",
      "data": {
        "type": "radio",
        "options":
          "No signs of congestion | S3 and Basal rales on auscultation | Acute pulmonary edema | Cardiogenic shock with rales",
        "points": "1/2/3/4"
      },
      "showPoints": false
    }
  ],
  "results": {
    "1": ["Killip Class I: Estimated 30-day mortality: 2-3%"],
    "2": ["Killip Class II: Estimated 30-day mortality: 5-12%"],
    "3": ["Killip Class III: Estimated 30-day mortality: 10-20%"],
    "4": ["Killip Class IV: Estimated 30-day mortality: 10-20%"]
  },
  "showPointsInResults": false,
  "notes": {
    "type": "unordered-list",
    "content": [
      "Killip Classification quantifies the severity of heart failure in patients with Acute Coronary Syndrome and predicts 30-day mortality",
      "Calculator can be used in both STEMI and NSTEMI patients",
      "Mortality rates have declined significantly since the original study published by Killip and Kimball in 1967",
      "30-day mortality estimates are based on Khot 2003 publication which combined Class III/IV due to a smaller number of patients in Class IV (0.3% of patients)"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Killip T, Kimball J. Treatment of myocardial infarction in a coronary care unit. Am J Cardiol. 1967; 20(4):457-64",
      "Khot UN, Jia G, Moliterno DJ et al. Prognostic importance of physical examination for heart failure in non-ST elevation acute coronary syndromes: the enduring value of Killip classification. JAMA. 2003;Oct 22;290(16):2174-81."
    ]
  }
}
