export { default } from './common/drug-dosage';
export const config = {
  "id": "cefepime-pediatric-dosing",
  "title": "Cefepime Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Cefepime",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Bacterial Infections",
        "content": [
          "≥ 2 months: 50 mg/kg IV/IM q8-12h; Max: 2 g/dose; Info: frequency, duration vary w/ infection type, severity; IM only for mild-mod. UTI due to E. coli; for mod-severe pseudomonal infections give q8h"
        ]
      },
      {
        "title": "Febrile Neutropenia",
        "content": [
          "≥ 2 months: 50 mg/kg IV q8h; Max: 2 g/dose"
        ]
      },
      {
        "title": "Respiratory infections, Cystic Fibrosis",
        "content": [
          "≥ 2 months: 50 mg/kg IV q8h x2wk; Max: 2 g/dose"
        ]
      },
      {
        "title": "Pneumonia, Moderate to Severe",
        "content": [
          "50 mg/kg IV q12hr for 10 days; not to exceed 2 g q12hr"
        ]
      },
      {
        "title": "Skin/Skin Structure Infections, Uncomplicated",
        "content": [
          "50 mg/kg IV q12hr for 10 days; not to exceed 2 g q12hr"
        ]
      },
      {
        "title": "Urinary Tract Infections",
        "content": [
          "50 mg/kg IV/IM q12hr for 7-10 days; not to exceed 2 g q12hr"
        ]
      },
      {
        "title": "Renal Dosing",
        "content": [
          "CrCl 30-60: 50 mg/kg q12h",
          "CrCl 11-29: 50 mg/kg q24h",
          "CrCl <11: 50 mg/kg x1, then 25 mg/kg q24h",
          "HD: 25 mg/kg q24h, give after dialysis; PD: 50 mg/kg q48h",
          "",
          "All other infections:",
          "CrCl 30-60: 50 mg/kg q24h",
          "CrCl 11-29: 50 mg/kg x1, then 25-50 mg/kg q24h",
          "CrCl <11: 50 mg/kg x1, then 12.5-25 mg/kg q24h",
          "HD: 50 mg/kg x1, then 25 mg/kg q24h, give after dialysis; PD: 50 mg/kg q48h"
        ]
      },
      {
        "title": "Hepatic Dosing",
        "content": [
          "No adjustment"
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
      "Dosage forms:",
      "Powder for injection 1g, 2g",
      "Infusion solution 1g/50mL, 2g/100mL"
    ]
  }
}
