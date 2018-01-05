export { default } from './common/drug-dosage';
export const config = {
  "id": "metoclopramide-pediatric-dosing",
  "title": "Metoclopramide Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Metoclopramide",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Small Bowel Intubation",
        "content": [
          "<6 years old: 0.1 mg/kg IV over 1-2 minutes",
          "6-14 years old: 2.5-5 mg IV over 1-2 minutes",
          "≥14 years old: 10 mg IV over 1-2 minutes"
        ]
      },
      {
        "title": "GERD",
        "content": [
          "Neonates: 0.15 mg/kg IV q6hr",
          "Infant: 0.1 mg/kg IV/IM/PO q6-8hr 30 minutes before meals and at bedtime ",
          "Max dose: Not to exceed 0.3-0.75 mg/kg/day"
        ]
      },
      {
        "title": "Nausea/Vomiting (Off Label)",
        "content": [
          "Postoperative Nausea: 0.1-2 mg/kg IV q6-8hr PRN",
          "Chemotherapy-induced Nausea: 1-2 mg/kg IV (infused over at least 15 minutes) 30 minutes before chemotherapy; repeat q2-4hr; pretreatment with diphenhydramine decreases risk of extrapyramidal adverse effects"
        ]
      },
      {
        "title": "Diabetic Gastroparesis (Off Label)",
        "content": [
          "<6 years old: 0.1 mg/kg PO q8hr; not to exceed 0.1 mg/kg",
          "≥6 years old: 0.5 mg/kg/day PO divided q8hr"
          ]
      },
      {
        "title": "Renal Dosing",
        "content": [
          "CrCl 41-50: decrease dose 25%",
          "CrCl 10-40: decrease dose 50%",
          "CrCl <10: decrease dose 75%",
          "HD/PD: No supplement"
        ]
      }
    ]
  },
  "questions": [
    {
      "group": "Dosage",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter drug dose",
          "values": ["mg/kg", "gm/kg", "mcg/kg"]
        }
      ]
    },
    {
      "group": "Weight",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter patient weight",
          "values": ["kg", "lbs"]
        }
      ]
    },
    {
      "group": "Liquid Formulation (optional)",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter medication amount",
          "values": ["mg", "gm", "mcg"]
        }
      ]
    },
    {
      "group": "Per Volume",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter medication volume",
          "values": ["mL", "L"]
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "Dosage forms:  TAB: 5 mg, 10 mg; ODT: 5 mg, 10 mg; SOL: 5 mg per 5 mL; INJ (pre-filled syringe): 10 mg per 2 mL; INJ (vial): 5 mg per mL"
    ]
  }
}
