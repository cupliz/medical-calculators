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
    bloodVol: [
        { value: 1, unit: 'mL' },
        { value: 1000, unit: 'L' },
        { value: 29.5735, unit: 'fL oz' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        bloodVolSelectUnit: 'mL',
        bloodVolSelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        weight,
        avgBloodVol,
        selectValue
    ) => {
        // BloodVol = Weight * AvgBloodVol
        const bloodVol = weight * avgBloodVol
        return (bloodVol / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.bloodVol, value)
        this.setState({ bloodVolSelectUnit: value, bloodVolSelectValue: selectValue })
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
        let avgBloodVolValue = null
        let weightValue = null
        let weightUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                if (index === 0) {
                    avgBloodVolValue = calculate["points"]
                }
                else {
                    const { input, select } = calculate
                    if (index === 1) {
                        weightValue = input
                        weightUnitValue = filterUnit(unitData.weight, select)
                    }
                }
            }
            return calculate
        })

        if (avgBloodVolValue && weightValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='Blood Volume'
                        value={this.handleCalc(
                            avgBloodVolValue,
                            weightValue * weightUnitValue,
                            this.state.bloodVolSelectValue
                        )}
                        selectValue={this.state.bloodVolSelectUnit}
                        selectOnChange={this.handleSelectChange}
                    >
                        {unitData.bloodVol.map(option => (
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
  "id": "estimated-blood-volume",
  "title": "Estimated Blood Volume",
  "type": "formula",
  "questions": [
    {
      "group": "Average Blood Volume",
      "data": [
        {
          "type": "radio",
          "options": "Male | Female | Infants | Neonates | Premature Neonates",
          "points": "75/65/80/85/96"
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
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "This calculator provides an estimate of blood volume for different patient weights and average blood volumes",
      "Average blood volume values are given in mL/kg for the different patient groups. Numbers next to each patient group represent the values that are used. For example average blood volume for Males is 75mL/kg"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Morgan, Mikhail, and Murray. Clinical Anesthesiology. 3rd Edition."
    ]
  },
  "formula": {
    "type": "paragraph",
    "content": [
      "Blood Volume = Weight ⨉ Average Blood Volume "
    ]
  }
}
