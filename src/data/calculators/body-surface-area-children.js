import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from '@material-ui/core/MenuItem';
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    height: [
        { value: 1, unit: 'cm' },
        { value: 100, unit: 'm' },
        { value: 2.54, unit: 'in' },
        { value: 30.48, unit: 'ft' }
    ],
    weight: [
        { value: 1, unit: 'kg' },
        { value: 0.453592, unit: 'lb' }
    ],
    bsa: [
        { value: 1, unit:'m²'}
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        bsaSelectUnit: 'm²',
        bsaSelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        height,
        weight,
        selectValue
    ) => {
        // BSA = SQR [BW (kg) x Ht (cm) / 3600]
        const bsa = Math.sqrt(weight * height /3600)
        console.log(bsa)
        return (bsa / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.bsa, value)
        this.setState({ bsaSelectUnit: value, bsaSelectValue: selectValue })
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
        let heightValue = null
        let heightUnitValue = null
        let weightValue = null
        let weightUnitValue = null

        questions.map((question, index) => {
          const { calculate } = question
          if (calculate) {
            const { input, select } = calculate
            if (index === 0) {
              heightValue = input
              heightUnitValue = filterUnit(unitData.height, select)
            }
            if (index === 1) {
              weightValue = input
              weightUnitValue = filterUnit(unitData.weight, select)
            }
          }
          return calculate
        })

        if (heightValue && weightValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='BSA(m²) '
                        value={this.handleCalc(
                            heightValue * heightUnitValue,
                            weightValue * weightUnitValue,
                            this.state.bsaSelectValue
                        )}
                        selectValue={this.state.bsaSelectUnit}
                        selectOnChange={this.handleSelectChange}
                    >
                        {unitData.bsa.map(option => (
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
    "id": "body-surface-area-children",
    "title": "Body Surface Area (Children)",
    "type": "formula",
    "questions": [
        {
            "group": "Patient Height",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Height",
                    "values": ["cm", "m", "in", "ft"]
                }
            ]
        },
        {
            "group": "Patient Weight",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Weight",
                    "values": ["kg", "lb"]
                }
            ]
        },
    ],
    "results": {},
    "formula": {
        "type": "paragraph",
        "content": [
            "BSA = SQR [BW (kg) x Ht (cm) / 3600]"
        ]
    }
}
