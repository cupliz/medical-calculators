import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from '@material-ui/core/MenuItem';
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    height: [
        { value: 1, unit: 'in' },
        { value: 0.393701, unit: 'cm' },
        { value: 39.3701, unit: 'm' },
        { value: 12, unit: 'ft' }
    ],
    weight: [
        { value: 0.453592, unit: 'lb' },
        { value: 1, unit: 'kg' },
        { value: 0.001, unit: 'g' },
        { value: 1e-6, unit: 'mg' }
    ],
    idealbodyweight: [
        { value: 0.453592, unit: 'lb' },
        { value: 1, unit: 'kg' },
        { value: 0.001, unit: 'g' },
        { value: 1e-6, unit: 'mg' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        idealbodyweightSelectUnit: 'kg',
        idealbodyweightSelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        gender,
        height,
        selectValue
    ) => {
        // Ideal Body Weight = Gender + 2.3 * (Height - 60)
        const idealbodyweight = gender + 2.3 * (height - 60)
        return (idealbodyweight / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.idealbodyweight, value)
        this.setState({ idealbodyweightSelectUnit: value, idealbodyweightSelectValue: selectValue })
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
        let heightValue = null
        let heightUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                if (index === 0) {
                    genderValue = calculate["points"]
                }
                else {
                    const { input, select } = calculate
                    if (index === 1) {
                        heightValue = input
                        heightUnitValue = filterUnit(unitData.height, select)
                    }
                }
            }
            return calculate
        })

        if (genderValue && heightValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='Ideal Body Weight'
                        value={this.handleCalc(
                            genderValue,
                            heightValue * heightUnitValue,
                            this.state.idealbodyweightSelectValue
                        )}
                        selectValue={this.state.idealbodyweightSelectUnit}
                        selectOnChange={this.handleSelectChange}
                    >
                        {unitData.idealbodyweight.map(option => (
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
  "id": "ideal-body-weight",
  "title": "Ideal Body Weight",
  "type": "formula",
  "questions": [
    {
      "group": "Gender",
      "data": [
        {
          "type": "radio",
          "options": "Male | Female",
          "points": "50/45.5"
        }
      ]
    },
    {
      "group": "Height",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter Height",
          "values": ["cm", "in", "m", "ft"]
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "This calculator provides an estimate of ideal body weight for Male and Female patients based on the Devine formula",
      "Some medication doses require Ideal Body Weight while others require Total Body Weight so make sure to confirm with pharmacy before dosing",
      "This formula is an approximation, and is generally only applicable for people who are >1.5m (5ft) tall",
      "For Gentamicin dosing, use ideal body weight vs actual body weight as gentamicin distributes poorly in fat"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Devine BJ. Gentamicin therapy. Drug Intell Clin Pharm. 1974;8:650–655.",
      "Pai MP. Paloucek FP. The origin of the ideal body weight equations. Ann Pharmacother. 2000 Sep;34(9):1066-9."
    ]
  },
  "formula": {
    "type": "paragraph",
    "content": [
      "Ideal Body Weight (Men) = 50kg + 2.3kg ⨉ ( Height (inches) - 60 )",
      "Ideal Body Weight (Women) = 45.5kg + 2.3kg ⨉ ( Height(inches) - 60 )"
    ]
  }
}
