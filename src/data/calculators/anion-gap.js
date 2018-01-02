import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Decimal from '../../components/Decimal/Decimal'

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
    { value: 0.1, unit: 'g/L' },
    { value: 1, unit: 'g/dL' }
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
    na,
    cl,
    hc03,
    anionGapSelectValue,
    albumin,
    correctedAnionGapSelectValue
  ) => {
    // Anion Gap = Na - (Cl +HCO3)
    // Corrected Anion Gap = Anion Gap + (2.5 * (4 - Albumin))
    const anionGap = na - (cl + hc03)
    if (type === 'anion gap') {
      return (anionGap / anionGapSelectValue).toFixed(this.state.decimal)
    } else if (type === 'corrected anion gap') {
      if (albumin) {
        const correctedAnionGap = anionGap + (2.5 * (4 - albumin))
        return (correctedAnionGap / correctedAnionGapSelectValue).toFixed(this.state.decimal)
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
              Anion Gap
            </Typography>
            <div className={classes.resultWrapper}>
              <Typography type='title' className={classes.resultText}>
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
                onChange={this.handleAnionGapSelectChange}
                SelectProps={{ classes: { root: this.props.classes.select } }}
                margin='normal'
              >
                {unitData.anionGap.map(option => (
                  <MenuItem key={option.unit} value={option.unit}>
                    {option.unit}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <Typography type='caption' className={classes.contentText}>
              Corrected Anion Gap
            </Typography>
            <div className={classes.resultWrapper}>
              <Typography type='title' className={classes.resultText}>
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
                onChange={this.handleCorrectedAnionGapSelectChange}
                SelectProps={{ classes: { root: this.props.classes.select } }}
                margin='normal'
              >
                {unitData.correctedAnionGap.map(option => (
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
