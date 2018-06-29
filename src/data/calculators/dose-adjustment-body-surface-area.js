import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from '@material-ui/core/MenuItem';
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    standardDose: [
        { value: 1, unit: 'mg' },
        { value: 1000, unit: 'g' },
        { value: 0.001, unit: 'mcg' }
    ],
    height: [
        { value: 1, unit: 'cm' },
        { value: 100, unit: 'm' },
        { value: 2.54, unit: 'in' }
    ],
    weight: [
        { value: 1, unit: 'kg' },
        { value: 0.453592, unit: 'lb' }
    ],
    adjustedDose: [
        { value: 1, unit: 'mg' },
        { value: 1000, unit: 'g' },
        { value: 0.001, unit: 'mcg' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        adjustedDoseSelectUnit: 'mg',
        adjustedDoseSelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        standardDose,
        height,
        weight,
        selectValue
    ) => {
        // AdjustedDose = StandardDose * BSA / 1.73
        // BSA = 0.007184 * Height^0.725 * Weight^0.425
        //console.log(standardDose)
        //console.log(height)
        //console.log(weight)
        const adjustedDose = (standardDose * ((0.007184 * Math.pow(height,0.725) * Math.pow(weight, 0.425)) / 1.73) )
        return (adjustedDose / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.adjustedDose, value)
        this.setState({ adjustedDoseSelectUnit: value, adjustedDoseSelectValue: selectValue })
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
        let standardDoseValue = null
        let standardDoseUnitValue = null
        let heightValue = null
        let heightUnitValue = null
        let weightValue = null
        let weightUnitValue = null


        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    standardDoseValue = input
                    standardDoseUnitValue = filterUnit(unitData.standardDose, select)
                }
                if (index === 1) {
                    heightValue = input
                    heightUnitValue = filterUnit(unitData.height, select)
                }
                if (index === 2) {
                    weightValue = input
                    weightUnitValue = filterUnit(unitData.weight, select)
                }
            }
            return calculate
        })

        if (standardDoseValue && heightValue && weightValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='Adjusted Dose'
                        value={this.handleCalc(
                            standardDoseValue * standardDoseUnitValue,
                            heightValue * heightUnitValue,
                            weightValue * weightUnitValue,
                            this.state.adjustedDoseSelectValue
                        )}
                        selectValue={this.state.adjustedDoseSelectUnit}
                        selectOnChange={this.handleSelectChange}
                    >
                        {unitData.adjustedDose.map(option => (
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
  "id": "dose-adjustment-body-surface-area",
  "title": "Dose Adjustment for Body Surface Area",
  "type": "formula",
  "questions": [
    {
      "group": "Standard dose",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter dose",
          "values": ["mg", "g", "mcg"]
        }
      ]
    },
    {
      "group": "Height",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter height",
          "values": ["cm", "m", "in"]
        }
      ]
    },
    {
      "group": "Weight",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter weight",
          "values": ["kg", "lb"]
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "Calculates the adjusted dose based on the DuBois method for body surface area (BSA)"
    ]
  },
  "formula": {
    "type": "unordered-list",
    "content": [
      "BSA = 0.007184 ⨉ Height^0.725 ⨉ Weight^0.425",
      "AdjustedDose = StandardDose * BSA / 1.73"
    ]
  }
}
