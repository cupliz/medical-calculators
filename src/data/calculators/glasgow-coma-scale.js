export const config = {
  "id": "glasgow-coma-scale",
  "title": "Glasgow Coma Scale",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Eye opening",
      "data": {
        "type": "radio",
        "options": "Spontaneous | To sound | To pressure | No eye opening",
        "points": "4/3/2/1"
      }
    },
    {
      "group": "Best motor response",
      "data": {
        "type": "radio",
        "options":
          "Obeys verbal commands | Localizes pain | Normal flexion from pain | Abnormal flexion from pain | Extension to pain | No motor response",
        "points": "6/5/4/3/2/1"
      }
    },
    {
      "group": "Best Verbal Response",
      "data": {
        "type": "radio",
        "options":
          "Oriented | Confused | Inappropriate words | Only moans or groans | No verbal response",
        "points": "5/4/3/4/2/1"
      }
    }
  ],
  "results": {
    "3 - 14": ["Abnormal"],
    "15": ["Normal"]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "Glasgow Coma Scale (GCS) estimates the coma severity based on Eye, Verbal and Motor criteria.",
      "The GCS can be indicative of how critically ill a patient is. Trauma patients presenting with a GCS < 15 points require close attention and re-assessment",
      "The GCS is the standard used in the pre-hospital and acute care setting to evaluate for mental status assessment in both traumatic and non-traumatic presentations."
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Teasdale G, Jennett B. Assessment of coma and impaired conciousness: a practical scale. Lancet. 1974; Jul 13;2:81-84.",
      "Teasdale G, Knill-Jones R, van der Sande J. Observer variability in assessing impaired consciousness and coma. J Neurol Neurosurg Psychiatry 1978;41:603-10.",
      "The Glasgow Structured Approach to Assessment of the Glasgow Coma Scale www.glasgowcomascale.org"
    ]
  }
}
