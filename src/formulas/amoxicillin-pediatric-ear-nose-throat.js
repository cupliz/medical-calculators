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
  dosage: [
    { value: 1000, unit: 'gm/kg' },
    { value: 0.001, unit: 'mcg/kg' },
    { value: 1, unit: 'mg/kg' }
  ],
  weight: [{ value: 1, unit: 'kg' }, { value: 0.45359237, unit: 'lbs' }],
  medAmount: [
    { value: 1000, unit: 'gm' },
    { value: 0.001, unit: 'mcg' },
    { value: 1, unit: 'mg' }
  ],
  perVolume: [{ value: 1000, unit: 'L' }, { value: 1, unit: 'mL' }],
  dose: [
    { value: 2000, unit: 'gm BID' },
    { value: 1000, unit: 'gm Daily' },
    { value: 4000, unit: 'gm QID' },
    { value: 3000, unit: 'gm TID' },
    { value: 24000, unit: 'gm q1 hr' },
    { value: 12000, unit: 'gm q2 hr' },
    { value: 6000, unit: 'gm q4 hr' },
    { value: 0.002, unit: 'mcg BID' },
    { value: 0.001, unit: 'mcg Daily' },
    { value: 0.004, unit: 'mcg QID' },
    { value: 0.003, unit: 'mcg TID' },
    { value: 0.024, unit: 'mcg q1 hr' },
    { value: 0.012, unit: 'mcg q2 hr' },
    { value: 0.006, unit: 'mcg q4 hr' },
    { value: 2, unit: 'mg BID' },
    { value: 1, unit: 'mg Daily' },
    { value: 4, unit: 'mg QID' },
    { value: 3, unit: 'mg TID' },
    { value: 24, unit: 'mg q1 hr' },
    { value: 12, unit: 'mg q2 hr' },
    { value: 6, unit: 'mg q4 hr' }
  ],
  liquidDose: [
    { value: 2000, unit: 'L BID' },
    { value: 1000, unit: 'L Daily' },
    { value: 4000, unit: 'L QID' },
    { value: 3000, unit: 'L TID' },
    { value: 24000, unit: 'L q1 hr' },
    { value: 12000, unit: 'L q2 hr' },
    { value: 6000, unit: 'L q4 hr' },
    { value: 2, unit: 'mL BID' },
    { value: 1, unit: 'mL Daily' },
    { value: 4, unit: 'mL QID' },
    { value: 3, unit: 'mL TID' },
    { value: 24, unit: 'mL q1 hr' },
    { value: 12, unit: 'mL q2 hr' },
    { value: 6, unit: 'mL q4 hr' }
  ]
}

const filterUnit = (arr, select) =>
  arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
  state = {
    doseSelectUnit: 'mg Daily',
    doseSelectValue: 1,
    liquidDoseSelectUnit: 'mL Daily',
    liquidDoseSelectValue: 1,
    decimal: 0
  }

  handleFormulaCalculation = (
    dosageValue,
    dosageUnitValue,
    weightValue,
    weightUnitValue,
    selectValue
  ) => {
    // Dose = Weight * Dosage
    return (
      dosageValue *
      dosageUnitValue *
      weightValue *
      weightUnitValue *
      selectValue
    ).toFixed(this.state.decimal)
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
      if (oldDecimal === 0) { return }
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
                {this.handleFormulaCalculation(
                  dosageValue,
                  dosageUnitValue,
                  weightValue,
                  weightUnitValue,
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
                {this.handleFormulaCalculation(
                  medAmountValue,
                  medAmountUnitValue,
                  perVolumeValue,
                  perVolumeUnitValue,
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
