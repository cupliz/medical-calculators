export { default } from './common/drug-dosage';
export const config = {
  "id": "ceftriaxone-pediatric-dosing",
  "title": "Ceftriaxone Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Ceftriaxone",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Acute Bacterial Otitis Media",
        "content": [
          "Initial Infection:",
          "2 month - 12 years: 50 mg/kg IM/IV x1; Max: 1 g/dose",
          "Alt: 50 mg/kg IM/IV q24h x3 days",
          "",
          "Recurrent Infection:",
          "2 month - 12 years: 50 mg/kg IM/IV q24h x3 days; Max: 1 g/dose",
          "For pts w/ prior tx failure"
        ]
      },
      {
        "title": "Bacterial Infections",
        "content": [
          "Neonates",
          "<7 days: 50 mg/kg IM/IV q24h; Duration varies with infection type, severity",
          "> 7 days and < 2kg: 50 mg/kg IM/IV q24h; Duration varies with infection type, severity",
          "> 7 days and > 2kg: 50-75 mg/kg IM/IV q24h; Dose, duration vary with infection type, severity",
          "",
          "Infants/Children: Dose: 50-100 mg/kg/day IM/IV divided q12-24h; Max: 4 g/24h",
          "Dose, duration vary with infection type, severity"
        ]
      },
      {
        "title": "Meningitis, Bacterial",
        "content": [
          "Infants/Children: 80-100 mg/kg/day IV divided q12-24h x7-21 days",
          "Start: 100 mg/kg IV x1; Max: 4 g/24h"
        ]
      },
      {
        "title": "Community Acquired Pneumonia, Severe",
        "content": [
          "> 3 months: 50-100 mg/kg/day IM/IV divided q12-24h x10 days; Max: 2 g/day",
          "May switch to PO regimen when possible to complete course"
        ]
      },
      {
        "title": "Gonococcal Infections",
        "content": [
          "Uncomplicated infection:",
          "Children < 45kg:  25-50 mg/kg IM/IV x1; Max: 125 mg/dose IM; 250 mg/dose IV; For infections of pharynx, cervix, urethra, rectum",
          "Children > 45kg: 250 mg IM x1; Info: for infections of pharynx, cervix, urethra, rectum; use w/ azithromycin regardless of chlamydia test result",
          "For pts >8 yo, may alternatively use w/ doxycycline",
          "For adolescents see adult dosing",
          "",
          "Disseminated infection:",
          "Neonates: 25-50 mg/kg IM/IV q24h x7 days; Info: for arthritis, sepsis, scalp abscess; give x10-14 days if meningitis",
          "Children <45kg: 50 mg/kg IM/IV q24h x7 days; Max: 1 g/dose; For bacteremia or arthritis",
          "Children >45kg: 1 g IM/IV q24h x7 days; Info: for bacteremia or arthritis",
          "For adolescents see adult dosing",
          "",
          "Presumptive Treatment:",
          "Neonates: 25-50 mg/kg IM/IV x1; Max: 125 mg/dose; For neonates born to mothers w/ gonococcal infection",
          "Adolescents: 250 mg IM x1; Info: for sexual assault victims; part of multi-drug regimen"
        ]
      },
      {
        "title": "Endocarditis",
        "content": [
          "Treatment:",
          "100 mg/kg/day IV divided q12h for at least 4 weeks",
          "Max: 4 g/day; Alt: 80 mg/kg IV q24h for at least 4 weeks",
          "Duration varies w/ pathogen susceptibility, valve type; may be part of multi-drug regimen incl. gentamicin gram positive synergy; refer to AHA guidelines",
          "",
          "Prophylaxis, Dental",
          "50 mg/kg IM/IV x1; Start: 30-60min before procedure; Max: 1 g/dose"
        ]
      },
      {
        "title": "Severe Acute Sinusitis",
        "content": [
          "Children: 50 mg/kg/day IV divided q12h x10-14 days"
        ]
      },
      {
        "title": "Typhoid fever",
        "content": [
          "Dose 100 mg/kg IV q24h x10-14 days; Max 4g/24hr"
        ]
      },
      {
        "title": "Ophthalmia Neonatorum",
        "content": [
          "25-50 mg/kg IM/IV x1; Max: 125 mg/dose"
        ]
      },
      {
        "title": "PID, mild to moderate/severe",
        "content": [
          "Adolescents: 250 mg IM x1; Info: use w/ doxycycline and optional metronidazole"
        ]
      },
      {
        "title": "Proctitis",
        "content": [
          "Adolescents: 250 mg IM x1; Info: use w/ doxycycline"
        ]
      },
      {
        "title": "Epididymitis (Off Label)",
        "content": [
          "> 8 years and >45 kg: 250 mg IM once with concomitant doxycycline regimen",
          "Use w/ levofloxacin or ofloxacin if enteric organisms suspected"
        ]
      },
      {
        "title": "Epiglottis (Off Label)",
        "content": [
          "100 mg/kg/day IV on first day; follow with 50 mg/kg on day 2 or 75 mg/kg qDay for 10-14 days"
        ]
      },
      {
        "title": "Chancroid",
        "content": [
          "Adolescents: 250 mg IM x 1"
        ]
      },
      {
        "title": "Renal Dosing",
        "content": [
          "CrCl <10: give q24h",
          "HD/PD: 50 mg/kg q24h, no supplement"
        ]
      },
      {
        "title": "Hepatic Dosing",
        "content": [
          "Hepatic impairment: Dose adjustment may be required although specific pediatric dosing adjustments are not defined",
          "See adult hepatic dosing for guidance"
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
      "Powder for injection 1g, 2g",
      "Infusion solution 1g/50mL, 2g/100mL"
    ]
  }
}
