export const config = {
  "id": "bishop-score-vaginal-delivery-labor",
  "title": "Bishop Score for Vaginal Delivery and Induction of Labor",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Dilation",
      "data": {
        "type": "radio",
        "options": "Closed | 1-2cm | 3-4cm | ≥5cm",
        "points": "0/1/2/3"
      }
    },
    {
      "group": "Effacement",
      "data": {
        "type": "radio",
        "options": "0-30% | 40-50% | 60-70% | ≥80%",
        "points": "0/1/2/3"
      }
    },
    {
      "group": "Station",
      "data": {
        "type": "radio",
        "options": "-3 | -2 | -1,0 | +1,+2",
        "points": "0/1/2/3"
      }
    },
    {
      "group": "Position",
      "data": {
        "type": "radio",
        "options": "Posterior | Mid-Position | Anterior",
        "points": "0/1/2"
      }
    }
  ],
  "results": {
    "1 - 5": [
      "Unfavorable cervix. Induction may be necessary for successful vaginal delivery"
    ],
    "6 - 7": [
      "No definitive prediction on whether induction will be successful. Consider induction or augmentation of labor based on clinical judgement"
    ],
    "8 - 13": [
      "Spontaneous vaginal delivery is more likely. Augmentation and induction may be unnecessary"
    ]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "Bishop Score helps to predict the likelihood of successful vaginal delivery",
      "Induction is often considered at Bishop Score ≤ 5 points"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Bishop EH. Pelvic scoring for elective induction. Obstet Gynecol. 1964 Aug;24:266-8.",
      "Newman RB et al. Preterm prediction study: comparison of the cervical score and Bishop score for prediction of spontaneous preterm delivery. Obstet Gynecol. 2008 Sep;112(3):508-15"
    ]
  }
}
