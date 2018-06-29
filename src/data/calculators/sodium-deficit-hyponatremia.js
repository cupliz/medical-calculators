import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from '@material-ui/core/MenuItem';
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    weight: [
        { value: 0.453592, unit: 'lb' },
        { value: 1, unit: 'kg' },
        { value: 0.001, unit: 'g' },
        { value: 1e-6, unit: 'mg' }
    ],
    serumNa: [
        { value: 1, unit: 'mEq/L' },
        { value: 1, unit: 'mmol/L' }
    ],
    desiredNa: [
        { value: 1, unit: 'mEq/L' },
        { value: 1, unit: 'mmol/L' }
    ],
    NaDeficit: [
        { value: 1, unit: 'mEq' },
        { value: 1, unit: 'mmol' },
        { value: 1000, unit: 'Eq' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        NaDeficitSelectUnit: 'mEq',
        NaDeficitSelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        gender,
        weight,
        serumNa,
        desiredNa,
        selectValue
    ) => {
        // NaDeficit = gender * weight * (desiredNa - serumNa)
        const NaDeficit = gender * weight * (desiredNa - serumNa)
        console.log(NaDeficit)
        console.log(gender)
        console.log(weight)
        console.log(desiredNa)
        return (NaDeficit / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.NaDeficit, value)
        this.setState({ NaDeficitSelectUnit: value, NaDeficitSelectValue: selectValue })
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
        let genderValue = null
        let weightValue = null
        let weightUnitValue = null
        let serumNaValue = null
        let serumNaUnitValue = null
        let desiredNaValue = null
        let desiredNaUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                if (index === 0) {
                    genderValue = calculate["points"]
                }
                else {
                    const { input, select } = calculate
                    if (index === 1) {
                        weightValue = input
                        weightUnitValue = filterUnit(unitData.weight, select)
                    }
                    if (index === 2) {
                        serumNaValue = input
                        serumNaUnitValue = filterUnit(unitData.serumNa, select)
                    }
                    if (index === 3) {
                        desiredNaValue = input
                        desiredNaUnitValue = filterUnit(unitData.desiredNa, select)
                    }
                }
            }
            return calculate
        })

        if (genderValue && weightValue && serumNaValue && desiredNaValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='Sodium Deficit'
                        value={this.handleCalc(
                            genderValue,
                            weightValue * weightUnitValue,
                            serumNaValue * serumNaUnitValue,
                            desiredNaValue * desiredNaUnitValue,
                            this.state.NaDeficitSelectValue
                        )}
                        selectValue={this.state.NaDeficitSelectUnit}
                        selectOnChange={this.handleSelectChange}
                    >
                        {unitData.NaDeficit.map(option => (
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
  "id": "sodium-deficit-hyponatremia",
  "title": "Sodium Deficit in Hyponatremia",
  "type": "formula",
  "questions": [
    {
      "group": "Gender",
      "data": [
        {
          "type": "radio",
          "options": "Male | Female | Child | Elderly Male | Elderly Female",
          "points": "0.6/0.5/0.6/0.5/0.45"
        }
      ]
    },
    {
      "group": "Weight",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter Weight",
          "values": ["kg", "lb", "g", "mg"]
        }
      ]
    },
    {
      "group": "Serum Na",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter sodium value",
          "values": ["mEq/L", "mmol/L"]
        }
      ]
    },
    {
      "group": "Desired Na",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter sodium value",
          "values": ["mEq/L", "mmol/L"]
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "This calculator calculates the sodium quantity missing in hyponatremia",
      "Gender x Weight represents the normal total body water (TBW) which is gender specific",
      "Use the Sodium Correction Rate calculator to pick an appropriate fluid and volume. Remember not to correct too rapidly to avoid central pontine myelinosis"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Adrogué HJ, Madias NE. Hyponatremia. N Engl J Med. 2000 May 25;342(21):1581-9.",
      "Oh MS, Uribarri J, Barrido D, Landman E, Choi KC, Carroll HJ. Danger of central pontine myelinolysis in hypotonic dehydration and recommendation for treatment. Am J Med Sci. 1989 Jul;298(1):41-3."
    ]
  },
  "formula": {
    "type": "paragraph",
    "content": [
      "Sodium Deficit = Gender * Weight * (Desired Na - Serum Na)"
    ]
  }
}
