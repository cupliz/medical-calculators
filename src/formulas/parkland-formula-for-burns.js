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
  percent: [{ value: 1, unit: '%' }],
  total24: [{ value: 1, unit: 'mL' }, { value: 1000, unit: 'L' }],
  rate8: [
    { value: 1, unit: 'mL/hr' },
    { value: 1000, unit: 'L/hr' },
    { value: 60, unit: 'mL/min' }
  ],
  rate16: [
    { value: 1, unit: 'mL/hr' },
    { value: 1000, unit: 'L/hr' },
    { value: 60, unit: 'mL/min' }
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
    const anionGap = na - (cl + hc03)
    if (type === 'anion gap') {
      return (anionGap / anionGapSelectValue).toFixed(this.state.decimal)
    } else if (type === 'corrected anion gap') {
      if (albumin) {
        const correctedAnionGap = anionGap + 2.5 * (4 - albumin)
        return (correctedAnionGap / correctedAnionGapSelectValue).toFixed(
          this.state.decimal
        )
      } else {
        return 0
      }
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

  render() {
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
            <Typography type="caption" className={classes.contentText}>
              Anion Gap
            </Typography>
            <div className={classes.resultWrapper}>
              <Typography type="title" className={classes.resultText}>
                {this.handleFormulaCalc(
                  'anion gap',
                  naValue * naUnitValue,
                  clValue * clUnitValue,
                  hco3Value * hco3UnitValue,
                  this.state.anionGapSelectValue
                )}
              </Typography>
              <TextField
                select
                value={this.state.anionGapSelectUnit}
                onChange={this.handleTotalSelectChange}
                SelectProps={{ classes: { root: this.props.classes.select } }}
                margin="normal"
              >
                {unitData.anionGap.map(option => (
                  <MenuItem key={option.unit} value={option.unit}>
                    {option.unit}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <Typography type="caption" className={classes.contentText}>
              Corrected Anion Gap
            </Typography>
            <div className={classes.resultWrapper}>
              <Typography type="title" className={classes.resultText}>
                {this.handleFormulaCalc(
                  'corrected anion gap',
                  naValue * naUnitValue,
                  clValue * clUnitValue,
                  hco3Value * hco3UnitValue,
                  this.state.anionGapSelectValue,
                  albuminValue * albuminUnitValue,
                  this.state.correctedAnionGapSelectValue
                )}
              </Typography>
              <TextField
                select
                value={this.state.correctedAnionGapSelectUnit}
                onChange={this.handleRate8SelectChange}
                SelectProps={{ classes: { root: this.props.classes.select } }}
                margin="normal"
              >
                {unitData.correctedAnionGap.map(option => (
                  <MenuItem key={option.unit} value={option.unit}>
                    {option.unit}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className={classes.decimalPrecisionWrapper}>
              <Typography type="title" className={classes.decimalPrecision}>
                Decimal Precision
              </Typography>
              <div className={classes.decimalButtonsWrapper}>
                <Button
                  fab
                  color="primary"
                  aria-label="add"
                  className={classes.decimalButton}
                  onClick={() => this.handleDecimalChange('-')}
                >
                  <RemoveIcon />
                </Button>
                <Typography type="title" className={classes.decimalPoint}>
                  {this.state.decimal}
                </Typography>
                <Button
                  fab
                  color="primary"
                  aria-label="add"
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
