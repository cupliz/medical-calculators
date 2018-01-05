export const config = {
  "id": "pediatric-glasgow-coma-scale",
  "title": "Pediatric Glasgow Coma Scale",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Eye Opening",
      "data": {
        "type": "radio",
        "options":
          "Open spontaneously | Open to verbal stimuli | Open to pain only | No response",
        "points": "4/3/2/1"
      }
    },
    {
      "group": "Verbal Responses",
      "data": {
        "type": "radio",
        "options":
          "Coos and babbles | Irritable cries | Cries in response to pain | Moans in response to pain | No response",
        "points": "5/4/3/2/1"
      }
    },
    {
      "group": "Motor Responses",
      "data": {
        "type": "radio",
        "options":
          "Moves spontaneously/purposefully | Withdraws to touch | Withdraws to pain | Flexor posturing to pain | Extensor posturing to pain | No response",
        "points": "6/5/4/3/2/1"
      }
    }
  ],
  "results": {
    "3 - 8": ["Severe head injury (coma)"],
    "9 - 12": ["Moderate head injury"],
    "13 - 15": ["Minor head injury"]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "For use only in children 2 years and younger. For children >2 years use the adult Glasgow Coma Scale",
      "The pediatric GCS can be used to assess and track a patient's mental status and level of consciousness but should not be used alone in determining management decisions in acute care settings",
      "All patients with pGCS < 15 need appropriate monitoring",
      "For patients with pGCS < 8, consider the need for intubation or definitive airway management. Take into account the entire clinical picture"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "James HE, Neurologic evaluation and support in the child with an acute brain insult. Pediatr Ann. 1986 Jan;15(1):16-22.",
      "Borgialli DA, Mahajan P. et al. Performance of the Pediatric Glasgow Coma Scale Score in the Evaluation of Children With Blunt Head Trauma. Acad Emerg Med. 2016 Aug;23(8):878-84."
    ]
  }
}
