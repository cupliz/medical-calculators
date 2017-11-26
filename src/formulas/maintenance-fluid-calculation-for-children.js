import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { ResultCardHeader } from '../components/Calculator/body/calculate/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Decimal from '../components/Decimal/Decimal'

const unitData = {
  weight: [{ value: 1, unit: 'kg' }, { value: 0.45359237, unit: 'lb' }],
  fluidRate: [
    { value: 1, unit: 'mL/hr' },
    { value: 1000, unit: 'L/hr' },
    { value: 60, unit: 'mL/min' }
  ]
}

const filterUnit = (arr, select) =>
  arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
  state = {
    fluidRateSelectUnit: 'mL/hr',
    fluidRateSelectValue: 1,
    decimal: 2
  }

  handleFormulaCalc = (type, weight, fluidRateSelectValue) => {
    // Fluid Rate = Daily Volume/24
    // For infants 3.5 — 10kg the daily fluid requirement is 100mL/kg
    // For children between 11—20 kg the daily fluid requirement is 1,000 mL + 50mL/kg for every kg over 10
    // For children between >20 kg the daily fluid requirement is 1,500 mL + 20mL/kg for every kg over 20, up to a maximum of 2,400mL daily
    // This calculation does not apply to newborn infants (i.e. from 0 to 28 days after full term delivery)
    let dailyVolume = 0
    if (weight <= 10) {
      dailyVolume = weight * 100
    } else if (weight > 10 && weight <= 20) {
      dailyVolume = 1000 + 50 * (weight - 10)
    } else if (weight > 20) {
      dailyVolume = 1500 + 20 * (weight - 20)
      if (dailyVolume >= 2400) {
        dailyVolume = 2400
      }
    }
    if (type === 'daily volume') {
      return dailyVolume.toFixed(this.state.decimal)
    } else if (type === 'fluid rate') {
      const fluidRate = dailyVolume / 24
      return (fluidRate / fluidRateSelectValue).toFixed(this.state.decimal)
    }
  }

  handleFluidRateSelectChange = event => {
    const { value } = event.target
    let selectValue = filterUnit(unitData.fluidRate, value)
    this.setState({
      fluidRateSelectUnit: value,
      fluidRateSelectValue: selectValue
    })
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
    let weightValue = null
    let weightUnitValue = null

    questions.map((question, index) => {
      const { calculate } = question
      if (calculate) {
        const { input, select } = calculate
        if (index === 0) {
          weightValue = input
          weightUnitValue = filterUnit(unitData.weight, select)
        }
      }
      return calculate
    })

    if (weightValue) {
      return (
        <ResultCardHeader classes={classes}>
          <CardContent className={classes.content}>
            <Typography type='caption' className={classes.contentText}>
              Daily Volume
            </Typography>
            <div className={classes.resultWrapper}>
              <Typography type='title' className={classes.resultText}>
                {this.handleFormulaCalc(
                  'daily volume',
                  weightValue * weightUnitValue
                )}
              </Typography>
            </div>
            <Typography type='caption' className={classes.contentText}>
              Fluid Rate
            </Typography>
            <div className={classes.resultWrapper}>
              <Typography type='title' className={classes.resultText}>
                {this.handleFormulaCalc(
                  'fluid rate',
                  weightValue * weightUnitValue,
                  this.state.fluidRateSelectValue
                )}
              </Typography>
              <TextField
                select
                value={this.state.fluidRateSelectUnit}
                onChange={this.handleFluidRateSelectChange}
                SelectProps={{ classes: { root: this.props.classes.select } }}
                margin='normal'
              >
                {unitData.fluidRate.map(option => (
                  <MenuItem key={option.unit} value={option.unit}>
                    {option.unit}
                  </MenuItem>
                ))}
              </TextField>
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
