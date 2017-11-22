import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { ResultCardHeader } from '../components/Calculator/body/calculate/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import RemoveIcon from 'material-ui-icons/Remove'

const data = {
  dosageUnitData: [
    { value: 1000, unit: 'gm/kg' },
    { value: 0.001, unit: 'mcg/kg' },
    { value: 1, unit: 'mg/kg' }
  ],
  weightUnitData: [
    { value: 1, unit: 'kg' },
    { value: 0.45359237, unit: 'lbs' }
  ],
  medAmountUnitData: [
    { value: 1000, unit: 'gm' },
    { value: 0.001, unit: 'mcg' },
    { value: 1, unit: 'mg' }
  ],
  perVolumeUnitData: [{ value: 1000, unit: 'L' }, { value: 1, unit: 'mL' }],
  doseUnitData: [
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
  liquidDoseUnitData: [
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

class FormulaComponent extends Component {
  state = {
    doseSelectUnit: 'mg Daily',
    doseSelectValue: 1,
    liquidDoseSelectUnit: 'mL Daily',
    liquidDoseSelectValue: 1,
    decimal: 0
  }

  handleFormulaCalculation = (val1, unit1, val2, unit2, selectValue) => {
    // Dose = Weight * Dosage
    return (val1 * unit1 * val2 * unit2 * selectValue).toFixed(
      this.state.decimal
    )
  }

  handleDoseSelectChange = event => {
    const { value } = event.target
    let selectValue = 1
    data.doseUnitData.filter(item => {
      if (item.unit === value) {
        selectValue = item.value
      }
      return item.value
    })
    this.setState({ doseSelectUnit: value, doseSelectValue: selectValue })
  }

  handleLiquidDoseSelectChange = event => {
    const { value } = event.target
    let selectValue = 1
    data.liquidDoseUnitData.filter(item => {
      if (item.unit === value) {
        selectValue = item.value
      }
      return item.value
    })
    this.setState({
      liquidDoseSelectUnit: value,
      liquidDoseSelectValue: selectValue
    })
  }

  handleDecimalChange = action => {
    const oldDecimal = this.state.decimal
    if (action === '+') {
      // add
      this.setState({ decimal: oldDecimal + 1 })
    } else {
      // remove
      if (oldDecimal === 0) {
        return
      }
      this.setState({ decimal: oldDecimal - 1 })
    }
  }

  render () {
    const { classes, data } = this.props

    // extract needed field vars
    let dosageValue = null
    let dosageUnit = null
    let weightValue = null
    let weightUnit = null
    let medAmountValue = null
    let medAmountUnit = null
    let perVolumeValue = null
    let perVolumeUnit = null

    if (data.questions[0].calculate) {
      dosageValue = data.questions[0].calculate.input
      data.dosageUnitData.filter(item => {
        if (item.unit === data.questions[0].calculate.select) {
          dosageUnit = item.value
        }
        return item.value
      })
    }

    if (data.questions[1].calculate) {
      weightValue = data.questions[1].calculate.input
      data.weightUnitData.filter(item => {
        if (item.unit === data.questions[1].calculate.select) {
          weightUnit = item.value
        }
        return item.value
      })
    }

    if (data.questions[2].calculate) {
      medAmountValue = data.questions[2].calculate.input
      data.medAmountUnitData.filter(item => {
        if (item.unit === data.questions[2].calculate.select) {
          medAmountUnit = item.value
        }
        return item.value
      })
    }

    if (data.questions[3].calculate) {
      perVolumeValue = data.questions[3].calculate.input
      data.perVolumeUnitData.filter(item => {
        if (item.unit === data.questions[3].calculate.select) {
          perVolumeUnit = item.value
        }
        return item.value
      })
    }

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
                  dosageUnit,
                  weightValue,
                  weightUnit,
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
                {data.doseUnitData.map(option => (
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
                  medAmountUnit,
                  perVolumeValue,
                  perVolumeUnit,
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
                {data.liquidDoseUnitData.map(option => (
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
