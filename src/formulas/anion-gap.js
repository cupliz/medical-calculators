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
  na: [
    { value: 1, unit: 'mmol/L' },
    { value: 1, unit: 'mEq/L' }
  ],
  cl: [
    { value: 1, unit: 'mmol/L' },
    { value: 1, unit: 'mEq/L' }
  ],
  hco3: [
    { value: 1, unit: 'mmol/L' },
    { value: 1, unit: 'mEq/L' }
  ],
  albumin: [
    { value: 1, unit: 'g/L' },
    { value: 0.1, unit: 'g/dL' }
  ],
  anionGap: [
    { value: 1, unit: 'mmol/L' },
    { value: 1, unit: 'mEq/L' }
  ],
  correctedAnionGap: [
    { value: 1, unit: 'mmol/L' },
    { value: 1, unit: 'mEq/L' }
  ]
}

const filterUnit = (arr, select) =>
  arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
  state = {
    anionGapSelectUnit: 'mmol/L',
    anionGapSelectValue: 1,
    correctedAnionGapSelectUnit: 'mmol/L',
    correctedAnionGapSelectValue: 1,
    decimal: 2
  }

  handleFormulaCalc = (
    type,
    dosage,
    weight,
    selectValue,
    medAmount,
    perVolume,
    liquidSelectValue
  ) => {
    // Anion Gap = Na - (Cl +HCO3)
    // Albumin Corrected Anion Gap = Anion Gap + (2.5* (Normal Albumin - Observed Albumin))
    const dose = dosage * weight
    if (type === 'dose') {
      return (dose / selectValue).toFixed(this.state.decimal)
    } else if (type === 'liquidDose') {
      if (medAmount && perVolume) {
        const liquidDose = dose * perVolume / medAmount / liquidSelectValue
        return liquidDose.toFixed(this.state.decimal)
      } else {
        return 0
      }
    }
  }

  handleAnionGapSelectChange = event => {
    const { value } = event.target
    let selectValue = filterUnit(unitData.anionGap, value)
    this.setState({ anionGapSelectUnit: value, anionGapSelectValue: selectValue })
  }

  handleCorrectedAnionGapSelectChange = event => {
    const { value } = event.target
    let selectValue = filterUnit(unitData.correctedAnionGap, value)
    this.setState({
      correctedAnionGapSelectUnit: value,
      correctedAnionGapSelectValue: selectValue
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
    let naValue = null
    let naUnitValue = null
    let clValue = null
    let clUnitValue = null
    let hco3Value = null
    let hco3UnitValue = null
    let albuminValue = null
    let albuminUnitValue = null

    questions.map((question, index) => {
      const { calculate } = question
      if (calculate) {
        const { input, select } = calculate
        if (index === 0) {
          naValue = input
          naUnitValue = filterUnit(unitData.na, select)
        }
        if (index === 1) {
          clValue = input
          clUnitValue = filterUnit(unitData.cl, select)
        }
        if (index === 2) {
          hco3Value = input
          hco3UnitValue = filterUnit(unitData.hco3, select)
        }
        if (index === 3) {
          albuminValue = input
          albuminUnitValue = filterUnit(unitData.albumin, select)
        }
      }
      return calculate
    })

    if (naValue && clValue && hco3Value) {
      return (
        <ResultCardHeader classes={classes}>
          <CardContent className={classes.content}>
            <Typography type='caption' className={classes.contentText}>
              Dose
            </Typography>
            <div className={classes.resultWrapper}>
              <Typography type='title' className={classes.resultText}>
                {this.handleFormulaCalc(
                  'dose',
                  dosageValue * dosageUnitValue,
                  weightValue * weightUnitValue,
                  this.state.doseSelectValue
                )}
              </Typography>
              <TextField
                select
                value={this.state.doseSelectUnit}
                onChange={this.handleAnionGapSelectChange}
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
                {this.handleFormulaCalc(
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
                onChange={this.handleCorrectedAnionGapSelectChange}
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
