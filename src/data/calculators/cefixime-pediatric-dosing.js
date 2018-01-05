export { default } from './common/drug-dosage';
export const config = {
  "id": "cefixime-pediatric-dosing",
  "title": "Cefixime Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Cefixime",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Acute Bronchitis & Acute Exacerbations of Chronic Bronchitis",
        "content": [
          "<6 months: Safety and efficacy not established",
          "6 months-12 years, ≤50 kg: 8 mg/kg/day PO in single daily dose or divided q12hr; not to exceed 400 mg/day",
          ">12 years: 400 mg/day PO in single daily dose or divided q12hr"
        ]
      },
      {
        "title": "Otitis Media",
        "content": [
          "<6 months: Safety and efficacy not established",
          "6 months-12 years, ≤50 kg: 8 mg/kg/day PO in single daily dose or divided q12hr; not to exceed 400 mg/day",
          ">12 years: 400 mg/day PO in single daily dose or divided q12hr"
        ]
      },
      {
        "title": "Bacterial Infections",
        "content": [
          "6 months-12 years, ≤50 kg: 8 mg/kg/day PO divided qd-bid; Info: duration varies by infection site/severity",
          "6 months-12 years, >50 kg: 400 mg PO qd; Alt: 200 mg PO bid; Info: duration varies by infection site/severity",
          ">12 years: 400 mg PO qd; Alt: 200 mg PO bid; Info: duration varies by infection site/severity"
        ]
      },
      {
        "title": "Pharyngitis/Tonsillitis",
        "content": [
          "<6 months: Safety and efficacy not established",
          "6 months-12 years, ≤50 kg: 8 mg/kg/day PO in single daily dose or divided q12hr; not to exceed 400 mg/day",
          ">12 years: 400 mg/day PO in single daily dose or divided q12hr"
        ]
      },
      {
        "title": "Uncomplicated Gonorrhea (Cervical or Urethral)",
        "content": [
          "<6 months: Safety and efficacy not established",
          "6 months-12 years, ≤50 kg: 8 mg/kg/day PO in single daily dose or divided q12hr; not to exceed 400 mg/day",
          ">12 years: 400 mg PO once plus azithromycin 1 g in single dose or doxycycline 100 mg PO q12hr for 7 days"
        ]
      },
      {
        "title": "Uncomplicated Urinary Tract Infections",
        "content": [
          "<6 months: Safety and efficacy not established",
          "6 months-12 years, ≤50 kg: 8 mg/kg/day PO in single daily dose or divided q12hr; not to exceed 400 mg/day",
          ">12 years: 400 mg/day PO in single daily dose or divided q12hr"
        ]
      },
      {
        "title": "Typhoid Fever (Off Label)",
        "content": [
          "15-20 mg/kg/day PO divided q12hr for 7-14 days; not to exceed 400 mg/day"
        ]
      },
      {
        "title": "Sinusitis",
        "content": [
          "Children: 8 mg/kg/day PO divided q12h x10-14 days; Use w/ clindamycin"
        ]
      },
      {
        "title": "Pneumonia, Community-acquired",
        "content": [
          "Children: 8 mg/kg/day PO divided q12h x10-14 days; Refer to IDSA guidelines"
        ]
      },
      {
        "title": "Renal Dosing",
        "content": [
          "CrCl 21-59: decr. dose 35%",
          "CrCl <20: decr. dose 50%",
          "HD: decrease dose 35%; PD: decrease dose 50%"
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
      "Dosage forms:  Suspension: 100 mg per 5 mL, 200 mg per 5 mL"
    ]
  }
}
