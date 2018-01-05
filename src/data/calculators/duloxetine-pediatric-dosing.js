export { default } from './common/drug-dosage';
export const config = {
  "id": "duloxetine-pediatric-dosing",
  "title": "Duloxetine Pediatric Dosing",
  "type": "formula",
  "info": {
    "drugName": "Duloxetine",
    "drugIndication": "Multiple Indications | Pediatric",
    "drugDosageInformation": [
      {
        "title": "Major Depressive Disorder",
        "content": [
          "7-17 years: 40-60 mg/day PO initially (in single daily dose or divided q12hr for 1 week if patient needs to adjust to therapy)",
          "Titrate dose in increments of 30 mg/day over 1 week as tolerated",
          "Target dosage: 60 mg/day PO (in single daily dose or divided q12hr)",
          "Do not open capsule; taper dose gradually to D/C"
        ]
      },
      {
        "title": "Generalized Anxiety Disorder",
        "content": [
          "7-17 years: 60 mg/day PO initially (in single daily dose or divided q12hr); may be increased in increments of 30 mg/day if tolerability is concern",
          "Target dosage: 60 mg/day PO",
          "Max Dose: 120 mg/day",
          "Do not open capsule; taper dose gradually to D/C"
        ]
      },
      {
        "title": "Diabetic Peripheral Neuropathic Pain",
        "content": [
          "60 mg/day PO initially (in single daily dose or divided q12hr); consider lowering dosage if tolerability is concern",
          "Target dosage: 60 mg/day PO",
          "Max Dose: 60 mg/day",
          "Do not open capsule; taper dose gradually to D/C"
        ]
      },
      {
        "title": "Fibromyalgia",
        "content": [
          "30 mg/day PO initially for 1 week to allow for therapy adjustment",
          "Target dosage: 60 mg/day PO",
          "Max Dose: 60 mg/day",
          "No additional benefit shown by doses > 60 mig in clinical trials"
        ]
      },
      {
        "title": "Chronic Musculoskeletal Pain",
        "content": [
          "Treatment of chronic musculoskeletal pain, including discomfort from osteoarthritis and chronic lower back pain",
          "30 mg/day PO initially for 1 week to allow for therapy adjustment",
          "Target dosage: 60 mg/day PO; Max Dose: 60 mg/day"
        ]
      },
      {
        "title": "Renal Dosing",
        "content": [
          "Severe renal impairment, CrCl < 30: Avoid use",
          "Use not recommended in ESRD patients"
        ]
      },
      {
        "title": "Hepatic Dosing",
        "content": [
          "Avoid use in patients with hepatic impairment/cirrhosis due to risk of hepatic injury"
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
      "Dosage forms: Delayed-release Capsules: 20mg, 30mg, 40mg, 60mg",
      "Dosing Considerations:",
      "Dosages ≥60 mg/day have not been shown to offer additional benefits",
      "Major depressive disorder and generalized anxiety disorder: Acute episodes often necessitate several months of sustained therapy",
      "Diabetic peripheral neuropathic pain: Efficacy for >12 weeks has not been studied; if diabetes is complicated by renal disease, consider lower starting dosage with gradual increase to effective dosage",
      "Fibromyalgia: Efficacy for ≥12 weeks has not been studied; continue treatment on basis of individual patient response",
      "Chronic musculoskeletal pain: Efficacy for ≥13 weeks has not been studied",
      "Uncontrolled narrow-angle glaucoma: Use not recommended due to increased risk of mydriasis",
      "Administration: Because of enteric coating, must be swallowed whole; do not chew, crush, or open capsule and sprinkle contents in food or liquid; Can be taken without regard to meals",
      "Discontinuance:",
      "Gradually reduce dosage",
      "Abrupt discontinuance may result in symptoms (eg, dizziness, nausea, headache, paresthesia, fatigue, vomiting, irritability, insomnia, diarrhea, anxiety, hyperhidrosis)",
      "Wait ≥14 days after discontinuance of monoamine oxidase inhibitor (MAOI) therapy to initiate duloxetine therapy; wait ≥5 days after discontinuance of duloxetine therapy to initiate MAOI therapy"
    ]
  }
}
