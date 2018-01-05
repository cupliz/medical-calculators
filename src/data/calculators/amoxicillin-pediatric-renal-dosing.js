export { default } from './common/drug-dosage';
export const config = {
  "id": "amoxicillin-pediatric-renal-dosing",
  "title": "Amoxicillin Pediatric - Renal Dosing",
  "type": "formula",
  "info": {
    "drugName": "Amoxicillin",
    "drugIndication": "Renal Dosing | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Immediate Release Form",
        "content": [
          "CrCl 10-30: give q12h",
          "CrCl <10: give q24h",
          "HD: give supplement, PD: no supplement",
          "Do not use 875 mg tab if CrCl <30"
        ]
      },
      {
        "title": "Extended Release Form",
        "content": [
          "CrCl <30: Avoid use"
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
      "Drug Administration: Take without regard to meals",
      "Mixing oral suspension: Tap bottle until all powder flows freely; add approximately one third of the total amount of water for reconstitution and shake vigorously to wet powder; add remainder of water and shake vigorously again",
      "After reconstitution, place required amount of suspension directly on child’s tongue for swallowing; if taste is unacceptable, required amount of suspension can be added to formula, milk, fruit juice, water, ginger ale, or other cold drinks; preparation must be taken immediately",
      "Shake suspension well before using; any unused portion must be discarded after 14 days",
      "Dosage forms:  CAP: 250 mg, 500 mg; TAB: 500 mg, 875 mg; ER TAB: 775 mg; CHEWABLE: 125 mg, 250 mg; SUSP: 125 mg per 5 mL, 200 mg per 5 mL, 250 mg per 5 mL, 400 mg per 5 mL"
    ]
  }
}
