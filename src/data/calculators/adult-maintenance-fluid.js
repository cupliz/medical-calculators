import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from '@material-ui/core/MenuItem';
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

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
        // Calculated using the "4-2-1" Rule
        // For 0-10kg: * 4mL/kg/hr
        // For 10-20kg: * 2 mL/kg/hr
        // For >20kg: * 1mL/kg/hr
        let fluidRate = 0
        if (weight < 10) {
            fluidRate = weight * 4
        } else if (weight >= 10 && weight <= 20) {
            fluidRate = 40 + ((weight - 10) * 2)
        } else if (weight > 20) {
            fluidRate = 60 + ((weight - 20) * 1)
            if (fluidRate >= 2400) {
                fluidRate = 2400
            }
        }
        if (type === 'fluid rate') {
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
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='Maintenance Fluid Rate'
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
    "id": "adult-maintenance-fluid",
    "title": "Adult Maintenance Fluid Calculator",
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
            "Calculated using the 4-2-1 rule",
            "For the first 10 kg of body weight, 4 mL of fluid is administered per kg",
            "For the second 10 kg, 2 mL/kg/hr is administered",
            "For each additional kg over 20kg, 1mL/kg/hr should be given",
            "The formula comes from elegant work done in the 1950s that correlated caloric expenditure with fluid loss"
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
        "content": ["Calculated using the 4-2-1 rule; see notes"]
    }
}
