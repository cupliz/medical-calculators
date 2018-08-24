import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from '@material-ui/core/MenuItem';
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    weight: [
        { value: 1, unit: 'kg' }, 
        { value: 0.45359237, unit: 'lb' }
    ],
    dosage: [
        { value: 1000, unit: 'gm' },
        { value: 0.001, unit: 'mcg' },
        { value: 1, unit: 'mg' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        DosageSelectUnit: 'mg',
        DosageSelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        weight,
        severityFactor,
        renalFactor,
        selectValue
    ) => {
        // dosage = weight * severityFactor * renalFactor
        const dosage = weight * severityFactor * renalFactor 
        return (dosage / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.dosage, value)
        this.setState({ DosageSelectUnit: value, DosageSelectValue: selectValue })
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
        let severityFactor = null
        let renalFactor = null


        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const {input, select} = calculate
                if (index === 0) {
                  weightValue = input
                  weightUnitValue = filterUnit(unitData.weight, select)
                }
                if (index === 1) {
                  severityFactor = calculate["points"]
                }
                if (index === 2) {
                  renalFactor = calculate["points"]
                }
            }
            return calculate
        })

        if (weightValue && severityFactor !== null && renalFactor !== null) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='Estimated Hemorrhage Volume'
                        value={this.handleCalc(
                            weightValue * weightUnitValue,
                            severityFactor,
                            renalFactor,
                            this.state.DosageSelectValue
                        )}
                        selectValue={this.state.DosageSelectUnit}
                        selectOnChange={this.handleSelectChange}
                    >
                        {unitData.dosage.map(option => (
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
    "id": "abc-2-formula-intracerebral-hemorrhage-volume",
    "title": "ABC/2 Formula for Intracerebral Hemorrhage Volume",
    "type": "formula",
    "questions": [
        {
          "group": "Weight",
          "data": [
            {
              "type": "input/select",
              "placeholder": "Enter patient weight",
              "values": ["kg", "lb"]
            }
          ]
        },
        {
            "group": "Severity Factor",
            "data": [
                {
                    "type": "radio",
                    "options": "Dose for serious infection | Dose when infection is life threatening",
                    "points": "3/5"
                }
            ]
        },
        {
            "group": "Renal Factor",
            "data": [
                {
                    "type": "radio",
                    "options": "Serum Creatinine <= 1 mg/dL | Serum Cr. 1.1-1.3 mg/dL | Serum Cr. 1.4-1.6 mg/dL | Serum Cr. 1.7-1.9 mg/dL | Serum Cr. 2.0-2.2 mg/dL | Serum Cr. 2.3-2.5 mg/dL | Serum Cr. 2.6-3.0 mg/dL | Serum Cr. 3.1-3.5 mg/dL | Serum Cr. 3.6-4.0 mg/dL | Serum Cr. 4.1-5.1 mg/dL | Serum Cr. 5.2-6.6 mg/dL | Serum Cr. 6.7-8.0 mg/dL",
                    "points": "1/0.8/0.65/0.55/0.5/0.4/0.35/0.3/0.25/0.2/0.15/0.1"
                }
            ]
        }
    ],
    "results": {},
    "notes": {
        "type": "unordered-list",
        "content": [
            "Equation parameters such as Severity Factor have two or more discrete values that may be used in the calculation. The numbers in the parentheses, e.g. (3), represent the values that will be used.",
            "The default unit of measure for weight is kilograms. Please verify that the correct unit of measure has been selected."
        ]
    },
    "formula": {
        "type": "paragraph",
        "content": [
            "Dose = Weight * SeverityFactor * RenalFactor"
        ]
    }
}
