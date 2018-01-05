export { default } from './common/drug-dosage';
export const config = {
  "id": "ceftazidime-sodium-pediatric-dosing",
  "title": "Ceftazidime Sodium Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Ceftazidime Sodium",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Infections caused by Susceptible Organisms",
        "content": [
          "<1 month: Safety and efficacy not established",
          "≥1 month - 12 years: 30-50 mg/kg IV q8hr; Max Dose: 6 g/day (higher end of dosing range reserved for immunocompromised patients, meningitis, or cystic fibrosis)",
          ">12 years: -2 g IV q8hr"
        ]
      },
      {
        "title": "Bacterial Infections",
        "content": [
          "Neonates 0-7 days: 100 mg/kg/day IM/IV divided q12h",
          "Neonates >7 days, <1200g: 100 mg/kg/day IM/IV divided q12h",
          "Neonates >7 days, >1200g: 150 mg/kg/day IM/IV divided q8h",
          "1 month - 12 years: 90-150 mg/kg/day IM/IV divided q8h; Max Dose 6 g/day; Reserve high dose for patients that are immunocompromised, with cystic fibrosis, or meningitis "
        ]
      },
      {
        "title": "Renal Dosing",
        "content": [
          "CrCl 30-50: give q12h",
          "CrCl 10-29: give q24h",
          "CrCl <10: give q48h",
          "HD/PD: no supplement"
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
      "Dosing Considerations: Use sodium carbonate preparation",
      "Usual dosing range for neonates (per manufacturer): <28 days: 30mg/kg IV q12h",
      "Usual dosing range for neonates (per American Academy of Pediatrics):",
      "7-28 days: 50 mg/kg IV q8hr",
      "<7 days, <2 kg: 50 mg/kg IV q12hr",
      "<7 days, >2 kg: 50 mg/kg IV q8-12hr",
      "Dosage forms:",
      "Injectable Solution: 20mg/mL, 40mg/mL",
      "Powder for injection: 500mg, 1g, 2g, 6g"
    ]
  }
}
