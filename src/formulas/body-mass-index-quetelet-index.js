import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { ResultCardHeader } from '../components/Calculator/body/calculate/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import RemoveIcon from 'material-ui-icons/Remove'

const unitData = {
  height: [
    { value: 0.393700787401575, unit: 'cm' },
    { value: 1, unit: 'in' },
    { value: 39.3700787401575, unit: 'm' }
  ],
  weight: [{ value: 2.20462262184878, unit: 'kg' }, { value: 1, unit: 'lb' }]
}

const filterUnit = (arr, select) =>
  arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
  state = {
    decimal: 2
  }

  handleCalc = (height, weight) => {
    // BMI = (Weight/2.205) / (Height/39.37)^2
    const bmi = (weight / 2.205) / Math.pow((height / 39.37), 2)
    // BMI >= 25 and < 30:	Overweight
    // BMI >= 30 and < 35:	Class I Obesity
    // BMI >= 35 and < 40:	Class II Obesity
    // BMI >= 40:	Class III Obesity
    let label = ''
    if (bmi < 18.5) { label = 'Below normal weight' }
    else if (bmi >= 18.5 && bmi < 25) { label = 'Normal weight' }
    return bmi.toFixed(this.state.decimal)
  }

  handleDecimalChange = action => {
    const oldDecimal = this.state.decimal
    if (action === '+') {
      this.setState({ decimal: oldDecimal + 1 })
    } else {
      if (oldDecimal === 0) {
        return
      }
      this.setState({ decimal: oldDecimal - 1 })
    }
  }

  render () {
    const { classes, data } = this.props
    const { questions } = data

    // extract needed field vars
    let heightValue = null
    let heightUnitValue = null
    let weightValue = null
    let weightUnitValue = null

    questions.map((question, index) => {
      const { calculate } = question
      if (calculate) {
        const { input, select } = calculate
        if (index === 0) {
          heightValue = input
          heightUnitValue = filterUnit(unitData.height, select)
        }
        if (index === 1) {
          weightValue = input
          weightUnitValue = filterUnit(unitData.weight, select)
        }
      }
      return calculate
    })

    if (heightValue && weightValue) {
      return (
        <ResultCardHeader classes={classes}>
          <CardContent className={classes.content}>
            <Typography type='caption' className={classes.contentText}>
              BMI
            </Typography>
            <div className={classes.resultWrapper}>
              <Typography type='title' className={classes.resultText}>
                {this.handleCalc(
                  heightValue * heightUnitValue,
                  weightValue * weightUnitValue
                )}
              </Typography>
            </div>
            <div className={classes.decimalPrecisionWrapper}>
              <Typography type='title' className={classes.decimalPrecision}>
                Decimal Precision
              </Typography>
              <div className={classes.decimalButtonsWrapper}>
                <Button
                  fab
                  color='primary'
                  aria-label='add'
                  className={classes.decimalButton}
                  onClick={() => this.handleDecimalChange('-')}
                >
                  <RemoveIcon />
                </Button>
                <Typography type='title' className={classes.decimalPoint}>
                  {this.state.decimal}
                </Typography>
                <Button
                  fab
                  color='primary'
                  aria-label='add'
                  className={classes.decimalButton}
                  onClick={() => this.handleDecimalChange('+')}
                >
                  <AddIcon />
                </Button>
              </div>
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
