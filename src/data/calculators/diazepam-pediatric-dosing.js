export { default } from './common/drug-dosage';
export const config = {
  "id": "diazepam-pediatric-dosing",
  "title": "Diazepam Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Diazepam",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Anxiety",
        "content": [
          "<6 months: Not recommended",
          "6 months to 12 years: 0.12-0.8 mg/kg/day PO divided q6-8h; Alt: 0.04-0.2 mg/kg IM/IV q2-4h prn; Max Dose: 0.6 mg/kg/8h IM/IV; Info: taper dose gradually to discontinue if long-term use",
          ">12 years: 2-10 mg PO bid-qid; Alt: 2-10 mg IM/IV q3-4h prn; Taper dose gradually to discontinue if long-term use"
        ]
      },
      {
        "title": "Muscle spasms",
        "content": [
          "6 months to 12 years: 0.12-0.8 mg/kg/day PO divided q6-8h; Alt: 0.04-0.2 mg/kg IM/IV q2-4h prn; Max Dose: 0.6 mg/kg/8h IM/IV; Info: Taper dose gradually to discontinue if long-term use",
          ">12 years: 2-10 mg PO bid-qid; Alt: 2-10 mg IM/IV q3-4h prn; Info: Taper dose gradually to discontinue if long-term use"
        ]
      },
      {
        "title": "Status Epilepticus",
        "content": [
          "Potentially toxic dose in patients <6 years",
          "IV for 1 month to 4 years: 0.1-0.3 mg/kg IV q5-10min prn; Max Dose: 5 mg/total dose",
          "IV for 5 to 12 years: 0.1-0.3 mg/kg IV q5-10min prn; Max Dose: 10 mg/total dose",
          "IV for >13 years: 5-10 mg IV q10-15min prn; Max Dose: 30 mg/total dose",
          "PR for 2-6 years: 0.5 mg/kg; may repeat in 4-12 hours PRN",
          "PR for 6-12 years: 0.3 mg/kg; may repeat in 4-12 hours PRN",
          "PR for >12 years: 0.2 mg/kg; may repeat in 4-12 hours PRN"
        ]
      },
      {
        "title": "Tetanus, adjunct treatment",
        "content": [
          "1 month to 4 years: 1-2 mg IM/IV q3-4h prn; Info: taper dose gradually to discontinue if long-term use ",
          ">5 years: 5-10 mg IM/IV q3-4h prn; Info: taper dose gradually to discontinue if long-term use"
        ]
      },
      {
        "title": "Seizure disorder, adjunct treatment",
        "content": [
          "PR for 2 to 5 years: 0.5 mg/kg PR x1; Max: 1 tx/5 days up to 5 tx/mo; Info: may repeat dose x1 in 4-12h; 10 mg and 20 mg applicators deliver doses in 2.5 mg increments; use 10 mg per applicatorful for 5 mg, 7.5 mg, or 10 mg doses; use 20 mg per applicatorful for 12.5 mg, 15 mg, 17.5 mg, or 20 mg doses; use 2.5 mg per applicatorful for partial replacement or supplement",
          "PR for 6 to 11 years: 0.3 mg/kg PR x1; Max: 1 tx/5 days up to 5 tx/mo; Info: may repeat dose x1 in 4-12h; 10 mg and 20 mg applicators deliver doses in 2.5 mg increments; use 10 mg per applicatorful for 5 mg, 7.5 mg, or 10 mg doses; use 20 mg per applicatorful for 12.5 mg, 15 mg, 17.5 mg, or 20 mg doses; use 2.5 mg per applicatorful for partial replacement or supplement",
          "PR for >12 years: 0.2 mg/kg PR x1; Max: 1 tx/5 days up to 5 tx/mo; Info: may repeat dose x1 in 4-12h; 10 mg and 20 mg applicators deliver doses in 2.5 mg increments; use 10 mg per applicatorful for 5 mg, 7.5 mg, or 10 mg doses; use 20 mg per applicatorful for 12.5 mg, 15 mg, 17.5 mg, or 20 mg doses; use 2.5 mg per applicatorful for partial replacement or supplement"
        ]
      },
      {
        "title": "Renal & Hepatic Dosing",
        "content": [
          "Renal impairment: Caution advised; Metabolite accumulation is possible with chronic use ",
          "Hepatic impairment: Mild to Moderate impairment - caution advised; Severe impairment - Contraindicated"
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
      "Dosage forms: TAB: 2 mg, 5 mg, 10 mg; SOL: 5 mg per 5 mL, 5 mg per mL; INJ: 5 mg per mL",
      "Diazepam Rectal Dosage forms: GEL: 2.5 mg per applicatorful, 10 mg per applicatorful, 20 mg per applicatorful"
    ]
  }
}
