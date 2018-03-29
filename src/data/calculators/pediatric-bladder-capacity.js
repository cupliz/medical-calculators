import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    age: [
        { value: 1, unit: 'yrs' },
        { value: 0.0833334, unit: 'mos'}
    ],
    bladderCapacity: [
        { value: 1, unit: 'mL' },
        { value: 29.5735, unit: 'fl oz' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        bladderCapacitySelectUnit: 'mL',
        bladderCapacitySelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        age,
        selectValue
    ) => {
        // Pediatric Bladder Capacity = Age in Years + 2 x 30
        const bladderCapacity = (age + 2) * 30
        return (bladderCapacity / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.bladderCapacity, value)
        this.setState({ bladderCapacitySelectUnit: value, bladderCapacitySelectValue: selectValue })
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
        let ageValue = null
        let ageUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    ageValue = input
                    ageUnitValue = filterUnit(unitData.age, select)
                }
            }
            return calculate
        })

        if (ageValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='Estimated Bladder Capacity'
                        value={this.handleCalc(
                            ageValue * ageUnitValue,
                            this.state.bladderCapacitySelectValue
                        )}
                        selectValue={this.state.bladderCapacitySelectUnit}
                        selectOnChange={this.handleSelectChange}
                    >
                        {unitData.bladderCapacity.map(option => (
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
    "id": "pediatric-bladder-capacity",
    "title": "Pediatric Bladder Capacity",
    "type": "formula",
    "questions": [
        {
            "group": "Age",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter age",
                    "values": ["yrs", "mos"]
                }
            ]
        }
    ],
    "results": {},
    "notes": {
        "type": "unordered-list",
        "content": [
            "In general, the normal bladder will accommodate a predicted volume of urine based on the child's age at a low or safe detrusor pressure",
            "A newborn bladder has a predicted capacity of approximately 20 to 30mL"
        ]
    },
    "formula": {
        "type": "unordered-list",
        "content": [
            "Child Bladder Capacity = Age in years + 2 x 30"
        ]
    }
}
