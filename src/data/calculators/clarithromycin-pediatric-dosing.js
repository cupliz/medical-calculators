export { default } from './common/drug-dosage';
export const config = {
  "id": "clarithromycin-pediatric-dosing",
  "title": "Clarithromycin Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Clarithromycin",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Acute Otitis Media",
        "content": [
          "2 - 5 months: 15 mg/kg/day PO divided q12h x10 days",
          "6 months to 12 years: 15 mg/kg/day PO divided q12h x5-10 days"
        ]
      },
      {
        "title": "Pharyngitis/Tonsillitis, Streptococcal",
        "content": [
          "≥6 months: 15 mg/kg/day PO divided q12h x10 days; Max: 250 mg/dose"
        ]
      },
      {
        "title": "Community-Acquired Pneumonia, Sinusitis, Bronchitis, Skin Infections",
        "content": [
          ">3 months: 15 mg/kg/day PO divided q12h x7-10 days"
        ]
      },
      {
        "title": "Bacterial Infections",
        "content": [
          "15 mg/kg/day PO divided q12h; Max: 1000 mg/day",
          "Treatment duration varies with infection type, severity",
          "Not recommended for sinusitis per IDSA guidelines"

        ]
      },
      {
        "title": "Endocarditis Prophylaxis, Dental",
        "content": [
          "15mg/kg PO x 1",
          "Start: 30-60min before procedure; Max: 500 mg/dose"
        ]
      },
      {
        "title": "H. Pylori Infections",
        "content": [
          "15-24 kg: 250 mg PO bid x10-14 days; Info: part of multi-drug regimen; see H. pylori Tx Regimens, Pediatric 15-24 kg table",
          "25-34 kg: 500 mg PO qam and 250 mg PO qpm x10-14 days; Info: part of multi-drug regimen; see H. pylori Tx Regimens, Pediatric 25-34 kg table",
          ">35 kg: 500 mg PO bid x10-14 days; Info: part of multi-drug regimen; see H. pylori Tx Regimens, Pediatric >35 kg table"
        ]
      },
      {
        "title": "Mycobacterium Avium Complex Infection (MAC)",
        "content": [
          "Primary prophylaxis (HIV):",
          "20 month to 12 years: 15 mg/kg/day PO divided q12h; Max: 500 mg/dose",
          "≥13 years: 500 mg PO q12h",
          "",
          "Secondary prophylaxis (HIV):",
          "20 month to 12 years: 15 mg/kg/day PO divided q12h; Max: 500 mg/dose; use w/ ethambutol",
          "≥13 years: 500 mg PO q12h; use w/ ethambutol",
          "",
          "Treatment:",
          "20 month to 12 years: 15-30 mg/kg/day PO divided q12h; Max: 500 mg/dose; use w/ ethambutol",
          "≥13 years: 500 mg PO q12h; Info: use w/ ethambutol"
        ]
      },
      {
        "title": "Pertussis",
        "content": [
          "<1 month: Safety and efficacy not established",
          "1-6 months: 7.5 mg/kg/dose PO q12hr for 7 days",
          ">6 months: 7.5 mg/kg/dose PO q12hr for 7 days"
        ]
      },
      {
        "title": "Renal Dosing",
        "content": [
          "Renal Impairment: all uses without ritonavir, atazanavir, or delavirdine",
          "CrCl <30: decr. dose 50% or give q24h",
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
      "Dosage forms:  TAB: 250 mg, 500 mg; SUSP: 125 mg per 5 mL, 250 mg per 5 mL"
    ]
  }
}
