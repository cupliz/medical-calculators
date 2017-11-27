import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { ResultCardHeader } from '../components/Calculator/results/ResultCardHeader'
import Decimal from '../components/Decimal/Decimal'

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
    const bmi = weight / 2.205 / Math.pow(height / 39.37, 2)
    let label = ''
    if (bmi < 18.5) {
      label = 'Below normal weight'
    } else if (bmi >= 18.5 && bmi < 25) {
      label = 'Normal weight'
    } else if (bmi >= 25 && bmi < 30) {
      label = 'Overweight'
    } else if (bmi >= 30 && bmi < 35) {
      label = 'Class I Obesity'
    } else if (bmi >= 35 && bmi < 40) {
      label = 'Class II Obesity'
    } else if (bmi >= 40) {
      label = 'Class III Obesity'
    }
    return `${bmi.toFixed(this.state.decimal)} kg/m^2 - ${label}`
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
            <Decimal
              classes={classes}
              decimal={this.state.decimal}
              onDecimalChange={this.handleDecimalChange}
            />
          </CardContent>
        </ResultCardHeader>
      )
    } else {
      return null
    }
  }
}
export default FormulaComponent
