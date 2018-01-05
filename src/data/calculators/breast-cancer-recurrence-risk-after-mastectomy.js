export const config = {
  "id": "breast-cancer-recurrence-risk-after-mastectomy",
  "title": "Breast Cancer Recurrence Risk After Mastectomy",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Grade of tumor",
      "data": {
        "type": "radio",
        "options": "I | II | III",
        "points": "6/12/18"
      }
    },
    {
      "group": "Lymph nodes",
      "data": {
        "type": "radio",
        "options": "Negative | Positive",
        "points": "6/12"
      }
    },
    {
      "group": "Lymphatic or Vascular Invasion",
      "data": {
        "type": "radio",
        "options": "No | Present",
        "points": "4/8"
      }
    }
  ],
  "results": {
    "16": ["Recurrence risk of 8.5%"],
    "20": ["Recurrence risk of 12.5%"],
    "22": ["Recurrence risk of 15.8%"],
    "26": ["Recurrence risk of 10%"],
    "28": ["Recurrence risk of 15.5%"],
    "32": ["Recurrence risk of 33%"],
    "34": ["Recurrence risk of 38.5%"],
    "38": ["Recurrence risk of 48%"]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "In this study, 23% of all patients developed a local recurrence of breast cancer"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "O'Rourke S, Galea MH, Morgan D, et. al. Local recurrence after simple mastectomy. Br J Surg. 1994 Mar;81(3):386-389."
    ]
  }
}
