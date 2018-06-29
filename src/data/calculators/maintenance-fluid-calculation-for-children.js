import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from '@material-ui/core/MenuItem';
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueFragment, ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

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

  handleFormulaCalc = (type, weight, fluidRateSelectValue) => {
    // Fluid Rate = Daily Volume/24
    // For infants 3.5 — 10kg the daily fluid requirement is 100mL/kg
    // For children between 11—20 kg the daily fluid requirement is 1,000 mL + 50mL/kg for every kg over 10
    // For children between >20 kg the daily fluid requirement is 1,500 mL + 20mL/kg for every kg over 20, up to a maximum of 2,400mL daily
    // This calculation does not apply to newborn infants (i.e. from 0 to 28 days after full term delivery)
    let dailyVolume = 0
    if (weight <= 10) {
      dailyVolume = weight * 100
    } else if (weight > 10 && weight <= 20) {
      dailyVolume = 1000 + 50 * (weight - 10)
    } else if (weight > 20) {
      dailyVolume = 1500 + 20 * (weight - 20)
      if (dailyVolume >= 2400) {
        dailyVolume = 2400
      }
    }
    if (type === 'daily volume') {
      return dailyVolume.toFixed(this.state.decimal)
    } else if (type === 'fluid rate') {
      const fluidRate = dailyVolume / 24
      return (fluidRate / fluidRateSelectValue).toFixed(this.state.decimal)
    }
  }

  handleFluidRateSelectChange = event => {
    const { value } = event.target
    let selectValue = filterUnit(unitData.fluidRate, value)
    this.setState({
      fluidRateSelectUnit: value,
      fluidRateSelectValue: selectValue
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
          <ResultCardFormulaValueFragment
            classes={classes}
            caption='Daily Volume'
            values={[this.handleFormulaCalc(
              'daily volume',
              weightValue * weightUnitValue
            )]}
          />
          <ResultCardFormulaValueSelectFragment
            classes={classes}
            caption='Fluid Rate'
            value={this.handleFormulaCalc(
              'fluid rate',
              weightValue * weightUnitValue,
              this.state.fluidRateSelectValue
            )}
            selectValue={this.state.fluidRateSelectUnit}
            selectOnChange={this.handleFluidRateSelectChange}
          >
            {unitData.fluidRate.map(option => (
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
  "id": "maintenance-fluid-calculation-for-children",
  "title": "Maintenance Fluid Calculation for Children",
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
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "For infants 3.5 — 10kg the daily fluid requirement is 100mL/kg",
      "For children between 11—20 kg the daily fluid requirement is 1,000 mL + 50mL/kg for every kg over 10",
      "For children between >20 kg the daily fluid requirement is 1,500 mL + 20mL/kg for every kg over 20, up to a maximum of 2,400mL daily",
      "This calculation does not apply to newborn infants (i.e. from 0 to 28 days after full term delivery)"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Holliday MA, Segar WE. The maintenance need for water in parenteral fluid therapy. Pediatrics. Vol. 19, 1957 823-832."
    ]
  },
  "formula": {
    "type": "paragraph",
    "content": ["Fluid Rate = Daily Volume/24"]
  }
}
