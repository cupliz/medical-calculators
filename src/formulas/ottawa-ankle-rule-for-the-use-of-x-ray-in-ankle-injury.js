import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { ResultCardHeader } from '../components/Calculator/body/calculate/results/ResultCardHeader'

const getCalculateGroupPoints = calculate => {
  return calculate
    .map(item => parseFloat(item.points))
    .reduce((previousValue, currentValue) => previousValue + currentValue)
}

class FormulaComponent extends Component {
  state = {}

  handleFormulaCalc = (
    majorCriteria,
    minorCriteria,
    classes
  ) => {
    // X-Ray Indicated : 1 Required Criteria and 1 Major Criteria
    if (
      (majorCriteria >= 2 && minorCriteria >= 0) ||
      (majorCriteria >= 1 && minorCriteria >= 3) ||
      (majorCriteria >= 0 && minorCriteria >= 5)
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
          <CardContent className={classes.content}>
            {this.handleFormulaCalc(
              majorCriteria,
              minorCriteria,
              classes
            )}
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
