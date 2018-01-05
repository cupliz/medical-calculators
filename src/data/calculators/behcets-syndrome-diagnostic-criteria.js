import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import { ResultCardFormulaValueFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const getCalculateGroupPoints = calculate => {
  return calculate
    .map(item => parseFloat(item.points))
    .reduce((previousValue, currentValue) => previousValue + currentValue)
}

class FormulaComponent extends Component {
  state = {}

  handleFormulaCalc = (requiredCriteria, minorCriteria) => {
    // 1 Required Criteria and 2 Minor Criteria
    if (requiredCriteria >= 1 && minorCriteria >= 2) {
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
    let minorCriteria = 0

    questions.map((question, index) => {
      const { calculate } = question
      if (calculate) {
        if (index === 0) {
          requiredCriteria = getCalculateGroupPoints(calculate)
        }
        if (index === 1) {
          minorCriteria = getCalculateGroupPoints(calculate)
        }
      }
      return calculate
    })

    if (requiredCriteria || minorCriteria) {
      return (
        <ResultCardHeader classes={classes}>
          <ResultCardFormulaValueFragment
            classes={classes}
            caption={this.handleFormulaCalc(requiredCriteria, minorCriteria)}
            values={[`${requiredCriteria} Required Criteria`, `${minorCriteria} Minor Criteria`]}
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
  "id": "behcets-syndrome-diagnostic-criteria",
  "title": "Bechet's Syndrome Diagnostic Criteria",
  "type": "formula",
  "questions": [
    {
      "group": "Required Criteria",
      "showPoints": false,
      "data": [
        {
          "type": "checkbox",
          "label":
            "Recurrent oral ulcerations: minor aphthous, major aphtous or herpetiform ulceration observed by physician or patient, which recurred at least 3 times in one 12 month period",
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
          "label":
            "Eye lesion: anterior uveitis, posterior uveitis, or cells in vitreous on slit lamp examination or retinal vasculitis observed by ophthalmologist",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Recurrent genital ulceration: aphthous ulceration or scarring observed by physician or patient",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Skin lesions: erythema nodosum observed by physician or patient, pseudofolliculitis or papulopustular lesions, or acneform nodules observed by physician in post-adolescent patients not on corticosteroid treatment",
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
            "Positive pathergy test (Behcetine test) read by physician 24-48 hours",
          "points": "1"
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": ["Diagnostic : 1 Required Criteria and 2 Minor Criteria"]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "International Study Group for Behcet's Disease. Criteria for diagnosis of Behcet's disease. Lancet. 1990 May 5;335(8697):1078-80."
        ]
      }
    }
