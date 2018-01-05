export { default } from './common/drug-dosage';
export const config = {
  "id": "ciprofloxacin-pediatric-dosing",
  "title": "Ciprofloxacin Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Ciprofloxacin",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Complicated Urinary Tract Infections or Pyelonephritis",
        "content": [
          "<1 year: Safety and efficacy not established",
          "≥1 year (IV): 6-10 mg/kg q8hr; individual dose not to exceed 400 mg for 10-21 days",
          "≥1 year (PO): 10-20 mg/kg q12hr; individual dose not to exceed 750 mg q12hr for 10-21 days",
          "Note: Not used as a first line agent"
        ]
      },
      {
        "title": "Systemic Anthrax",
        "content": [
          "Neonates >32 weeks gestation: 20-30 mg/kg/day IV divided q12h for at least 2wk",
          "Used as first line agent; part of multi-drug regimen; dose depends on gestational and post-natal age; switch to PO antibiotics x60 days total if inhalational exposure",
          "≥1 month:  30 mg/kg/day IV divided q8h for at least 2wk; Max: 400 mg/dose",
          "Used as first line agent; part of multi-drug regimen; switch to PO antibiotics x60 days total if inhalational exposure"
        ]
      },
      {
        "title": "Cutaneous Anthrax",
        "content": [
          "Neonates >32 weeks gestation: 20-30 mg/kg/day PO divided q12h x7-10 days",
          "Used for non-systemic infection; first line agent; dose depends on gestational and post-natal age; give antibiotics x60 days total if bioterrorism suspected",
          "≥1 month: 30 mg/kg/day PO divided q12h x7-10 days; Max: 500 mg/dose",
          "Used for for non-systemic infection; first line agent; give antibiotics x60 days total if bioterrorism suspected"
        ]
      },
      {
        "title": "Post-exposure Prophylaxis Anthrax",
        "content": [
          "Neonates >32 weeks gestation: 20-30 mg/kg/day PO divided q12h x60 days",
          "Used for non-systemic infection; first line agent; dose depends on gestational and post-natal age",
          "≥1 month: 30 mg/kg/day PO divided q12h x60 days; Max: 500 mg/dose",
          "Used as first line agent"
        ]
      },
      {
        "title": "Plague",
        "content": [
          "Dose (PO): 15 mg/kg PO q8-12hr x10-21 days; not to exceed 500 mg/dose",
          "Dose (IV): 10 mg/kg IV q8-12hr x 10-21 days; not to exceed 400 mg/dose",
          "Indication for treatment and prophylaxis of plague due to Yersinia pestis in pediatric patients from birth to 17 years of age"
        ]
      },
      {
        "title": "Community Acquired Pneumonia, Moderate to Severe",
        "content": [
          "> 3 months: Dose: 30 mg/kg/day IV divided q12h x10 days",
          "May switch to PO regimen when possible to complete course"
        ]
      },
      {
        "title": "Cholera",
        "content": [
          "Single dose: 30 mg/kg PO",
          "Multiple doses: 30 mg/kg/day PO divided q12hr for 3 days"
        ]
      },
      {
        "title": "Bacterial Infections",
        "content": [
          "Dose (PO): 40 mg/kg PO divided q12h; Max Dose: 750 mg/dose PO",
          "Dose (IV): 15-30 mg/kg/day IV divided q8-12h; Max Dose: 400 mg/dose IV"
        ]
      },
      {
        "title": "Cystic Fibrosis, Respiratory infections",
        "content": [
          "Dose (PO): 40mg/kg/day PO divided q12h; Max Dose: 750 mg/dose PO",
          "Dose (IV): 30 mg/kg/day IV divided q8h; Max Dose: 400 mg/dose PO"
        ]
      },
      {
        "title": "Salmonellosis",
        "content": [
          "Acute: 20-30 mg/kg/day PO divided q12h x3-7 days; Max: 750 mg/dose; Info: may extend tx x1wk if immunocompromised",
          "Chronic Carrier: 20-30 mg/kg/day PO divided q12h x1m; Max: 750 mg/dose"
        ]
      },
      {
        "title": "Typhoid Fever",
        "content": [
          "Dose: 30 mg/kg/day PO or IV divided q12h x1-2wk",
          "Max Dose: 500 mg/dose"
        ]
      },
      {
        "title": "Meningococcal Prophylaxis",
        "content": [
          "≥1 month: 20 mg/kg PO x1; Info: for asymptomatic meningococcal carriers"
        ]
      },
      {
        "title": "Infection Prophylaxis, Surgical",
        "content": [
          "≥1 year: 10 mg/kg IV x1; Start: 120min preop; Info: refer to ASHP/IDSA guidelines"
        ]
      },
      {
        "title": "Renal Dosing",
        "content": [
          "CrCl 10-29: give q18h",
          "CrCl <10: give q24h",
          "HD/PD: no supplement"
        ]
      },
      {
        "title": "Hepatic Dosing",
        "content": [
          "Not defined; Caution advised"
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
      "Tablet: 250 mg, 500 mg",
      "Oral Suspension: 125 mg per 5 mL, 250 mg per 5 mL"
    ]
  }
}
