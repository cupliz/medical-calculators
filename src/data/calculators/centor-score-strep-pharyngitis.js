export const config = {
  "id": "centor-score-strep-pharyngitis",
  "title": "Centor Score for Strep Pharyngitis (Modified McIsaac)",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "Age range",
      "data": {
        "type": "radio",
        "options": "3-14 yrs | 15-44 yrs | ≥45yrs",
        "points": "1/0/-1"
      }
    },
    {
      "group": "Exudate or swelling on tonsils",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Tender/Swollen anterior cervical lymph nodes",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Temp >38ºC (100.4ºF)",
      "data": {
        "type": "radio",
        "options": "No | Yes",
        "points": "0/1"
      }
    },
    {
      "group": "Cough",
      "data": {
        "type": "radio",
        "options": "Present | Absent",
        "points": "0/1"
      }
    }
  ],
  "results": {
    "-1 - 0": [
      "1%-2.5% likelihood of Strep Pharyngitis; No further testing nor antibiotics"
    ],
    "1": [
      "5%-10% likelihood of Strep Pharyngitis; No further testing nor antibiotics"
    ],
    "2": [
      "11%-17% likelihood of Strep Pharyngitis; Optional rapid strep testing and/or culture"
    ],
    "3": [
      "28%-35% likelihood of Strep Pharyngitis; Consider rapid strep testing and/or culture. IDSA and ASIM no longer recommend empiric treatment for strep based on symptoms alone"
    ],
    "4 - 5": [
      "51%-53% likelihood of Strep Pharyngitis; Consider rapid strep testing and/or culture. IDSA and ASIM no longer recommend empiric treatment for strep based on symptoms alone"
    ]
  },
  "notes": {
    "type": "unordered-list",
    "content": [
      "Centor Score estimates the probability that pharyngitis is streptococcal to help determine which patients to test first",
      "Use this only in patients with recent onset (≤3days) of acute pharyngitis",
      "Most pharyngitis is viral and does not respond to antibiotic treatment",
      "Steroids and NSAIDs can improve symptoms; antibiotics are often indicated in streptococcal pharyngitis but do not prevent the suppurative complications of it like peritonsillar abscess"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Centor RM, Witherspoon JM, Dalton HP, Brody CE, Link K. The diagnosis of strep throat in adults in the emergency room. Med Decis Making. 1981;1(3):239-46.",
      "McIsaac WJ, White D, Tannenbaum D, Low DE. A clinical score to reduce unnecessary antibiotic use in patients with sore throat. CMAJ. 1998 Jan 13;158(1):75-83."
    ]
  }
}
