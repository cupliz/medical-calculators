export const config = {
  "id": "apgar-score",
  "title": "Apgar Score",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Pulse heart rate",
      "data": {
        "type": "radio",
        "options": "≥100 bpm | <100 bpm/Absent",
        "points": "2/1/0"
      }
    },
    {
      "group": "Respiration/Lung maturity",
      "data": {
        "type": "radio",
        "options": "Good or crying | Slow or irregular | None",
        "points": "2/1/0"
      }
    },
    {
      "group": "Muscle tone",
      "data": {
        "type": "radio",
        "options": "Active motion | Some extremity flexion | Limp",
        "points": "2/1/0"
      }
    },
    {
      "group": "Skin appearance/Color",
      "data": {
        "type": "radio",
        "options":
          "All Pink | Bluish extremities, pink body | Blue or pale",
        "points": "2/1/0"
      }
    },
    {
      "group": "Reflex irritability/Grimace",
      "data": {
        "type": "radio",
        "options": "Sneeze and cough or crying | Grimacing | Silence",
        "points": "2/1/0"
      }
    }
  ],
  "results": {
    "0 - 3": ["Distress, needs intervention"],
    "4 - 6": ["Fairly low"],
    "7 - 10": ["Normal"]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "Apgar is a quick test performed on neonates at 1 and 5 minutes after birth.",
      "The 1 minute score determines how well the baby tolerated the birthing process. The 5 minute score tells how well the baby is doing outside the mother's womb.",
      "Per Neonatal Resuscitation Program, scoring continues at 5 min intervals until reaching a score of 7 or until 20 minutes of life is encountered.  Scored by any provider with direct patient contact at the specified time.",
      "Testing for Reflex irritability involves a rapid, tangential slap of the sole of the baby's foot "
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Apgar V. A proposal of a New Method of Evaluation of the Newborn Infant. Current Researches in Anesthesia and Analgesia. 1953, 32: 261-267.",
      "Apgar V, Holaday DA, James LS, et. al. Evaluation of the newborn infant. JAMA. 1958, 168: 1985-1988.",
      "Casey BM, McIntire DD, Leveno KJ. The continuing value of the Apgar score for the assessment of newborn infants. N Engl J Med. 2001 Feb 15;344(7):467-71."
    ]
  }
}
