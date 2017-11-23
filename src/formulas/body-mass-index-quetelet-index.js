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
  weight: [
    { value: 2.20462262184878, unit: 'kg' },
    { value: 1, unit: 'lb' }
  ],
  daysUrineVolume: [
    { value: 1000, unit: 'L' },
    { value: 1e-12, unit: 'fL' },
    { value: 1, unit: 'mL' }
  ],
  creatClear: [
    { value: 1000, unit: 'L/min' },
    { value: 60000, unit: 'L/sec' },
    { value: 0.01666666667, unit: 'mL/hr' },
    { value: 1, unit: 'mL/min' },
    { value: 60, unit: 'mL/sec' }
  ]
}

const filterUnit = (arr, select) =>
  arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
  state = {
    creatClearSelectUnit: 'mL/min',
    creatClearSelectValue: 1,
    decimal: 2
  }

  handleCalc = (
    urine,
    serum,
    days,
    selectValue
  ) => {
    // CreatClear = UrineCreat * DaysUrineVolume / SerumCreat / 1440
    const creatClear = urine * days / serum / 1440
    return (creatClear / selectValue).toFixed(this.state.decimal)
  }

  handleSelectChange = event => {
    const { value } = event.target
    let selectValue = filterUnit(unitData.creatClear, value)
    this.setState({ creatClearSelectUnit: value, creatClearSelectValue: selectValue })
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
    let urineValue = null
    let urineUnitValue = null
    let serumValue = null
    let serumUnitValue = null
    let daysValue = null
    let daysUnitValue = null

    questions.map((question, index) => {
      const { calculate } = question
      if (calculate) {
        const { input, select } = calculate
        if (index === 0) {
          urineValue = input
          urineUnitValue = filterUnit(unitData.urine, select)
        }
        if (index === 1) {
          serumValue = input
          serumUnitValue = filterUnit(unitData.serum, select)
        }
        if (index === 2) {
          daysValue = input
          daysUnitValue = filterUnit(unitData.daysUrineVolume, select)
        }
      }
      return calculate
    })

    if (urineValue && serumValue && daysValue) {
      return (
        <ResultCardHeader classes={classes}>
          <CardContent className={classes.content}>
            <Typography type='caption' className={classes.contentText}>
              Creat Clear
            </Typography>
            <div className={classes.resultWrapper}>
              <Typography type='title' className={classes.resultText}>
                {this.handleCalc(
                  urineValue * urineUnitValue,
                  serumValue * serumUnitValue,
                  daysValue * daysUnitValue,
                  this.state.creatClearSelectValue
                )}
              </Typography>
              <TextField
                select
                value={this.state.creatClearSelectUnit}
                onChange={this.handleSelectChange}
                SelectProps={{ classes: { root: this.props.classes.select } }}
                margin='normal'
              >
                {unitData.creatClear.map(option => (
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
