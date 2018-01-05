export { default } from './common/drug-dosage';
export const config = {
  "id": "paracetamol-acetaminophen-pediatric-dosing",
  "title": "Paracetamol/Acetaminophen Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Paracetamol or Acetaminophen",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Pain & Fever relief",
        "content": [
          "Neonates 28-31 weeks gestation: 10-15 mg/kg/dose PO/PR q12hr prn; may administer an initial load of 20 mg/kg PO; not to exceed 40 mg/kg/day or 48 hr (consecutive) of maximum dose",
          "Neonates 32-37 weeks gestation: 10-15 mg/kg/dose PO/PR q8hr prn; may administer an initial load of 20 mg/kg PO; not to exceed 60 mg/kg/day or 48 hr (consecutive) of maximum dose",
          "Neonates 0-9 days: 10-15 mg/kg/dose PO/PR q6-8hr prn; may administer an initial load of 20 mg/kg PO; not to exceed 60 mg/kg/day; or 48 hr (consecutive) of maximum dose",
          "Neonates 10-29 days: 10-15 mg/kg/dose PO/PR q4-8hr prn; may administer an initial load of 20 mg/kg PO; not to exceed 90 mg/kg/day; or 48 hr (consecutive) of maximum dose",
          "Infants: 10-15 mg/kg/dose PO/PR q4-6hr prn; not to exceed 15 mg/kg/dose or 75 mg/kg/day",
          "Children and adolescents <60 kg: 10-15 mg/kg/dose PO/PR q4-6hr prn; not to exceed 15 mg/kg/dose or 1,000 mg/dose, whichever is less or 75 mg/kg/day or 4,000 mg/day, whichever is less"
        ]
      },
      {
        "title": "Renal Dosing",
        "content": [
          "CrCl 10-50: give q6h",
          "CrCl <10: give q8h",
          "HD/PD: no supplement"
        ]
      },
      {
        "title": "Hepatic Dosing",
        "content": [
          "Consider decreasing dose"
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
      "Dosage forms:  CAP: 325 mg, 500 mg; TAB: 325 mg, 500 mg, 650 mg; CHEWABLE: 80 mg, 160 mg; SUSP: 100 mg per mL, 120 mg per 5 mL, 160 mg per 5 mL, SOL: 160 mg per 5 mL, 500 mg per 15 mL"
    ]
  }
}
