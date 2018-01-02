export { default } from './common/drug-dosage';
export const config = {
  "id": "adrenaline-epinephrine-pediatric-dosing",
  "title": "Adrenaline/Epinephrine Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Adrenaline/Epinephrine",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Anaphylaxis",
        "content": [
          "Indicated in emergency treatment of allergic reactions (Type I) including anaphylaxis",
          "Injectable form (1:1000 solution): 0.01 mg/kg SC/IM x1; May repeat dose q5-15min x2; Max Dose: 0.3 mg/dose in pre-pubertal pts, Max 0.5 mg/dose in teenage pts; if unresponsive to IM, start 0.1 mcg/kg/min IV, titrate to effect up to 10 mcg/min",
          "Auto-Injector (15-30kg): Dose: 0.15 mg SC/IM x1; May repeat dose x1 after 5-15min; may consider 0.3 mg SC/IM x1 if weight >25 kg",
          "Auto-Injector (>30kg): Dose: 0.3 mg SC/IM x1; May repeat dose x1 after 5-15min"
        ]
      },
      {
        "title": "Severe Asthma Exacerbation",
        "content": [
          "Infants/Children: 0.01 mg/kg (1:1000 solution) SC/IM q20min x3 doses prn",
          "Max Dose: 0.5mg/dose"
        ]
      },
      {
        "title": "Neonatal Advanced Life Support (NALS)/Neonatal Resuscitation Program (NRP)",
        "content": [
          "Dose: 0.01-0.03 mg/kg (1:10,000 sol) IV q3-5min prn",
          "Alt: 0.05-0.1 mg/kg (1:10,000 solution) ETT q3-5min prn",
          "IV is preferred to ETT route; Optimal ETT dose unknown; See NALS/NRP: Neonatal Resuscitation table"
        ]
      },
      {
        "title": "PALS: Asystole/Pulseless Arrest (Off-label)",
        "content": [
          "Dose: 0.01 mg/kg (1:10,000 solution) IV/IO q3-5min prn",
          "Alt: 0.1 mg/kg (1:1000 solution) ETT q3-5min prn; Max: 1 mg/dose IV/IO, 2.5 mg/dose ETT",
          "Flush ETT dose w/ 5 mL NS and follow w/ 5 ventilations; IV/IO preferred to ETT route; optimal ETT dose unknown; higher doses may be needed if beta blocker or calcium channel blocker overdose; See PALS: Asystole/PEA table"
        ]
      },
      {
        "title": "PALS: VF/Pulseless VT (Off-label)",
        "content": [
          "Dose: 0.01 mg/kg (1:10,000 solution) IV/IO q3-5min prn",
          "Alt: 0.1 mg/kg (1:1000 solution) ETT q3-5min prn; Max: 1 mg/dose IV/IO, 2.5 mg/dose ETT",
          "Flush ETT dose w/ 5 mL NS and follow w/ 5 ventilations; IV/IO preferred to ETT route; optimal ETT dose unknown; higher doses may be needed if beta blocker or calcium channel blocker overdose; See PALS: VF/Pulseless VT table"
        ]
      },
      {
        "title": "PALS: Bradycardia (Off-label)",
        "content": [
          "Dose: 0.01 mg/kg (1:10,000 solution) IV/IO q3-5min prn",
          "Alt: 0.1 mg/kg (1:1000 solution) ETT q3-5min prn; Max: 1 mg/dose IV/IO, 2.5 mg/dose ETT",
          "Flush ETT dose w/ 5 mL NS and follow w/ 5 ventilations; IV/IO preferred to ETT route; optimal ETT dose unknown; higher doses may be needed if beta blocker or calcium channel blocker overdose; see PALS: Bradycardia table",
          "Neonates (aged <28 days): 0.01-0.03 mg/kg IVP (1:10,000 solution) q3-5min; higher doses not recommended",
          "Neonate IV access not available: 0.05-0.1 mg/kg endotracheal tube (1:10,000 soluiton); lower doses not effective; follow each dose with at least 5 mL isotonic sodium chloride injection"
        ]
      },
      {
        "title": "Post-Resuscitation Stabilization",
        "content": [
          "Dose: 0.1-1 mcg/kg/min IV/IO",
          "Refer to PALS guidelines"
        ]
      },
      {
        "title": "Renal Dosing",
        "content": [
          "No adjustment"
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
      "Autoinjector: 0.1mg/0.1mL (Auvi-Q), 0.15mg/0.15mL, 0.3mg/0.3mL",
      "Injectable solutions: 0.1mg/mL (1:10,000); 1mg/mL (1:1000)"
    ]
  }
}
