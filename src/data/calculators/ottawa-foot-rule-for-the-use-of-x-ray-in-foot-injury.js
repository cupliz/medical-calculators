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

  handleFormulaCalc = (requiredCriteria, majorCriteria) => {
    // X-Ray Indicated : 1 Required Criteria and 1 Major Criteria
    if (requiredCriteria >= 1 && majorCriteria >= 1) {
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

    questions.map((question, index) => {
      const { calculate } = question
      if (calculate) {
        if (index === 0) {
          requiredCriteria = getCalculateGroupPoints(calculate)
        }
        if (index === 1) {
          majorCriteria = getCalculateGroupPoints(calculate)
        }
      }
      return calculate
    })

    if (requiredCriteria || majorCriteria) {
      return (
        <ResultCardHeader classes={classes}>
          <ResultCardFormulaValueFragment
            classes={classes}
            caption={this.handleFormulaCalc(requiredCriteria, majorCriteria)}
            values={[`${requiredCriteria} Required Criteria`, `${majorCriteria} Major Criteria`]}
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
  "id": "ottawa-foot-rule-for-the-use-of-x-ray-in-foot-injury",
  "title": "Ottawa Foot Rule for the Use of X-Ray in Foot Injury",
  "type": "formula",
  "questions": [
    {
      "group": "Required Criteria",
      "showPoints": false,
      "data": [
        {
          "type": "checkbox",
          "label": "Pain in the midfoot",
          "points": "1"
        }
      ]
    },
    {
      "group": "Major Criteria",
      "showPoints": false,
      "data": [
        {
          "type": "checkbox",
          "label":
            "Inability to bear weight right after the injury as well as in the emergency department (4 steps)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Bone tenderness at the navicular or the base of the fifth metatarsal",
          "points": "1"
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "X-Ray Indicated : 1 Required Criteria and 1 Major Criteria"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Stiell IG, McKnight RD, Greenberg GH, et. al. Implementation of the Ottawa ankle rules. JAMA. 1994 Mar 16;271(11):827-832.",
      "Stiell IG, Greenberg GH, McKnight RD, et.al. Decision rules for the use of radiography in acute ankle injuries. Refinement and prospective validation. . JAMA. 1993 Mar 3;269(9):1127-32.",
      "Stiell IG, Greenberg GH, McKnight RD, et. al. A study to develop clinical decision rules for the use of radiography in acute ankle injuries. Ann Emerg Med. 1992 Apr;21(4):384-90."
    ]
  }
}
