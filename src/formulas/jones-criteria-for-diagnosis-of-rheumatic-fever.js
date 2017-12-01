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

  handleFormulaCalc = (
    requiredCriteria,
    majorCriteria,
    minorCriteria,
    classes
  ) => {
    // Diagnostic : 1 Required Criteria and 2 Major Criteria and 0 Minor Criteria
    // Diagnostic : 1 Required Criteria and 1 Major Criteria and 2 Minor Criteria
    if (
      (requiredCriteria >= 1 && majorCriteria >= 2) ||
      (requiredCriteria >= 1 && majorCriteria >= 1 && minorCriteria >= 2)
    ) {
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
          <CardContent className={classes.content}>
            {this.handleFormulaCalc(
              requiredCriteria,
              majorCriteria,
              minorCriteria,
              classes
            )}
            <div className={classes.resultWrapper}>
              <Typography type='title' className={classes.resultTextNoBold}>
                {requiredCriteria} Required Criteria
              </Typography>
            </div>
            <div className={classes.resultWrapper}>
              <Typography type='title' className={classes.resultTextNoBold}>
                {majorCriteria} Major Criteria
              </Typography>
            </div>
            <div className={classes.resultWrapper}>
              <Typography type='title' className={classes.resultTextNoBold}>
                {minorCriteria} Minor Criteria
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
