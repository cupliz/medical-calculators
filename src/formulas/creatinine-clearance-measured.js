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
  urineCreat: [
    { value: 0.0113122171945701, unit: 'mcmol/L' },
    { value: 1, unit: 'mg%' },
    { value: 1, unit: 'mg/dL' }
  ],
  serumCreat: [
    { value: 0.0113122171945701, unit: 'mcmol/L' },
    { value: 1, unit: 'mg%' },
    { value: 1, unit: 'mg/dL' }
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

  handleDoseSelectChange = event => {
    const { value } = event.target
    let selectValue = filterUnit(unitData.dose, value)
    this.setState({ doseSelectUnit: value, doseSelectValue: selectValue })
  }

  handleLiquidDoseSelectChange = event => {
    const { value } = event.target
    let selectValue = filterUnit(unitData.liquidDose, value)
    this.setState({
      liquidDoseSelectUnit: value,
      liquidDoseSelectValue: selectValue
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
    let dosageValue = null
    let dosageUnitValue = null
    let weightValue = null
    let weightUnitValue = null
    let medAmountValue = null
    let medAmountUnitValue = null
    let perVolumeValue = null
    let perVolumeUnitValue = null

    questions.map((question, index) => {
      const { calculate } = question
      if (calculate) {
        const { input, select } = calculate
        if (index === 0) {
          dosageValue = input
          dosageUnitValue = filterUnit(unitData.dosage, select)
        }
        if (index === 1) {
          weightValue = input
          weightUnitValue = filterUnit(unitData.weight, select)
        }
        if (index === 2) {
          medAmountValue = input
          medAmountUnitValue = filterUnit(unitData.medAmount, select)
        }
        if (index === 3) {
          perVolumeValue = input
          perVolumeUnitValue = filterUnit(unitData.perVolume, select)
        }
      }
      return calculate
    })

    if (dosageValue && weightValue) {
      return (
        <ResultCardHeader classes={classes}>
          <CardContent className={classes.content}>
            <Typography type='caption' className={classes.contentText}>
              Dose
            </Typography>
            <div className={classes.resultWrapper}>
              <Typography type='title' className={classes.resultText}>
                {this.handleCalc(
                  'dose',
                  dosageValue * dosageUnitValue,
                  weightValue * weightUnitValue,
                  this.state.doseSelectValue
                )}
              </Typography>
              <TextField
                select
                value={this.state.doseSelectUnit}
                onChange={this.handleDoseSelectChange}
                SelectProps={{ classes: { root: this.props.classes.select } }}
                margin='normal'
              >
                {unitData.dose.map(option => (
                  <MenuItem key={option.unit} value={option.unit}>
                    {option.unit}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className={classes.resultWrapper}>
              <Typography type='title' className={classes.resultText}>
                {this.handleCalc(
                  'liquidDose',
                  dosageValue * dosageUnitValue,
                  weightValue * weightUnitValue,
                  this.state.doseSelectValue,
                  medAmountValue * medAmountUnitValue,
                  perVolumeValue * perVolumeUnitValue,
                  this.state.liquidDoseSelectValue
                )}
              </Typography>
              <TextField
                select
                value={this.state.liquidDoseSelectUnit}
                onChange={this.handleLiquidDoseSelectChange}
                SelectProps={{ classes: { root: this.props.classes.select } }}
                margin='normal'
              >
                {unitData.liquidDose.map(option => (
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
