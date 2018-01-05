export { default } from './common/drug-dosage';
export const config = {
  "id": "dexamethasone-pediatric-dosing",
  "title": "Dexamethasone Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Dexamethasone",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Airway Edema",
        "content": [
          "Dose: 0.5-2 mg/kg/day PO/IV/IM divided q6hr, starting 24 hours before extubation and continued for 4-6 doses afterward"
        ]
      },
      {
        "title": "Adrenal Insufficiency",
        "content": [
          "Dose: 0.03-0.3 mg/kg/day PO divided q6-12h",
          "Give with food; taper dose gradually to discontinue"
        ]
      },
      {
        "title": "Croup",
        "content": [
          "Dose: 0.6 mg/kg PO/IV/IM once",
          "Max Dose: 20 mg/dose",
          "May use 0.15-0.3 mg/kg PO x1 for mild-moderate croup; give with food"
        ]
      },
      {
        "title": "Altitude Sickness",
        "content": [
          "Dose: 0.15 mg/kg PO q6h",
          "Max Dose: 4 mg/dose; Info: give w/ food"
        ]
      },
      {
        "title": "Inflammation",
        "content": [
          "0.08-0.3 mg/kg/day IV/PO/IM divided q6hr or q12hr"
        ]
      },
      {
        "title": "Respiratory Distress Syndrome in Premature Infants (Off Label)",
        "content": [
          "Prophylaxis: 4 mg IM q8hr administered to mother for 2 days before delivery"
        ]
      },
      {
        "title": "Spinal Cord Compression",
        "content": [
          "Dose: 2 mg/kg/day IV divided q6hr"
        ]
      },
      {
        "title": "Cerebral Edema Associated with Brain Tumor",
        "content": [
          "Dose: 1-2 mg/kg IV/IM once; maintenance: 1-1.5 mg/kg/day IV/IM divided q4-6hr; not to exceed 16 mg/day "
        ]
      },
      {
        "title": "Meningitis",
        "content": [
          ">6 weeks: 0.6 mg/kg/day IV divided q6hr for first 2-4 days of antibiotic therapy, starting 10-20 minutes before or simultaneously with first antibiotic dose "
        ]
      },
      {
        "title": "Corticosteroid-responsive conditions",
        "content": [
          "Dose: 0.08-0.3 mg/kg/day PO divided q6-12h",
          "Dose and frequency varies by condition; give with food",
          "Taper dose gradually to discontinue if high dose or long-term use"
        ]
      },
      {
        "title": "Bronchopulmonary Dysplasia",
        "content": [
          "Dose: 0.5-0.6 mg/kg/day PO divided q12h x3-7 days",
          "Give with food; taper dose over 1-6 weeks to discontinue"
        ]
      },
      {
        "title": "Renal & Hepatic Dosing",
        "content": [
          "Renal Impairment: No adjustment",
          "Hepatic Impairment: No adjustment"
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
      "Dosage forms:  TAB: 0.5 mg, 0.75 mg, 1 mg, 1.5 mg, 2 mg, 4 mg, 6 mg; SOL: 0.5 mg per 5 mL, 1 mg per mL"
    ]
  }
}
