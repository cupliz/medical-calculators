export { default } from './common/drug-dosage';
export const config = {
  "id": "ceftibuten-pediatric-dosing",
  "title": "Ceftibuten Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Ceftibuten",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Acute Otitis Media",
        "content": [
          "<6 months: Safety and efficacy not established",
          "6 months-11 years, ≤45 kg: 9 mg/kg PO qd x10 days; Max: 400 mg/day; Info: give suspension at least 1h before or 2h after meals",
          ">12 years or >45 kg:  400 mg PO qd x10 days; Info: give susp at least 1h before or 2h after meals"
        ]
      },
      {
        "title": "Pharyngitis/Tonsillitis, Streptococcal",
        "content": [
          "<6 months: Safety and efficacy not established",
          "6 months-12 years, ≤45 kg: 9 mg/kg PO qd x10 days; Max: 400 mg/day; Info: give suspension at least 1h before or 2h after meals",
          ">12 years or >45kg: 400 mg PO qd x10 days; Info: give suspension at least 1h before or 2h after meals"
        ]
      },
      {
        "title": "Community-Acquired Pneumonia",
        "content": [
          "6 months-12 years, ≤45 kg: 9 mg/kg PO qd x10 days; Max: 400 mg/day; Info: refer to IDSA guidelines; give suspension at least 1h before or 2h after meals",
          ">12 years or >45 kg: 400 mg PO qd x10 days; Info: refer to IDSA guidelines; give suspension at least 1h before or 2h after meals"
        ]
      },
      {
        "title": "Renal Dosing",
        "content": [
          "CrCl 30-49: 4.5 mg/kg qd, Max Dose: 200 mg/day",
          "CrCl 5-29: 2.25 mg/kg qd, Max Dose: 100 mg/day",
          "CrCl <5: not defined",
          "HD: 9 mg/kg after each dialysis, Max Dose 400 mg/day; PD: no supplement"
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
      "Dosage forms:  CAP: 400 mg; SUSPENSION (SUSP): 180 mg per 5 mL"
    ]
  }
}
