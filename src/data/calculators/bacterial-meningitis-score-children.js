export const config = {
  "id": "bacterial-meningitis-score-children",
  "title": "Bacterial Meningitis Score for Children",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "CSF Gram Stain Positive",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "CSF Absolute Neutrophil Count ≥1000 cells/µL",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "CSF protein ≥80 mg/dL (800 mg/L)",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group":
        "Peripheral blood Absolute Neutrophil Count ≥10,000 cells/µL",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Seizure at or prior to initial presentation",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Leukocytosis WBC >10,000",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    }
  ],
  "results": {
    "0": [
      "Very low risk for bacterial meningitis. Consider discharge with close follow-up within 24-48 hr"
    ],
    "1 - 6": [
      "Not very low risk for bacterial meningitis. Consider admission for parenteral antibiotics and observation while awaiting CSF culture results."
    ]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "This calculator can be used on pediatric patients (aged 29 days to 19 years) with suspected meningitis to rule out bacterial meningitis",
      "Do not use on patients who are critically ill requiring respiratory or vasopressor support, or who have received antibiotics <72h prior to lumbar puncture",
      "Do not use on patients with a Ventriculoperitoneal shunt or recent neurosurgery or are immunosuppressed",
      "Do not use on patients who have known active Lyme Disease or proof or another bacterial infection (e.g. UTI, bone infection, bacteremia) that requires antibiotic therapy"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Nigrovic LE, Kupperman N, Macias CG, Cannavino CR et al. Clinical prediction rule for identifying children with cerebrospinal fluid pleocytosis at very low risk of bacterial meningitis. JAMA. 2007 Jan 3;297(1):52-60.",
      "Nigrovic LE, Malley R, Kuppermann N. Meta-analysis of bacterial meningitis score validation studies. Arch Dis Child. 2012 Sep;97(9):799-805."
    ]
  }
}
