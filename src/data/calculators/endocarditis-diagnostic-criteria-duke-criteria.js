import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import { ResultCardFormulaValueFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const getCalculateGroupPoints = calculate => {
  return calculate
    .map(item => parseFloat(item.points))
    .reduce((previousValue, currentValue) => previousValue + currentValue)
}

class FormulaComponent extends Component {
  state = {}

  handleFormulaCalc = (
    majorCriteria,
    minorCriteria
  ) => {
    // Diagnostic : 2 Major Criteria and 0 Minor Criteria
    // Diagnostic : 1 Major Criteria and 3 Minor Criteria
    // Diagnostic : 0 Major Criteria and 5 Minor Criteria
    if (
      (majorCriteria >= 2 && minorCriteria >= 0) ||
      (majorCriteria >= 1 && minorCriteria >= 3) ||
      (majorCriteria >= 0 && minorCriteria >= 5)
    ) {
      return 'Diagnostic with'
    } else {
      return 'Insufficient with'
    }
  }

  render () {
    const { classes, data } = this.props
    const { questions } = data

    // extract needed field vars
    let majorCriteria = 0
    let minorCriteria = 0

    questions.map((question, index) => {
      const { calculate } = question
      if (calculate) {
        if (index === 0) {
          majorCriteria = getCalculateGroupPoints(calculate)
        }
        if (index === 1) {
          minorCriteria = getCalculateGroupPoints(calculate)
        }
      }
      return calculate
    })

    if (majorCriteria || minorCriteria) {
      return (
        <ResultCardHeader classes={classes}>
          <ResultCardFormulaValueFragment
            classes={classes}
            caption={this.handleFormulaCalc(
              majorCriteria,
              minorCriteria
            )}
            values={[`${majorCriteria} Major Criteria`, `${minorCriteria} Minor Criteria`]}
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
  "id": "endocarditis-diagnostic-criteria-duke-criteria",
  "title": "Endocarditis Diagnostic Criteria - Duke Criteria",
  "type": "formula",
  "questions": [
    {
      "group": "Major Diagnostic Criteria",
      "showPoints": false,
      "data": [
        {
          "type": "checkbox",
          "label":
            "Positive blood culture for typical Infective Endocarditis organisms (strep viridins or bovis, HACEK, staph aureous without other primary site, enterococcus), from 2 separate blood cultures or 2 positive cultures from samples drawn > 12 hours apart, or 3 or a majority of 4 separate cultures of blood (first and last sample drawn 1 hour apart)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Echocardiogram with oscillating intracardiac mass on valve or supporting structures, in the path of regurgitant jets, or on implanted material in the absence of an alternative anatomic explanation, or abscess, or new partial dehiscence of prosthetic valve or new valvular regurgitation",
          "points": "1"
        }
      ]
    },
    {
      "group": "Minor Diagnostic Criteria",
      "showPoints": false,
      "data": [
        {
          "type": "checkbox",
          "label": "Predisposing heart condition or intravenous drug use",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Temp > 38.0° C (100.4° F)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Vascular phenomena: arterial emboli, pulmonary infarcts, mycotic aneurysms, intracranial bleed, conjunctival hemorrhages, Janeway lesions",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Immunologic phenomena: glomerulonephritis, Osler nodes, Roth spots, rheumatoid factor",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Microbiological evidence: positive blood culture but does not meet a major criterion as noted above or serological evidence of active infection with organism consistent with endocarditis (excluding coag neg staph, and other common contaminants)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Echocardiographic findings: consistent with endocarditis but do not meet a major criterion as noted above",
          "points": "1"
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "Diagnostic : 2 Major Criteria and 0 Minor Criteria",
      "Diagnostic : 1 Major Criteria and 3 Minor Criteria",
      "Diagnostic : 0 Major Criteria and 5 Minor Criteria"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Durack DT, Lukes AS, Bright DK. New criteria for diagnosis of infective endocarditis: utilization of specific echocardiographic findings. Duke Endocarditis Service. American Journal of Medicine. 96(3):200-9, 1994.",
      "Lukes AS, Bright DK, Durack DT. Diagnosis of infective endocarditis. Infect Dis Clin North Am. 1993 Mar;7(1):1-8. Review."
    ]
  }
}
