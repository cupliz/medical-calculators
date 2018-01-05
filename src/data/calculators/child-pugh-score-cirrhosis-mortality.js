export const config = {
  "id": "child-pugh-score-cirrhosis-mortality",
  "title": "Child-Pugh Score for Cirrhosis Mortality",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Bilirubin",
      "data": {
        "type": "radio",
        "options":
          "<2mg/dL (<34.2µmol/L) | 2-3mg/dL (34.2-51.3µmol/L) | >3mg/dL (>51.3µmol/L)",
        "points": "1/2/3"
      }
    },
    {
      "group": "Albumin",
      "data": {
        "type": "radio",
        "options":
          ">3.5g/dL (>35g/L) | 2.8-3.5g/dL (28-35 g/L) | <2.8 g/dL (<28g/L) ",
        "points": "1/2/3"
      }
    },
    {
      "group": "INR",
      "data": {
        "type": "radio",
        "options": "<1.7 | 1.7-2.2 | >2.2 ",
        "points": "1/2/3"
      }
    },
    {
      "group": "Ascites",
      "data": {
        "type": "radio",
        "options": "Absent | Slight | Moderate",
        "points": "1/2/3"
      }
    },
    {
      "group": "Encephalopathy",
      "data": {
        "type": "radio",
        "options": "No Encephalopathy | Grade 1-2 | Grade 3-4",
        "points": "1/2/3"
      }
    }
  ],
  "results": {
    "5 - 6": [
      "Child Class A; Life expectancy: 15-20 years; Abdominal surgery peri-operative mortality: 10%"
    ],
    "7 - 9": [
      "Child Class B; Indication for transplant evaluation; Abdominal surgery peri-operative mortality: 30%"
    ],
    "10 - 15": [
      "Child Class C; Life expectancy: 1-3 years; Abdominal surgery peri-operative mortality: 82%"
    ]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "The Child-Pugh Score is used to estimate the severity of cirrhosis",
      "Consider comparing patients with unexpectedly high or low Child scores with another score like the MELD score."
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Child CG, Turcotte JG. Surgery and portal hypertension. In: The liver and portal hypertension. Edited by CG Child. Philadelphia: Saunders 1964:50-64."
    ]
  }
}
