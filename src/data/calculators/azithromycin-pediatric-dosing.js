export { default } from './common/drug-dosage';
export const config = {
  "id": "azithromycin-pediatric-dosing",
  "title": "Azithromycin Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Azithromycin",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Acute Otitis Media",
        "content": [
          "<6 months: Safety and efficacy not established",
          "≥6 months: 30 mg/kg of oral suspension once or 10 mg/kg PO once daily for 3 days or 10 mg/kg once on day 1 followed by 5 mg/kg on days 2-5"
        ]
      },
      {
        "title": "Pharyngitis/Tonsillitis, Streptococcal",
        "content": [
          "<2 years: Safety and efficacy not established",
          ">2 years: 12 mg/kg PO once daily for 5 days; not to exceed 500 mg/day"
        ]
      },
      {
        "title": "Community-Acquired Pneumonia, Atypical",
        "content": [
          "<6 months: Safety and efficacy not established",
          "Mild infection > 6 months: 10 mg/kg PO x1 on day 1, then 5 mg/kg PO q24h x4 days; Max: 500 mg for 1st dose, 250 mg for subsequent doses ",
          "Moderate to Severe infection > 6 months: 10 mg/kg IV q24h x2 days, then 5 mg/kg PO q24h x3 days; Max: 500 mg/dose IV; 250 mg/dose PO"
        ]
      },
      {
        "title": "Acute Bacterial Sinusitis",
        "content": [
          "10 mg/kg of oral suspension PO once daily for 3 days"
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
        "title": "Chlamydial Infections",
        "content": [
          "Infants: 20 mg/kg PO qd x3 days; Info: for ophthalmia neonatorum or pneumonia; Not a 1st-line agent",
          "Children < 8 years and ≤45 kg: 20 mg/kg PO x1; Max: 1 g/dose; Not 1st-line agent",
          "Children/Adolescents > 8 years or > 45kg: Dose 1 g PO x 1",
          "Presumptive Tx, pre-adolescents ≤45 kg: 20 mg/kg PO x1; For sexual assault victims; part of multi-drug regimen",
          "Presumptive Tx, pre-adolescents >45 kg:1 g PO x1; For sexual assault victims; part of multi-drug regimen"
        ]
      },
      {
        "title": "Mycobacterium Avium Complex Infection (MAC)",
        "content": [
          "<6 years: Safety and efficacy not established",
          "Primary Prophylaxis for ≥6 years: 20 mg/kg PO once weekly; Not to exceed 1200 mg/week or 5mg/kg/day qDay; Not to exceed 250 mg/day",
          "Secondary Prophylaxis for ≥6 years: 5 mg/kg/day PO qDay; Not to exceed 250 mg/day in combination with Ethambutol with or w/o Rifabutin",
          "Treatment: 10-12 mg/kg/day PO; not to exceed 500 mg; used in combination with Ethambutol; if severe disease patient should also receive Rifabutin"
        ]
      },
      {
        "title": "Acute Salmonellosis",
        "content": [
          "Dose: 10 mg/kg PO q24h x3-7 days",
          "Max: 500 mg/day; May extend treatment x 1 week if patient is immunocompromised"
        ]
      },
      {
        "title": "Typhoid Fever, Adjunct Tx",
        "content": [
          "Dose: 10 mg/kg PO q24h x1 week"
        ]
      },
      {
        "title": "Babesiosis, Mild to Moderate",
        "content": [
          "Immunocompetent patients: 10 mg/kg PO x1 on day 1, then 5 mg/kg PO q24h x6-9 days; Max: 500 mg on day 1; 250 mg/day on days 2-10; Use w/ Atovaquone",
          "Immunocompromised patients: 12 mg/kg PO q24h x7-10 days; Max: 600 mg/day; Use w/ Atovaquone"
        ]
      },
      {
        "title": "Chancroid",
        "content": [
          "Preadolescents ≤45 kg: 20 mg/kg PO x1; Max: 1 g/dose",
          "Preadolescents > 45 kg & Adolescents: 1 g PO x1"
        ]
      },
      {
        "title": "Non-gonococcal Urethritis",
        "content": [
          "Adolescents, initial infection: 1 g PO x1",
          "Adolescents, recurrent/persistent infection: 1 g PO x1 w/ metronidazole or tinidazole; Info: for use only if single-dose azithromycin not used for initial infection"
        ]
      },
      {
        "title": "Renal & Hepatic Dosing",
        "content": [
          "Renal Impairment (No adjustment); CrCl <10: Caution Advised; HD/PD: No supplement",
          "Hepatic Impairment - Caution Advised"
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
      "Dosage forms:  TAB: 250 mg, 500 mg, 600 mg; Powder: 1 g per pkt; Suspension: 100 mg per 5 mL, 200 mg per 5 mL; Injectable: various"
    ]
  }
}
