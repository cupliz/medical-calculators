export {default} from './common/drug-dosage';
export const config = {
  "id": "amoxicillin-pediatric-ear-nose-throat",
  "title": "Amoxicillin Pediatric - Ear, Nose, & Throat Infections",
  "type": "formula",
  "info": {
    "drugName": "Amoxicillin",
    "drugIndication": "Ear, Nose & Throat Infections | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Mild to Moderate infections",
        "content": [
          "<3 months: ≤30mg/kg/day PO divided q12hr for 48-72 hours; for ≥10 days for S pyogenes infections",
          ">3 months and <40kg: 25mg/kg/day PO divided q12 hr or 20mg/kg/day divided q8hr",
          ">40kg: 500 mg PO q12hr or 250 mg PO q8hr for 10-14 days"
        ]
      },
      {
        "title": "Severe Infections",
        "content": [
          "<3 months: ≤30mg/kg/day PO divided q12hr for 48-72 hours; for ≥10 days for S pyogenes infections",
          ">3 months and <40kg: 45mg/kg/day PO divided q12 hr or 40mg/kg/day PO divided q8hr",
          ">40kg: 500 mg PO q12hr or 250 mg PO q8hr for 10-14 days"
        ]
      },
      {
        "title": "Tonsilitis/Streptococcal pharyngitis",
        "content": [
          "50mg/kg PO qDay for 10 days, not to exceed 1g/day, or 25mg/kg PO BID for 10 days, not to exceed 500mg/dose",
          ">12 years: 775 mg PO qDay for 10days, taken within 1 hour after meal (swallow tablet whole; do not crush or chew)"
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
