export const config = {
  "id": "mods-score-multiple-organ-dysfunction",
  "title": "MODS Score: Multiple Organ Dysfunction",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "paO2/FiO2 Ratio",
      "data": {
        "type": "radio",
        "options": "300-1000 | 226-299 | 151-225 | 76-150 | 0-75",
        "points": "0/1/2/3/4"
      }
    },
    {
      "group": "Platelet Count (10^3/mm^3)",
      "data": {
        "type": "radio",
        "options": ">120 | 81-120 | 51-80 | 21-50 | ≤20",
        "points": "0/1/2/3/4"
      }
    },
    {
      "group": "Serum Billirubin",
      "data": {
        "type": "radio",
        "options":
          "≤1.2mg/dL or 20µmol/L | 1.3-3.5mg/dL or 21-60µmol/L | 3.6-7.0mg/dL or 6-120µmol/L | 7.0-14mg/dL or 121-240µmol/L | >14mg/dL or 240µmol/L ",
        "points": "0/1/2/3/4"
      }
    },
    {
      "group": "Pressure adjusted heart rate (HR x CVP/MAP)",
      "data": {
        "type": "radio",
        "options": "0-10 | 10.1-15 | 15.1-20 | 20.1-30 | >30",
        "points": "0/1/2/3/4"
      }
    },
    {
      "group": "Glasgow Coma Scale",
      "data": {
        "type": "radio",
        "options": "15 | 13-14 | 10-12 | 7-9 | ≤6",
        "points": "0/1/2/3/4"
      }
    },
    {
      "group": "Serum Creatinine",
      "data": {
        "type": "radio",
        "options":
          "≤1.1mg/dL or 100µmol/L | 1.2-2.2mg/dL or 101-200µmol/L | 2.3-3.9mg/dL or 201-350µmol/L | 4.0-5.7mg/dL or 351-500µmol/L | >5.7mg/dL or 500µmol/L",
        "points": "0/1/2/3/4"
      }
    }
  ],
  "results": {
    "0": ["ICU Mortality 0%, Hospital Mortality 0%, ICU Stay 2 days"],
    "1 - 4": ["ICU Mortality 1-2%, Hospital Mortality 7%, ICU Stay 3 days"],
    "5 - 8": [
      "ICU Mortality 3-5%, Hospital Mortality 16%, ICU Stay 6 days"
    ],
    "9 - 12": [
      "ICU Mortality 25%, Hospital Mortality 50%, ICU Stay 10 days"
    ],
    "13 - 16": [
      "ICU Mortality 50%, Hospital Mortality 70%, ICU Stay 17 days"
    ],
    "17 - 20": [
      "ICU Mortality 75%, Hospital Mortality 82%, ICU Stay 21 days"
    ],
    "21 - 24": ["ICU Mortality 100%, Hospital Mortality 100%"]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "MODS Score is used to determine ICU and hospital mortality and average ICU stay for patients with multiple organ failure",
      "Ratio between partial pressure of Oxygen and Fraction of inspired Oxyygen is measured directly for patients undergoing mechanical ventilation and is estimated for non-ventilated patients",
      "A simplified version of the MODS Score can be found in the modified Marshall score which uses the diagnosis capacity for organ failure to assess the severity of acute pancreatitis"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Marshall JC, Cook DJ, Christou NV, et. al. Multiple organ dysfunction score: a reliable descriptor of a complex clinical outcome. Crit Care Med. 1995 Oct;23(10):1638-52. Review.",
      "Nawaz H, Mounzer R, Yadav D, Yabes JG, Slivka A, Whitcomb DC, Papachristou GI. (2013) Revised Atlanta and determinant-based classification: application in a prospective cohort of acute pancreatitis patients. Am J Gastroenterol; 108(12):1911-7.",
      "Jacobs S, Zuleika M, Mphansa T. (1999) The Multiple Organ Dysfunction Score as a descriptor of patient outcome in septic shock compared with two other scoring systems. Crit Care Med; 27(4):741-4."
    ]
  }
}
