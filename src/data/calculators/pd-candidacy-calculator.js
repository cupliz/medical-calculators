import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import { ResultCardFormulaValueFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'


class FormulaComponent extends Component {

    handleCalc = (
      answers
    ) => {
        let results = []
        let resultsQ2to13 = 0
        let j = 0 

        for (var i = 1; i < answers.length-1; i++){
          resultsQ2to13 += answers[i] 
        }

        if(answers[0] === 1){
          results[j] = 'This patient has an absolute contraindication to independent home peritoneal dialysis.'
        } else if (answers[13] === 0) {
          results[j] = 'The patient does not appear to be appropriate for independent home peritoneal dialysis, based on your answer to question 14, which looks for features which would encourage home peritoneal dialysis.'
        } else if (answers[13] === 1 && resultsQ2to13 === 0) {
          results[j] = 'This patient could be strongly encouraged to pursue home peritoneal dialysis if they chose this option after appropriate education.'
        } else {
            results[j] = 'This patient could be encouraged to pursue home peritoneal dialysis, but consider the following feedback based on your responses:'
            j++

            if (answers[1] === 1) {
              results[j] = '- A history of simple abdominal surgeries (e.g. appendectomy, hernia repair, kidney transplant) does not represent a contraindication to peritoneal dialysis.'
              j++
            }
            if (answers[2] === 1) {
              results[j] = '- Having pets is not a contra-indication to PD but one must bar pets from the room during the PD connection.'
              j++
            }
            if (answers[3] === 1) {
              results[j] = '- If there is a risk of hernia development or recurrence, PD can be performed but consider using low daytime volume or dry days on a cycler.'
              j++
            }
            if (answers[4] === 1) {
              results[j] = '- If the patient is blind, has no use of one hand or has neuropathy in both hands,  PD can be performed but plan to train with assist device(s) as needed.'
              j++
            }
            if (answers[5] === 1) {
              results[j] = '- If the patient is frail or can\'t walk/stand, PD can still be considered but first need to assess lifting, offer PT, offer CAPD, and/or use 3L instead of larger bags for cycler.'
              j++
            }
            if (answers[6] === 1) {
              results[j] = '- If the patient is illiterate, PD can still be considered but use consider using pictures to train, return demonstrations to verify learning, and/or use a recording device for patient reports.'
              j++
            }
            if (answers[7] === 1) {
              results[j] = '- If the patient is hearing impaired, PD can be performed.  If using a cycler,  consider the use lights or vibration for alarms.'
              j++
            }
            if (answers[8] === 1) {
              results[j] = '- If the patient has hygiene issues, PD can be considered after providing hygiene education and assessing the results.'
              j++
            }
            if (answers[9] === 1) {
              results[j] = '- In an anuric patient with BSA > 2m², PD adequacy would need to be assessed.  Think about assessing for home hemodialysis suitability.'
              j++
            }
            if (answers[10] === 1) {
              results[j] = '- In a patient with limited supply space, PD is not contraindicated but consider a home visit in advance and twice monthly deliveries of supplies.'
              j++
            }
            if (answers[11] === 1) {
              results[j] = '- In a patient with large polycystic kidneys or back pain, PD is not contraindicated but consider using low daytime volume or dry days on cycler.'
              j++
            }
            if (answers[12] === 1) {
              results[j] = '- In a patient with obesity or a colostomy, consider a presternal PD catheter if available in your center and no other contraindications such as multiple or complex abdominal surgeries.'
              j++
            }
          }

        return results;
        }

    render () {
        const { classes, data } = this.props
        const { questions } = data

        // extract needed field vars
        let answers = []

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                if (index === 0) {
                    answers[index] = calculate["points"]
                }
                if (index === 1) {
                    answers[index] = calculate["points"]
                }
                if (index === 2) {
                    answers[index] = calculate["points"]
                }
                if (index === 3) {
                    answers[index] = calculate["points"]
                }
                if (index === 4) {
                    answers[index] = calculate["points"]
                }
                if (index === 5) {
                    answers[index] = calculate["points"]
                }
                if (index === 6) {
                    answers[index] = calculate["points"]
                }
                if (index === 7) {
                    answers[index] = calculate["points"]
                }
                if (index === 8) {
                    answers[index] = calculate["points"]
                }
                if (index === 9) {
                    answers[index] = calculate["points"]
                }
                if (index === 10) {
                    answers[index] = calculate["points"]
                }
                if (index === 11) {
                    answers[index] = calculate["points"]
                }
                if (index === 12) {
                    answers[index] = calculate["points"]
                }
                if (index === 13) {
                    answers[index] = calculate["points"]
                }
                
            }
            return calculate
        })

        if (answers.length === 14) {
            const results = this.handleCalc(
                answers
            );
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption=""
                        values={[results[0]]}
                    />
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption=""
                        values={results}
                    />
                </ResultCardHeader>
            )
        } else {
            return null
        }
    }
}
export default FormulaComponent

export const config = {
  "id": "pd-candidacy-calculator",
  "title": "PD Candidacy (MATCH-D)",
  "type": "formula",
  "points": 0,
  "questions": [
    {
      "group": "Does the patient have any of the following characteristics which are contra-indications to independent home peritoneal dialysis?",
      "data": {
        "type": "radio",
        "options": "Homeless and no supply storage available  | Can't maintain personal hygiene even after education | Home is unclean/health hazard; patient/family won't correct | No/unreliable electricity for CCPD and; unable to do CAPD | Multiple or complex abdominal surgeries; negative physician evaluation | Brain damage, dementia, or poor short-term memory | Reduced awareness/ability to report body symptoms | Malnutrition after PD trial leads to peritonitis | Uncontrolled anxiety/psychosis | None of the above ",
        "points": "1/1/1/1/1/1/1/1/1/0"
      }
    },
    {
      "group": "Does the patient have a history of simple abdominal surgery such as appendectomy, hernia repair, or kidney transplant?",
      "data": {
        "type": "radio",
        "options": "Yes | No",
        "points": "1/0"
      }
    },
    {
      "group": "Does the patient have a pet?",
      "data": {
        "type": "radio",
        "options": "Yes | No",
        "points": "1/0"
      }
    },
    {
      "group": "Is there a risk of hernia development or recurrence after mesh repair?",
      "data": {
        "type": "radio",
        "options": "Yes | No",
        "points": "1/0"
      }
    },
    {
      "group": "Is the patient blind, have no use of one hand, or neuropathy in both hands?",
      "data": {
        "type": "radio",
        "options": "Yes | No",
        "points": "1/0"
      }
    },
    {
      "group": "Is the patient frail or can't walk/stand?",
      "data": {
        "type": "radio",
        "options": "Yes | No",
        "points": "1/0"
      }
    },
    {
      "group": "Is the patient illiterate?",
      "data": {
        "type": "radio",
        "options": "Yes | No",
        "points": "1/0"
      }
    },
    {
      "group": "Is the patient hearing impaired?",
      "data": {
        "type": "radio",
        "options": "Yes | No",
        "points": "1/0"
      }
    },
    {
      "group": "Does the patient have hygiene issues?",
      "data": {
        "type": "radio",
        "options": "Yes | No",
        "points": "1/0"
      }
    },
    {
      "group": "Is the patient anuric with BSA >2m²?",
      "data": {
        "type": "radio",
        "options": "Yes | No",
        "points": "1/0"
      }
    },
    {
      "group": "Does the patient have limited supply space?",
      "data": {
        "type": "radio",
        "options": "Yes | No",
        "points": "1/0"
      }
    },
    {
      "group": "Does the patient have large polycystic kidneys or back pain?",
      "data": {
        "type": "radio",
        "options": "Yes | No",
        "points": "1/0"
      }
    },
    {
      "group": "Does the patient have obesity or a colostomy?",
      "data": {
        "type": "radio",
        "options": "Yes | No",
        "points": "1/0"
      }
    },
    {
      "group": "Does the patient have any of the following features?",
      "data": {
        "type": "radio",
        "options": "Wants to do PD or has no barriers to it | Employed full- or part-time | Student - grade school to grad school | Caregiver for a child, elder, or person with disability | New to dialysis or has had transplant rejection | Lives far from clinic and/or has unreliable transportation | Student - grade school to grad school | Needs/wants to travel for work or enjoyment | Has needle fear or no remaining HD access sites | BP not controlled with drugs | Can't or won't limit fluids or follow in-center HD diet | No (required) partner for HHD | Wants control; unhappy in-center | None of the above ",
        "points": "1/1/1/1/1/1/1/1/1/1/1/1/1/0"
      }
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "The MATCH-D tool (Copyright © 2009) was developed by the Medical Education Institute, Inc., for Home Dialysis Central, and can be found online at http://homedialysis.org/match-d."
    ]
  }
}
