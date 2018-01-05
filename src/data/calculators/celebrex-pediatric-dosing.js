export { default } from './common/drug-dosage';
export const config = {
  "id": "celebrex-pediatric-dosing",
  "title": "Celebrex Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Celebrex",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Juvenile Idiopathic Arthritis (Orphan)",
        "content": [
          ">2 years, 10-25 kg: 50 mg PO bid; Info: use lowest effective dose, shortest effective tx duration; consider alternative tx if poor CYP2C9 metabolizer; give w/ food if GI upset occurs",
          ">2 years, >25kg: 100 mg PO bid; Info: use lowest effective dose, shortest effective tx duration; consider alternative tx if poor CYP2C9 metabolizer; give w/ food if GI upset occurs"
        ]
      },
      {
        "title": "Juvenile Rheumatoid Arthritis",
        "content": [
          "<2 years: safety and efficacy not established",
          "≥2 years, 10-25kg: 50 mg PO q12hr",
          "≥2 years, >25kg: 100mg PO q12hr",
          "Consider alternative management in patients who are poor CYP2C9 metabolizers"
        ]
      },
      {
        "title": "Renal Dosing",
        "content": [
          "Severe impairment: Avoid use"
        ]
      },
      {
        "title": "Hepatic Dosing",
        "content": [
          "Adjust dose amount",
          "Child-Pugh Class B: decrease dose 50%",
          "Child-Pugh Class C: avoid use"
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
      "Poor CYP2C9 Metabolizers:May consider reducing the initial dose by 50%; consider alternative therapy in patients that are poor CYP2C9 metabolizers",
      "Dosage forms: Capsule: 50 mg, 100mg"
    ]
  }
}
