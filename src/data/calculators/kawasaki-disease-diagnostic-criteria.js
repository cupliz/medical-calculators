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

  handleFormulaCalc = (requiredCriteria, additionalCriteria) => {
    // 1 Required Criteria and 4 Additional Criteria
    if (requiredCriteria >= 1 && additionalCriteria >= 4) {
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
    let additionalCriteria = 0

    questions.map((question, index) => {
      const { calculate } = question
      if (calculate) {
        if (index === 0) {
          requiredCriteria = getCalculateGroupPoints(calculate)
        }
        if (index === 1) {
          additionalCriteria = getCalculateGroupPoints(calculate)
        }
      }
      return calculate
    })

    if (requiredCriteria || additionalCriteria) {
      return (
        <ResultCardHeader classes={classes}>
          <ResultCardFormulaValueFragment
            classes={classes}
            caption={this.handleFormulaCalc(requiredCriteria, additionalCriteria)}
            values={[`${requiredCriteria} Required Criteria`, `${additionalCriteria} Additional Criteria`]}
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
  "id": "kawasaki-disease-diagnostic-criteria",
  "title": "Kawasaki Disease Diagnostic Criteria",
  "type": "formula",
  "questions": [
    {
      "group": "Required Criteria",
      "showPoints": false,
      "data": [
        {
          "type": "checkbox",
          "label":
            "Fever for at least five days generally high and spiking (often to 40° C or more), persisting for one to two weeks or longer in untreated patients.",
          "points": "1"
        }
      ]
    },
    {
      "group": "Additional Criteria",
      "showPoints": false,
      "data": [
        {
          "type": "checkbox",
          "label":
            "Acute changes in arms or legs: redness, swelling and erythema of the palms and soles.",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Polymorphic exanthem involving the trunk and extremities.",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Painless, nonexudative bilateral bulbar conjunctival injection",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Changes in lips and oral cavity. Strawberry tongue, redness and cracking of the lips, and erythema of the oropharyngeal mucosa. No mouth ulcers.",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Cervical lymphadenopathy: often unilateral, slightly tender, firm nodes >1.5cm in diameter.",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Exclusion of other diseases with similar findings",
          "points": "1"
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "Diagnostic : 1 Required Criteria and 4 Additional Criteria"
    ]
  },
  "notes:": {
    "type": "unordered-list",
    "content": [
      "Use to diagnose pediatric patients with several days of unexplained fever associated with any of the principal clinical features of Kawasaki Disease",
      "If the diagnosis of Kawasaki Disease is made in the acute phase, prompt treatment is essential with intravenous immunoglobulin (IVIG) and aspirin to prevent CA abnormalities",
      "Treatment should be initiated within the first 10 days of the disease and if possible within 7 days of the disease"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Dajani AS, Taubert KA, Gerber MA, Shulman ST, Ferrieri P, Freed M, et al. Diagnosis and therapy of Kawasaki disease in children. Circulation. 1993;87:1776-80.",
      "Newburger JW, Takahashi M, Gerber MA, et al. Diagnosis, treatment, and long-term management of Kawasaki disease: a statement for health professionals from the Committee on Rheumatic Fever, Endocarditis and Kawasaki Disease, Council on Cardiovascular Disease in the Young, American Heart Association. Circulation. 2004 Oct 26;110(17):2747-71."
    ]
  }
}
