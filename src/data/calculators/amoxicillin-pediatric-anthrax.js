export { default } from './common/drug-dosage';
export const config = {
  "id": "amoxicillin-pediatric-anthrax",
  "title": "Amoxicillin Pediatric - Anthrax",
  "type": "formula",
  "info": {
    "drugName": "Amoxicillin",
    "drugIndication": "Anthrax (Off-Label) | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Post-exposure inhalational prophylaxis",
        "content": [
          "<40 kg: 15 mg/kg PO q8hr (minimum recommended dose; should not be <45 mg/kg/day or >q8hr",
          ">40 kg: 500 mg PO q8hr",
          "80 mg/kg/day PO divided q8hr for 4 weeks (with concomitant vaccine) or for 60 days (without vaccine)"
        ]
      },
      {
        "title": "Cutaneous",
        "content": [
          "Neonates > 32wk gestation: Dose: 50-75 mg/kg/day PO divided q8-12h x7-10 days; Info: for penicillin-susceptible B. anthracis non-systemic infection; dose, frequency depend on gestational and post-natal age; give abx x60 days total if bioterrorism suspected",
          ">1 month: Dose: 75 mg/kg/day PO divided q8h x7-10 days; Max: 1 g/dose; Info: for penicillin-susceptible B. anthracis non-systemic infection; give abx x60 days total if bioterrorism suspected"
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
