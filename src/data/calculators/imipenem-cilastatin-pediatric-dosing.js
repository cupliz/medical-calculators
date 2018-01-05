export { default } from './common/drug-dosage';
export const config = {
  "id": "imipenem-cilastatin-pediatric-dosing",
  "title": "Imipenem/Cilastatin Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Imipenem/Cilastatin",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Non-CNS Bacterial Infections",
        "content": [
          "<1 week old, >1500 g: 50 mg/kg/day IV divided q12h; Max: 4 g/day",
          "1-4 weeks old, >1500g: 75 mg/kg/day IV divided q8h; Max: 4 g/day",
          "1-3 months old, >1500g: 100 mg/kg/day IV divided q6h; Max: 4 g/day",
          "≥3 months:  60-100 mg/kg/day IV divided q6h; Max: 4 g/day",
          "Treatment duration varies w/ infection type, severity"
        ]
      },
      {
        "title": "Systemic Anthrax",
        "content": [
          "Neonates >32 weeks gestation: 40-75 mg/kg/day IV divided q8-12h for at least 2wk; Dose depends on infection site, gestational and post-natal age; not first line agent; part of multi-drug regimen; switch to PO abx x60 days total if there is inhalational exposure",
          "≥1 months: 100 mg/kg/day IV divided q6h for at least 2wk; Max: 1 g/dose; Not first line agent; part of multi-drug regimen; switch to PO abx x60 days total if there is inhalational exposure"
        ]
      },
      {
        "title": "Renal Dosing",
        "content": [
          "<30kg: Avoid use",
          ">30kg: CrCl 41-70: decrease dose 50%; CrCl 21-40: decr. dose 63%, give q8h; CrCl 6-20: decr. dose 75%, give q12h; CrCl <5: avoid unless HD w/in 48h",
          "HD: give dose after dialysis, no supplement",
          "PD: No supplement "
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
      "Dosage forms: 250mg/250mg"
    ]
  }
}
