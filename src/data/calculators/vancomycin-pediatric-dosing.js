export { default } from './common/drug-dosage';
export const config = {
  "id": "vancomycin-pediatric-dosing",
  "title": "Vancomycin Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Vancomycin",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Severe Bacterial Infections",
        "content": [
          "Neonates < 7 days old:",
          "<1.2kg: 15 mg/kg IV q24h",
          "1.2 - 2kg: 10-15 mg/kg IV q12-18h",
          "≥2.1 kg: 10-15 mg/kg IV q8-12h",
          "Adjust dose based on serum levels",
          "",
          "Neonates > 7 days old:",
          "<1.2kg: 15 mg/kg IV q24h",
          "1.2 - 2kg: 10-15 mg/kg IV q12-18h",
          "≥2.1 kg: 15-20 mg/kg IV q8h",
          "Adjust dose based on serum levels",
          "",
          "1 mo - 11 years:10-15 mg/kg IV q6-8h; Max: 1 g/dose",
          "12 - 16 years:1000 mg IV q12h; Alt: 10-15 mg/kg IV q12h; Patients with high clearance may require 1200-1500 mg IV q12h or 10 mg/kg IV q8h",
          "Adjust dose based on serum levels"
        ]
      },
      {
        "title": "Bacterial Meningitis",
        "content": [
          "Dose: 15-20mg/kg IV q6hr; Adjust dose based on serum levels"
        ]
      },
      {
        "title": "C. Difficile Infection",
        "content": [
          "Dose: 40 mg/kg/day PO divided q6-8h x7-10 days",
          "Max: 500 mg/dose, 2000 mg/day",
          "For severe infection or 2nd recurrence; may mix IV powder in 30 mL water and give PO; May use in combo w/ metronidazole PO"
        ]
      },
      {
        "title": "Community Acquired Pneumonia, Severe Bacterial",
        "content": [
          "> 3 months: 40-60 mg/kg/day IV divided q6-8h x10-14 days",
          "Adjust dose based on serum levels; may switch to appropriate oral regimen when possible to complete course"
        ]
      },
      {
        "title": "Endocarditis",
        "content": [
          "Neonates <1 month: 15 mg/kg followed by 10 mg/kg IV q12hr for neonates in first week of life and q8hr thereafter up to 1 month of age; longer dosing intervals recommended in premature infants",
          "Neonates >1 month: 10 mg/kg/day IV divided q6hr; individual dose not to exceed 1 g",
          "Max Dose: 2g/day",
          "Dose, frequency, duration vary w/ pathogen susceptibility, valve type, sx duration; may be part of multi-drug regimen including gentamicin gram positive synergy",
          "Current AHA guidelines recommend using only for high risk patients, Adjust dose based on serum levels"
        ]
      },
      {
        "title": "Staphylococcal Enterocolitis",
        "content": [
          "Dose:40 mg/kg/day PO divided q6-8h x7-10 days",
          "500 mg/dose, 2000 mg/day",
          "May mix IV powder in 30 mL water and give PO"
        ]
      },
      {
        "title": "Pseudomembranous Colitis",
        "content": [
          "Dose:40 mg/kg/day PO divided q6-8h x7-10 days",
          "500 mg/dose, 2000 mg/day",
          "May mix IV powder in 30 mL water and give PO"
        ]
      },
      {
        "title": "Systemic Anthrax",
        "content": [
          "Neonates > 32 week gestation:10-20 mg/kg/dose IV q12-48h for at least 2wk",
          "Not recommended for CNS anthrax; not 1st-line agent; part of multi-drug regimen; dose, frequency depend on Cr",
          "Adjust dose based on serum levels; switch to PO abx x60 days total if inhalational exposure"
        ]
      },
      {
        "title": "Renal Dosing",
        "content": [
          "IV route: CrCl 10-50: give q18-48h; CrCl <10: give q48-96h",
          "HD: give supplement only if high-flux dialyzer used; PD: no supplement",
          "PO route: Consider monitoring serum levels; weigh risk/benefit of decreasing dose or changing tx if systemic accumulation occurs; toxicity, but not efficacy, based on systemic levels"
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
      "Refer to CDC website for recommendations on appropriate use and preventing/controlling spread of vancomycin resistance",
      "Dosage forms:",
      "Capsule: 125 mg, 250 mg",
      "Injectable solution: 5mg/mL",
      "Powder for injection: 750mg, 500mg, 1g, 5g, 10g"
    ]
  }
}
