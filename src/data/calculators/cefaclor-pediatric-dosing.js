export { default } from './common/drug-dosage';
export const config = {
  "id": "cefaclor-pediatric-dosing",
  "title": "Cefaclor Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Cefaclor",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Bacterial Infections",
        "content": [
          "< 1 month: Safety and efficacy not established",
          "> 1 month: Start: 20-40 mg/kg/day PO divided q8-12h; Max Dose: 1 g/day",
          "Dose & treatment duration varies with infection type and severity"
        ]
      },
      {
        "title": "Renal Dosing",
        "content": [
          "CrCl <10: decrease dose 50%",
          " HD: give dose after dialysis; PD: no supplement"
        ]
      },
      {
        "title": "Hepatic Dosing",
        "content": [
          "Not defined"
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
      "Dosage forms:  CAP: 250 mg, 500 mg; SUSP: 125 mg per 5 mL, 250 mg per 5 mL, 375 mg per 5 mL"
    ]
  }
}
