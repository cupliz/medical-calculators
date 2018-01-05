export const config = {
  "id": "san-francisco-syncope-rule",
  "title": "San Francisco Syncope Rule",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "History of Congestive Heart Failure",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Hematocrit <30%",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Abnormal ECG (Non-sinus rhythm or ECG changed)",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Shortness of Breath",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Systolic BP <90 mmHg at triage",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    }
  ],
  "results": {
    "0": ["Patient is in low-risk group for serious outcome"],
    "1 - 5": [
      "Patient is not in the low-risk group for serious outcome (96% sensitivity, 62% specificity); Negative predictive value 99.2%, Positive predictive value 24.8%"
    ]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "Use the SF Syncope Rule to stratify the risk of patients with unexplained syncope",
      "Serious outcome in this study is defined as death, myocardial infarction, arrhythmia, pulmonary embolism, stroke, subarachnoid hemorrhage, significant hemorrahge or any condition causing a return Emergency Department visit and hospitalization for a related event"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Quinn J, McDermott D, Stiell I, Kohn M, Wells G. Prospective validation of the San Francisco Syncope Rule to predict patients with serious outcomes. Ann Emerg Med. 2006 May;47(5):448-54.",
      "Birnbaum A, Esses D, Bijur P, Wollowitz A, Gallagher EJ. Failure to validate the San Francisco Syncope Rule in an independent emergency department population. Ann Emerg Med. 2008 Aug;52(2):151-9."
    ]
  }
}
