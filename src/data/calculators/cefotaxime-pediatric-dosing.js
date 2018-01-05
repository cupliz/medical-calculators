export { default } from './common/drug-dosage';
export const config = {
  "id": "cefotaxime-pediatric-dosing",
  "title": "Cefotaxime Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Cefotaxime",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Bacterial Infections",
        "content": [
          "Neonates 0-7 days old:",
          "<2000g: 100 mg/kg/day IM/IV divided q12h; Duration varies w/ infection type, severity",
          ">2000g: 100-150 mg/kg/day IM/IV divided q8-12h; Dose, duration varies w/ infection type, severity",
          "",
          "Neonates >7days old:",
          "<1200 g: 100 mg/kg/day IM/IV divided q12h; Info: duration varies w/ infection type, severity",
          "1200-2000g: 150 mg/kg/day IM/IV divided q8h; Duration varies w/ infection type, severity",
          ">2000g: 150-200 mg/kg/day IM/IV divided q6-8h; Dose, duration varies w/ infection type, severity",
          "Infants/Children:",
          "<50kg:  75-200 mg/kg/day IM/IV divided q6-8h; Max: 12 g/day; Dose, duration varies w/ infection type, severity",
          ">50kg: See adult dosing"
        ]
      },
      {
        "title": "Meningitis",
        "content": [
          "<12 years or <50 kg: 200 mg/kg/day IV/IM divided q6hr",
          ">12 years or >50 kg: 2 g IV q4-6hr in combination with other antimicrobial therapy as necessary"
        ]
      },
      {
        "title": "Community Acquired Pneumonia, Severe",
        "content": [
          "> 3 months: 150 mg/kg/day IV divided q8h x10 days; Max: 12 g/day",
          "May switch to PO regimen when possible to complete course"
        ]
      },
      {
        "title": "Gonococcal Infections",
        "content": [
          "Neonates: 50 mg/kg/day IM/IV divided q12h x7 days; Info: for disseminated infection or scalp abscess; give x10-14 days if documented meningitis",
          "Children >45kg or Adolescents: See adult dosing"
        ]
      },
      {
        "title": "Pneumococcal Infections",
        "content": [
          "Infants/children <50kg: 150-300 mg/kg/day IM/IV divided q6-8h; Max: 12 g/day; Info: give 225-300 mg/kg/day if meningitis; dose, duration varies w/ infection type, severity",
          "Children >50kg or Adolescents: See adult dosing"
        ]
      },
      {
        "title": "Sepsis",
        "content": [
          "<12 years or <50 kg: 150 mg/kg/day IV divided q8hr",
          ">12 years or >50 kg: 2 g IV q6-8hr"
        ]
      },
      {
        "title": "Severe Acute Sinusitis",
        "content": [
          "Children: 100-200 mg/kg/day IV divided q6h x10-14 days"
        ]
      },
      {
        "title": "Typhoid fever",
        "content": [
          "<12 years or <50 kg: 150-200 mg/kg/day IV/IM divided q6-8hr; Not to exceed 12 g/day",
          "Fluoroquinolone resistant patients: 80 mg/kg/day IV/IM divided q6-8hr; Not to exceed 12 g/day",
          ">12 years or >50 kg: 1-2 g IV/IM q4-8hr"
        ]
      },
      {
        "title": "Epiglottis",
        "content": [
          "<12 years or <50 kg: 150-200 mg/kg/day IV/IM divided q6hr plus clindamycin for 7-10 days",
          ">12 years or >50 kg: 1-2 g IV/IM q8hr"
        ]
      },
      {
        "title": "Renal Dosing",
        "content": [
          "CrCl <20: decr. dose 50%",
          "HD: give supplement; PD: no supplement"
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
      "Dosage forms:",
      "Powder for injection: 500mg, 1g, 2g, 10g",
      "Injectable solution: 20mg/mL, 40mg/mL"
    ]
  }
}
