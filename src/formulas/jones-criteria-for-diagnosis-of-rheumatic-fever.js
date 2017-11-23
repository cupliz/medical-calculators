import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { ResultCardHeader } from '../components/Calculator/body/calculate/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import RemoveIcon from 'material-ui-icons/Remove'

const getCalculateGroupPoints = calculate => {
  return calculate
    .map(item => parseFloat(item.points))
    .reduce((previousValue, currentValue) => previousValue + currentValue)
}

class FormulaComponent extends Component {
  state = {}

  render () {
    const { classes, data } = this.props
    const { questions } = data

    // extract needed field vars
    let requiredCriteria = null
    let majorCriteria = null
    let minorCriteria = null

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
            <Typography type='title' className={classes.contentText}>
              Insufficient with:
            </Typography>
            <div className={classes.resultWrapper}>
              <Typography type='title' className={classes.resultText}>
                {requiredCriteria} Required Criteria
              </Typography>
            </div>
            <div className={classes.resultWrapper}>
              <Typography type='title' className={classes.resultText}>
                {majorCriteria} Major Criteria
              </Typography>
            </div>
            <div className={classes.resultWrapper}>
              <Typography type='title' className={classes.resultText}>
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
