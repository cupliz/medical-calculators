export const config = {
  "id": "chalice-rule-child-head-injury",
  "title": "CHALICE Rule for Child Head Injury",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "History",
      "data": [
        {
          "type": "checkbox",
          "label": "Witnessed LOC > 5min",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Amnesia > 5min",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Abnormal drowsiness",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "≥3 vomit episodes after head injury",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Suspicion of non-accidental injury",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Seizure after head injury (no previous Epilepsy history)",
          "points": "1"
        }
      ]
    },
    {
      "group": "Examination",
      "data": [
        {
          "type": "checkbox",
          "label": "Glasgow Coma Scale <14 (or GCS <15 if <1 yr old)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Suspicion of penetrating or depressed skull injury",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Signs of basal skull fracture (e.g. Blood or CSF from ear or nose, Panda eyes, Serious facial injury)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Positive focal neurologic sign",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Bruises, swelling or laceration >5cm (if <1 yr old)",
          "points": "1"
        }
      ]
    },
    {
      "group": "Mechanism",
      "data": [
        {
          "type": "checkbox",
          "label":
            "High speed road accident (> 64kmph/40mph) as pedestrian, cyclist or car occupant",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Fall of >3m in height",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "High speed injury from a projectile or object",
          "points": "1"
        }
      ]
    }
  ],
  "results": {
    "0": ["Low risk of intracranial pathology. CT not necessary"],
    "1 - 14": ["Not low risk. Consider CT"]
  },
  "notes": [
    {
      "type": "unordered-list",
      "content": [
        "Use in children <16 years with history or signs of head injury",
        "Consider the PECARN Pediatric Head Injury score as it is the most widely validated"
      ]
    }
  ],
  "references": [
    {
      "type": "ordered-list",
      "content": [
        "Dunning J, Daly JP, Lomas JP, Lecky F, Batchelor J, Mackway-Jones K, Derivation of the children's head injury algorithm for the prediction of important clinical events decision rule for head injury in children.Arch Dis Child. 2006 Nov;91(11):885-91."
      ]
    }
  ]
}
