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

  handleFormulaCalc = (
    type,
    weight,
    percent,
    total24SelectValue,
    rate8SelectValue,
    rate16SelectValue
  ) => {
    // Fluid Rate = Daily Volume/24
    // For infants 3.5 — 10kg the daily fluid requirement is 100mL/kg
    // For children between 11—20 kg the daily fluid requirement is 1,000 mL + 50mL/kg for every kg over 10
    // For children between >20 kg the daily fluid requirement is 1,500 mL + 20mL/kg for every kg over 20, up to a maximum of 2,400mL daily
    // This calculation does not apply to newborn infants (i.e. from 0 to 28 days after full term delivery)
    const totalCrystalloid = 4 * weight * percent
    if (type === 'total24') {
      return (totalCrystalloid / total24SelectValue).toFixed(this.state.decimal)
    } else if (type === 'rate8') {
      const rate8 = totalCrystalloid / 16
      return (rate8 / rate8SelectValue).toFixed(this.state.decimal)
    } else if (type === 'rate16') {
      const rate16 = totalCrystalloid / 32
      return (rate16 / rate16SelectValue).toFixed(this.state.decimal)
    }
  }

  handleFluidRateSelectChange = event => {
    const { value } = event.target
    let selectValue = filterUnit(unitData.fluidRate, value)
    this.setState({ fluidRateSelectUnit: value, fluidRateSelectValue: selectValue })
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
              Total Crystalloid For First 24 Hours
            </Typography>
            <div className={classes.resultWrapper}>
              <Typography type='title' className={classes.resultText}>
                {this.handleFormulaCalc(
                  'total24',
                  weightValue * weightUnitValue,
                  percentValue * percentUnitValue,
                  this.state.total24SelectValue
                )}
              </Typography>
              <TextField
                select
                value={this.state.total24SelectUnit}
                onChange={this.handleFluidRateSelectChange}
                SelectProps={{ classes: { root: this.props.classes.select } }}
                margin='normal'
              >
                {unitData.total24.map(option => (
                  <MenuItem key={option.unit} value={option.unit}>
                    {option.unit}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <Typography type='caption' className={classes.contentText}>
              Rate First 8 Hours
            </Typography>
            <div className={classes.resultWrapper}>
              <Typography type='title' className={classes.resultText}>
                {this.handleFormulaCalc(
                  'rate8',
                  weightValue * weightUnitValue,
                  percentValue * percentUnitValue,
                  this.state.total24SelectValue,
                  this.state.rate8SelectValue
                )}
              </Typography>
              <TextField
                select
                value={this.state.rate8SelectUnit}
                onChange={this.handleRate8SelectChange}
                SelectProps={{ classes: { root: this.props.classes.select } }}
                margin='normal'
              >
                {unitData.rate8.map(option => (
                  <MenuItem key={option.unit} value={option.unit}>
                    {option.unit}
                  </MenuItem>
                ))}
              </TextField>
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
