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
  o2: [
    { value: 1, unit: 'mL/min' },
    { value: 0.01666666667, unit: 'mL/hr' },
    { value: 60000, unit: 'L/sec' },
    { value: 1000, unit: 'L/min' },
    { value: 60, unit: 'mL/sec' }
  ],
  hgb: [
    { value: 1, unit: 'mL/min' },
    { value: 0.01666666667, unit: 'mL/hr' },
    { value: 60000, unit: 'L/sec' },
    { value: 1000, unit: 'L/min' },
    { value: 60, unit: 'mL/sec' }
  ]
}

const filterUnit = (arr, select) =>
  arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
  state = {
    total24SelectUnit: 'mL',
    total24SelectValue: 1,
    rate8SelectUnit: 'mL/hr',
    rate8SelectValue: 1,
    rate16SelectUnit: 'mL/hr',
    rate16SelectValue: 1,
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
    // Total Crystalloid For First 24 Hours = 4 * Weight * Percent Non-superficial Burn Area
    // Rate First 8 Hours =  Total Crystalloid / 16
    // Rate Next 16 Hours =  Total Crystalloid / 32
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

  handleTotalSelectChange = event => {
    const { value } = event.target
    let selectValue = filterUnit(unitData.total24, value)
    this.setState({ total24SelectUnit: value, total24SelectValue: selectValue })
  }

  handleRate8SelectChange = event => {
    const { value } = event.target
    let selectValue = filterUnit(unitData.rate8, value)
    this.setState({ rate8SelectUnit: value, rate8SelectValue: selectValue })
  }

  handleRate16SelectChange = event => {
    const { value } = event.target
    let selectValue = filterUnit(unitData.rate16, value)
    this.setState({ rate16SelectUnit: value, rate16SelectValue: selectValue })
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
    let percentValue = null
    let percentUnitValue = null

    questions.map((question, index) => {
      const { calculate } = question
      if (calculate) {
        const { input, select } = calculate
        if (index === 0) {
          weightValue = input
          weightUnitValue = filterUnit(unitData.weight, select)
        }
        if (index === 1) {
          percentValue = input
          percentUnitValue = filterUnit(unitData.percent, select)
        }
      }
      return calculate
    })

    if (weightValue && percentValue) {
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
                onChange={this.handleTotalSelectChange}
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
            <Typography type='caption' className={classes.contentText}>
              Rate First 16 Hours
            </Typography>
            <div className={classes.resultWrapper}>
              <Typography type='title' className={classes.resultText}>
                {this.handleFormulaCalc(
                  'rate16',
                  weightValue * weightUnitValue,
                  percentValue * percentUnitValue,
                  this.state.total24SelectValue,
                  this.state.rate8SelectValue,
                  this.state.rate16SelectValue
                )}
              </Typography>
              <TextField
                select
                value={this.state.rate16SelectUnit}
                onChange={this.handleRate16SelectChange}
                SelectProps={{ classes: { root: this.props.classes.select } }}
                margin='normal'
              >
                {unitData.rate16.map(option => (
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
