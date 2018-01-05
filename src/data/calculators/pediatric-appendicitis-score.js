export const config = {
  "id": "pediatric-appendicitis-score",
  "title": "Pediatric Appendicitis Score",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "RLQ tenderness to cough, percussion or hopping",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Anorexia",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Nausea or vomiting",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Fever ≥38°C or 100.4°F",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Tenderness over right iliac fossa",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/2"
      }
    },
    {
      "group": "Leukocytosis WBC >10,000",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Migration of pain to Right Lower Quadrant",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Left shift Absolute Neutrophil Count >7500",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    }
  ],
  "results": {
    "0 - 3": ["Appendicitis is unlikely. Consider other diagnoses"],
    "4 - 6": [
      "Cannot definitively rule in or rule out appendicitis. Consider ultrasound or MRI imaging and/or surgical consult"
    ],
    "6 - 10": [
      "Appendicitis is likely. Consider surgical consult and imaging; Patients should only undergo ultrasound prior to surgical consult"
    ]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "PAS Score can be used to estimate risk of appendicitis in children",
      "For patients who are not at low risk, next steps include NPO status, IV fluids, analgesia and imaging or surgical consult",
      "Patients in low risk group according to the PAS do not have a zero risk. Use clinical judgement if imaging or surgical consult may aid in diagnosis"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Samuel M. Pediatric Appendicitis Score. Journal of Pediatric Surgery, Vol 37; No6(June), 2002:pp 877-881",
      "Goldman RD. The Paediatric Appendicitis Score (PAS) was useful in children with acute abdominal pain. Evid Based Med 2009; 14:26"
    ]
  }
}
