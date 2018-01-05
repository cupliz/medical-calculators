import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

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
          <ResultCardFormulaValueSelectFragment
            classes={classes}
            caption='Total Crystalloid For First 24 Hours'
            value={this.handleFormulaCalc(
              'total24',
              weightValue * weightUnitValue,
              percentValue * percentUnitValue,
              this.state.total24SelectValue
            )}
            selectValue={this.state.total24SelectUnit}
            selectOnChange={this.handleTotalSelectChange}
          >
            {unitData.total24.map(option => (
              <MenuItem key={option.unit} value={option.unit}>
                {option.unit}
              </MenuItem>
            ))}
          </ResultCardFormulaValueSelectFragment>
          <ResultCardFormulaValueSelectFragment
            classes={classes}
            caption='Rate First 8 Hours'
            value={this.handleFormulaCalc(
              'rate8',
              weightValue * weightUnitValue,
              percentValue * percentUnitValue,
              this.state.total24SelectValue,
              this.state.rate8SelectValue
            )}
            selectValue={this.state.rate8SelectUnit}
            selectOnChange={this.handleRate8SelectChange}
          >
            {unitData.rate8.map(option => (
              <MenuItem key={option.unit} value={option.unit}>
                {option.unit}
              </MenuItem>
            ))}
          </ResultCardFormulaValueSelectFragment>
          <ResultCardFormulaValueSelectFragment
            classes={classes}
            caption='Rate First 16 Hours'
            value={this.handleFormulaCalc(
              'rate16',
              weightValue * weightUnitValue,
              percentValue * percentUnitValue,
              this.state.total24SelectValue,
              this.state.rate8SelectValue,
              this.state.rate16SelectValue
            )}
            selectValue={this.state.rate16SelectUnit}
            selectOnChange={this.handleRate16SelectChange}
          >
            {unitData.rate16.map(option => (
              <MenuItem key={option.unit} value={option.unit}>
                {option.unit}
              </MenuItem>
            ))}
          </ResultCardFormulaValueSelectFragment>
          <Decimal
            classes={classes}
            decimal={this.state.decimal}
            onDecimalChange={this.handleDecimalChange}
          />
        </ResultCardHeader>
      )
    } else {
      return null
    }
  }
}
export default FormulaComponent

export const config = {
  "id": "parkland-formula-for-burns",
  "title": "Parkland Formula for Burns",
  "type": "formula",
  "questions": [
    {
      "group": "Weight",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Please enter Weight",
          "values": ["kg", "lb"]
        }
      ]
    },
    {
      "group": "Percent Nonsuperficial Burn Area",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Please enter Percent Nonsuperficial Burn Area",
          "values": ["%"],
          "disabled": true
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "Fluid needs calculated according to the Parkland formula provide only a guide to baseline fluid requirements in patients with major burns. Superficial burns are not included in the calculation",
      "Patients with burn shock require immediate, aggressive IV fluid resuscitation and their fluid needs can exceed those estimated by the Parkland formula",
      "The fluid needs of burn patients may vary extensively. Use physiological parameters (e.g. Blood pressure, pulse rate, urine output) to determine the adequacy of fluid resuscitation",
      "Elderly patients or children with major burns have additional fluid needs"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Saffle, JR. Practice guidelines for burn care. J Burn Care. 2001; 22(Suppl):i.",
      "Slater H, Goldfarb IW. The management of burn trauma: a house staff handbook. Western Pennsylvania Hospital. 2003: p 9-12."
    ]
  },
  "formula": {
    "type": "unordered-list",
    "content": [
      "Total Crystalloid For First 24 Hours = 4 * Weight * Percent Non-superficial Burn Area",
      "Rate First 8 Hours =  Total Crystalloid / 16",
      "Rate Next 16 Hours =  Total Crystalloid / 32"
    ]
  }
}
