export { default } from './common/drug-dosage';
export const config = {
  "id": "cefadroxil-pediatric-dosing",
  "title": "Cefadroxil Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Cefadroxil",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Endocarditis",
        "content": [
          "Prophylaxis (dental, upper resp procedure): 50 mg/kg PO 1 hour before procedure, no more than 2 g"
        ]
      },
      {
        "title": "Bacterial infections",
        "content": [
          "Dose: 30 mg/kg/day PO divided q12hr; Max Dose: 2 g/day",
          "Dose, duration varies w/ infection type, severity"
        ]
      },
      {
        "title": "Pharyngitis/Tonsillitis, Streptococcal",
        "content": [
          "Dose: 30 mg/kg PO qDay for 10 days; Max Dose: 1 g/dose"
        ]
      },
      {
        "title": "Renal Dosing",
        "content": [
          "CrCl 10-25: give q24h",
          "CrCl <10: give q36h",
          "HD: give supplement; PD: no supplement"
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
      "CAP: 500 mg; TAB: 1000 mg; SUSP: 250 mg per 5 mL, 500 mg per 5 mL"
    ]
  }
}
