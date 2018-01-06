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

  handleFormulaCalc = (majorCriteria, minorCriteria) => {
    // Diagnostic : 1 Major Criteria and 1 Minor Criteria
    //
    // Diagnostic : 0 Major Criteria and 3 Minor Criteria
    if (
      (majorCriteria >= 1 && minorCriteria >= 1) ||
      (majorCriteria >= 0 && minorCriteria >= 3)
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
            caption={this.handleFormulaCalc(majorCriteria, minorCriteria)}
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
  "id": "multiple-myeloma-diagnostic-criteria",
  "title": "Multiple Myeloma Diagnostic Criteria",
  "type": "formula",
  "questions": [
    {
      "group": "Major Criteria",
      "showPoints": false,
      "data": [
        {
          "type": "checkbox",
          "label": "Plasmacytoma on tissue biopsy",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Bone marrow plasmacytosis of > 30%",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Monoclonal Protein (M Protein): IgG > 3.5 g/L; IgA > 2.0 g/L",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Urinary kappa or lambda chain excretion of > 1g per 24 hours in the absence of amyloidosis",
          "points": "1"
        }
      ]
    },
    {
      "group": "Minor Criteria",
      "showPoints": false,
      "data": [
        {
          "type": "checkbox",
          "label": "Marrow plasmacytosis of 10-30%",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Evidence of M protein but in lesser amounts than above (i.e. IgG < 3.5 g/L; IgA < 2.0 g/L)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Lytic bone lesions",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Hypoglobulinemia of normal proteins: IgM < 500 mg/L, IgA < 1 g/L or IgG < 6g/L",
          "points": "1"
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "Diagnostic: 1 Major Criteria and 1 Minor Criteria",
      "Diagnostic: 0 Major Criteria and 3 Minor Criteria"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Durie BG, Salmon SE. A clinical staging system for multiple myeloma. Cancer. 1975; 36:842-854."
    ]
  }
}
