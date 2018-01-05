import React, { Component } from 'react'
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

  handleFormulaCalc = (primaryCriteria, additionalCriteria) => {
    // 1 Primary Criteria and 2 Additional Criteria
    if (primaryCriteria >= 1 && additionalCriteria >= 2) {
      return 'Diagnostic with'
    } else {
      return 'Insufficient with'
    }
  }

  render () {
    const { classes, data } = this.props
    const { questions } = data

    // extract needed field vars
    let primaryCriteria = 0
    let additionalCriteria = 0

    questions.map((question, index) => {
      const { calculate } = question
      if (calculate) {
        if (index === 0) {
          primaryCriteria = getCalculateGroupPoints(calculate)
        }
        if (index === 1) {
          additionalCriteria = getCalculateGroupPoints(calculate)
        }
      }
      return calculate
    })

    if (primaryCriteria || additionalCriteria) {
      return (
        <ResultCardHeader classes={classes}>
          <ResultCardFormulaValueFragment
            classes={classes}
            caption={this.handleFormulaCalc(primaryCriteria, additionalCriteria)}
            values={[`${primaryCriteria} Primary Criteria`, `${additionalCriteria} Additional Criteria`]}
          />
            {this.handleFormulaCalc(primaryCriteria, additionalCriteria)}
            <div className={classes.resultWrapper}>
              <Typography type='title' className={classes.resultTextNoBold}>
                {primaryCriteria} Primary Criteria
              </Typography>
            </div>
            <div className={classes.resultWrapper}>
              <Typography type='title' className={classes.resultTextNoBold}>
                {additionalCriteria} Additional Criteria
              </Typography>
            </div>
        </ResultCardHeader>
      )
    } else {
      return null
    }
  }
}

export default FormulaComponent

export const config = {
  "id": "irritable-bowel-syndrome-diagnostic-criteria-manning",
  "title":
    "Irritable Bowel Syndrome Diagnostic Criteria (Manning Criteria)",
  "type": "formula",
  "questions": [
    {
      "group": "Required Criteria",
      "showPoints": false,
      "data": [
        {
          "type": "checkbox",
          "label":
            "Persistence or recurrence of the following symptoms for at least 3 months time: Abdominal pain / discomfort, relieved with BM or associated with a change in the frequency or consistency of stool",
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
            "A varying or irregular pattern of defecation at least 25% of the time with 2 or more of the following:",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Altered Bowel Movement frequency",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Altered Bowel Movement form (hard, loose or watery stool)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label":
            "Altered stool passage (straining, urgency, or incomplete evacuation sensation)",
          "points": "1"
        },
        {
          "type": "checkbox",
          "label": "Diarrhea with mucus >25% of the time",
          "points": "1"
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "Diagnostic : 1 Required Criteria and 2 Additional Criteria"
    ]
  },
  "notes:": {
    "type": "unordered-list",
    "content": [
      "Manning Criteria determines the likelihood of irritable bowel syndrome diagnosis",
      "IBS is a rule-out diagnosis which means that all other possibilities must be ruled out first",
      "If red flag signs are present, IBS is not likely. These include: patient's age >50 years, weight loss, blood in stools, anemia and fever"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Drossman DA, Funch-Jensen P, Janssens J, et al. Identification of subgroups of functional bowel disorders. Gastroenterol International. 1990;3:15."
    ]
  }
}
