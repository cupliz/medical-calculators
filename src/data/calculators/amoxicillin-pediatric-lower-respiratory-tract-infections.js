export { default } from './common/drug-dosage';
export const config = {
  "id": "amoxicillin-pediatric-lower-respiratory-tract-infections",
  "title": "Amoxicillin Pediatric - Lower Respiratory Tract Infections",
  "type": "formula",
  "info": {
    "drugName": "Amoxicillin",
    "drugIndication": "Lower Respiratory Tract Infections | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Mild, Moderate or Severe infections",
        "content": [
          "<3 months: ≤30mg/kg/day PO divided q12hr for 48-72 hours; for ≥10 days for S pyogenes infections",
          ">3 months and <40kg: 45mg/kg/day PO divided q12 hr or 40mg/kg/day divided q8hr",
          ">40kg: 875 mg PO q12hr or 500 mg PO q8hr for 10-14 days"
        ]
      },
      {
        "title": "Pneumonia, Community-acquired (Off-label)",
        "content": [
          "<3 months: Safety and efficacy is not established",
          "≥3 months - Immediate release (Max: 500 mg/dose):",
          "-Empiric treatment: 90 mg/kg/day PO divided q12 hr for 10 days; not to exceed 4,000 mg/day",
          "-Group A Streptococcus: 50-75 mg/kg/day PO divided q12hr for 10 days; not to exceed 4,000 mg/day",
          "-H. influenza: 75-100 mg/kg/day PO divided q8hr for 10 days; not to exceed 4,000 mg/day",
          "-S. pneumoniae (mild infection or step-down therapy or when MICs to penicillin ≤2.0 mcg/mL): 90 mg/kg/day PO divided q12hr or 45 mg/kg/day divided q8hr for 10 days; not to exceed 4,000 mg/day",
          ">5years - Immediate release (Max: 4000 mg/day):",
          "Dose: 90 mg/kg/day PO divided q12h x5-10 days"
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
