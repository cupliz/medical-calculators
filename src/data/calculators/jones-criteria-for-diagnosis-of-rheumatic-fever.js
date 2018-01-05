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
    requiredCriteria,
    majorCriteria,
    minorCriteria
  ) => {
    // Diagnostic : 1 Required Criteria and 2 Major Criteria and 0 Minor Criteria
    // Diagnostic : 1 Required Criteria and 1 Major Criteria and 2 Minor Criteria
    if (
      (requiredCriteria >= 1 && majorCriteria >= 2) ||
      (requiredCriteria >= 1 && majorCriteria >= 1 && minorCriteria >= 2)
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
    let requiredCriteria = 0
    let majorCriteria = 0
    let minorCriteria = 0

    questions.map((question, index) => {
      const { calculate } = question
      if (calculate) {
        if (index === 0) {
          requiredCriteria = getCalculateGroupPoints(calculate)
        }
        if (index === 1) {
          majorCriteria = getCalculateGroupPoints(calculate)
        }
        if (index === 2) {
          minorCriteria = getCalculateGroupPoints(calculate)
        }
      }
      return calculate
    })

    if (requiredCriteria || majorCriteria || minorCriteria) {
      return (
        <ResultCardHeader classes={classes}>
          <ResultCardFormulaValueFragment
            classes={classes}
            caption={this.handleFormulaCalc(
              requiredCriteria,
              majorCriteria,
              minorCriteria
            )}
            values={[`${requiredCriteria} Required Criteria`, `${majorCriteria} Major Criteria`, `${minorCriteria} Minor Criteria`]}
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
  "id": "jones-criteria-for-diagnosis-of-rheumatic-fever",
  "title": "Jones Criteria for Diagnosis of Rheumatic Fever",
  "type": "formula",
  "questions": [
    {
      "group": "Required Criteria",
      "showPoints": false,
      "data": [
        {
          "type": "checkbox",
          "label":
            "Evidence of antecedent Strep infection: ASO / Strep antibodies / Strep group A throat culture / Recent scarlet fever / anti-deoxyribonuclease B / anti-hyaluronidase",
          "points": "1"
        }
      ]
    },
    {
      "group": "Major Diagnostic Criteria",
      "showPoints": false,
      "data": [
        {
          "type": "checkbox",
          "label": "Carditis",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Polyarthritis",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Chorea",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Erythema marginatum",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Subcutaneous Nodules",
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
          "label": "Fever",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Arthralgia",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Previous rheumatic fever or rheumatic heart disease",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Acute phase reactions: ESR / CRP / Leukocytosis",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Prolonged PR interval",
          "points": "1"
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "Diagnostic: 1 Required Criteria and 2 Major Criteria and 0 Minor Criteria",
      "Diagnostic: 1 Required Criteria and 1 Major Criteria and 2 Minor Criteria"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Special Writing Group of the Committee on Rheumatic Fever, Endocarditis, and Kawasaki Disease of the Council on Cardiovascular Disease in the Young of the American Heart Association. Guidelines for the diagnosis of rheumatic fever. Jones Criteria, 1992 update. JAMA. 1992 Oct 21;268(15):2069-73. Erratum in: JAMA 1993 Jan 27;269(4):476."
    ]
  }
}
