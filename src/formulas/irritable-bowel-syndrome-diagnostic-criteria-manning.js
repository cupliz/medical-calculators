import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { ResultCardHeader } from '../components/Calculator/results/ResultCardHeader'

const getCalculateGroupPoints = calculate => {
  return calculate
    .map(item => parseFloat(item.points))
    .reduce((previousValue, currentValue) => previousValue + currentValue)
}

class FormulaComponent extends Component {
  state = {}

  handleFormulaCalc = (primaryCriteria, additionalCriteria, classes) => {
    // 1 Primary Criteria and 2 Additional Criteria
    if (primaryCriteria >= 1 && additionalCriteria >= 2) {
      return (
        <Typography type='title' className={classes.contentText}>
          Diagnostic with:
        </Typography>
      )
    } else {
      return (
        <Typography type='title' className={classes.contentText}>
          Insufficient with:
        </Typography>
      )
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
          <CardContent className={classes.content}>
            {this.handleFormulaCalc(primaryCriteria, additionalCriteria, classes)}
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
          </CardContent>
        </ResultCardHeader>
      )
    } else {
      return null
    }
  }
}

export default FormulaComponent
