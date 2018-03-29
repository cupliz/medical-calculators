export const config = {
    "id": "canadian-ct-head-injury-trauma-rule",
    "title": "Canadian CT Head Injury/Trauma Rule",
    "type": "points",
    "points": 0,
    "questions": [
        {
            "group": "GCS <15 at 2 hr post injury",
            "data": {
                "type": "radio",
                "options": "Yes | No",
                "points": "1/0"
            }
        },
        {
            "group": "Suspected open/depressed skull fracture",
            "data": {
                "type": "radio",
                "options": "Yes | No",
                "points": "1/0"
            }
        },
        {
            "group": "Any sign of basilar skull fracture? (e.g. Hemotympanum, Battle's Sign, Raccoon eyes, CSF oto-/rhinorrhea)",
            "data": {
                "type": "radio",
                "options":
                    "Yes | No",
                "points": "1/0"
            }
        },
        {
            "group": "≥ 2 episodes of vomiting",
            "data": {
                "type": "radio",
                "options": "Yes | No",
                "points": "1/0"
            }
        },
        {
            "group": "Age ≥ 65",
            "data": {
                "type": "radio",
                "options": "Yes | No",
                "points": "1/0"
            }
        },
        {
            "group": "Retrograde amnesia to the event ≥ 30 min ",
            "data": {
                "type": "radio",
                "options": "Yes | No",
                "points": "1/0"
            }
        },
        {
            "group": "Dangerous mechanism? (e.g. Pedestrian struck by motor vehicle, Occupant ejected from motor vehicle, or fall from > 3 ft or > 5 stairs)",
            "data": {
                "type": "radio",
                "options": "Yes | No",
                "points": "1/0"
            }
        }
    ],
    "results": {
        "0": [
            "CT Unecessary: Canadian Head CT Rule suggests a head CT is not necessary for this patient (sensitivity 83-100% for all intracranial traumatic findings, sensitivity 100% for findings requiring neurosurgical intervention)."
        ],
        "1 - 7": [
            "Consider CT: Canadian Head CT Rule suggests a head CT is necessary for this patient as they are at “medium” risk to rule out an intracranial traumatic finding (sensitivity 83-100%)."
        ]
    },
    "notes": {
        "type": "unordered-list",
        "content": [
            "The Canadian CT Head Rules have been validated in multiple settings and have consistently demonstrated that they are 100% sensitive for detecting injuries that will require neurosurgery",
            "Consider obtaining a CT scan if there are any questions in the rule that are answered affirmatively",
            "The Canadian Head CT Rule can only be applied to patients with LOC/Amnesia or changes in mental status",
            "The original study did not include any patients younger than 16 years of age",
            "Always discuss post-concussive symptoms and management with the patient, especially if discharging them without a head CT. Otherwise when they feel post-concussive symptoms they may worry a CT was necessary",
            "Educating patients on the symptoms of injuries that require neurosurgical intervention vs. post-concussive symptoms can help patients feel empowered and reassured."
        ]
    },
    "references": {
        "type": "ordered-list",
        "content": [
            "Stiell IG, Wells GA et. al The Canadian CT Head Rule for patients with minor head injury. Lancet. 2001 May 5;357(9266):1391-6."
        ]
    }
}
