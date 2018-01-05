export { default } from './common/drug-dosage';
export const config = {
  "id": "diclofenac-sodium-pediatric-dosing",
  "title": "Diclofenac Sodium Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Diaclofenac Sodium",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Juvenile Idiopathic Arthritis",
        "content": [
          "Delayed Release Form:",
          ">3 years: 2-3 mg/kg/day PO divided bid-qid",
          "Max Dose: 150 mg/day",
          "Use lowest effective dose, shortest effective treatment duration; give w/ food if GI upset occurs; Discontinue if abnormal liver or renal tests persist or worsen"
        ]
      },
      {
        "title": "Post-operative Pain",
        "content": [
          "Dose: 1 mg/kg/day PO divided bid-tid; Max Dose: 150 mg/day",
          "Use lowest effective dose, shortest effective treatment duration; give w/ food if GI upset occurs; Discontinue if abnormal liver or renal tests persist or worsen"
        ]
      },
      {
        "title": "Renal & Hepatic Dosing",
        "content": [
          "Delayed Release Form:",
          "Renal/Hepatic Impairment: No specific pediatric dosing, see adult dosing adjustments for guidance"
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
      "Dosage forms:  Delayed Release (DR) TAB: 25 mg, 50 mg, 75 mg"
    ]
  }
}
