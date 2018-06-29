import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from '@material-ui/core/MenuItem';
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'
//"values": ["mmol/L", "mg/dL", "g/L", "g/dL","mcg/dL", "mcg/mL"]

const unitData = {
    measuredNa: [
        { value: 1, unit: 'mEq/L' },
        { value: 1, unit: 'mmol/L' }
    ],
    glucose: [
        { value: 18.01801801801802, unit: 'mmol/L' },
        { value: 1, unit: 'mg%' },
        { value: 1, unit: 'mg/dL' },
        { value: 100, unit: 'g/L'},
        { value: 1000, unit: 'g/dL'},
        { value: 0.001, unit: 'mcg/dL'},
        { value: 0.1, unit: 'mcg/mL'}
    ],
    Na: [
        { value: 1, unit: 'mEq/L' },
        { value: 1, unit: 'mmol/L' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        NaSelectUnit: 'mEq/L',
        NaSelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        measuredNa,
        glucose,
        selectValue
    ) => {
        // Na = MeasuredSodium + 0.016 * (Glucose - 100)
        const Na = measuredNa + (0.016 * (glucose - 100))
        return (Na / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.Na, value)
        this.setState({ NaSelectUnit: value, NaSelectValue: selectValue })
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
        let measuredNaValue = null
        let measuredNaUnitValue = null
        let glucoseValue = null
        let glucoseUnitValue = null


        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    measuredNaValue = input
                    measuredNaUnitValue = filterUnit(unitData.measuredNa, select)
                }
                if (index === 1) {
                    glucoseValue = input
                    glucoseUnitValue = filterUnit(unitData.glucose, select)
                }
            }
            return calculate
        })

        if (measuredNaValue && glucoseValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='Na'
                        value={this.handleCalc(
                            measuredNaValue * measuredNaUnitValue,
                            glucoseValue * glucoseUnitValue,
                            this.state.NaSelectValue
                        )}
                        selectValue={this.state.NaSelectUnit}
                        selectOnChange={this.handleSelectChange}
                    >
                        {unitData.Na.map(option => (
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
  "id": "sodium-correction-hyperglycemia",
  "title": "Sodium Correction in Hyperglycemia",
  "type": "formula",
  "questions": [
    {
      "group": "Measured Na",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter sodium value",
          "values": ["mEq/L", "mmol/L"]
        }
      ]
    },
    {
      "group": "Glucose",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter glucose value",
          "values": ["mmol/L", "mg/dL", "mg%", "g/L", "g/dL","mcg/dL", "mcg/mL"]
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "Calculates the actual sodium level in patients with hyperglycemia based on Katz's sodium factor",
      "The corrected sodium factor in the 1976 Katz publication was 1.6 mEq/L. However, in 1999 Hillier et. al evaluated 6 healthy subjects, induced hyperglycemia and measured actual sodium levels. They found that a sodium correction factor of 2.4 mEq/L was more accurate."
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Katz MA. Hyperglycemia-induced hyponatremia calculation of expected serum sodium depression. N Engl J Med. 1973 Oct 18;289(16):843-4.",
      "Hillier TA, Abbott RD, Barrett EJ. Hyponatremia: evaluating the correction factor for hyperglycemia. Am J Med. 1999 Apr;106(4):399-403."
    ]
  },
  "formula": {
    "type": "paragraph",
    "content": [
      "Na = MeasuredSodium + 0.016 ⨉ (Glucose - 100)"
    ]
  }
}
