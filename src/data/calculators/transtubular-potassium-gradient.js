import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from '@material-ui/core/MenuItem';
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'
//values": ["mL/min", "mL/sec", "mL/h","L/min", "L/sec"
const unitData = {
    urineK: [
        { value: 1, unit: 'mEq/L' },
        { value: 1, unit: 'mmol/L' }
    ],
    serumK: [
        { value: 1, unit: 'mEq/L' },
        { value: 1, unit: 'mmol/L' }
    ],
    urineOsm: [
        { value: 1, unit: 'mOsm/kg' },
        { value: 0.1, unit: 'mOsm/dL' }
    ],
    serumOsm: [
        { value: 1, unit: 'mOsm/kg' },
        { value: 0.1, unit: 'mOsm/dL' }
    ],
    ttkg: [
        { value: 1, unit: '#' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        ttkgSelectUnit: '#',
        ttkgSelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        urineK,
        serumK,
        urineOsm,
        serumOsm,
        selectValue
    ) => {
        // TTKG = (UrineK / SerumK) / (UrineOsm / SerumOsm)
        const ttkg = (urineK / serumK) / (urineOsm / serumOsm)
        return (ttkg / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.ttkg, value)
        this.setState({ ttkgSelectUnit: value, ttkgSelectValue: selectValue })
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
        let urineKValue = null
        let urineKUnitValue = null
        let serumKValue = null
        let serumKUnitValue = null
        let urineOsmValue = null
        let urineOsmUnitValue = null
        let serumOsmValue = null
        let serumOsmUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    urineKValue = input
                    urineKUnitValue = filterUnit(unitData.urineK, select)
                }
                if (index === 1) {
                    serumKValue = input
                    serumKUnitValue = filterUnit(unitData.serumK, select)
                }
                if (index === 2) {
                    urineOsmValue = input
                    urineOsmUnitValue = filterUnit(unitData.urineOsm, select)
                }
                if (index === 3) {
                    serumOsmValue = input
                    serumOsmUnitValue = filterUnit(unitData.serumOsm, select)
                }
            }
            return calculate
        })

        if (urineKValue && serumKValue && urineOsmValue && serumOsmValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='Oxygen Consumption'
                        value={this.handleCalc(
                            urineKValue * urineKUnitValue,
                            serumKValue * serumKUnitValue,
                            urineOsmValue * urineOsmUnitValue,
                            serumOsmValue * serumOsmUnitValue,
                            this.state.ttkgSelectValue
                        )}
                        selectValue={this.state.ttkgSelectUnit}
                        selectOnChange={this.handleSelectChange}
                    >
                        {unitData.ttkg.map(option => (
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
    "id": "transtubular-potassium-gradient",
    "title": "Transtubular Potassium Gradient",
    "type": "formula",
    "questions": [
        {
            "group": "Urine K",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter value",
                    "values": ["mEq/L", "mmol/L"]
                }
            ]
        },
        {
            "group": "Serum K",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter value",
                    "values": ["mEq/L", "mmol/L"]
                }
            ]
        },
        {
            "group": "Urine Osm",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter value",
                    "values": ["mOsm/kg", "mOsm/dL"]
                }
            ]
        },
        {
            "group": "Serum Osm",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter value",
                    "values": ["mOsm/kg", "mOsm/dL"]
                }
            ]
        }
    ],
    "results": {},
    "notes": {
        "type": "unordered-list",
        "content": [
            "Transtubular potassium gradient in the cortical collecting duct is an index reflecting the conservation of potassium",
            "Normal levels of TTKG in healthy subjects on normal diets is 8-9",
            "With a potassium load the TTKG may rise to 11",
            "In the event of Hyperkalemia, a low TTKG of < 7 may indicate hypoaldosteronism",
            "With no other diseases, hypokalemia should result in a TTKG < 3 (sometimes TTKG <2)",
            "Expected TTKG in hyperkalemia is >10"
        ]
    },
    "references": {
        "type": "ordered-list",
        "content": [
            "West ML, Marsden PA, Richardson RM, et. al. New clinical approach to evaluate disorders of potassium excretion. Mineral Electrolyt Metab. 12:234,1986. PMID: 3762510",
            "Ethier JH, Kamel KS, Magner PO, et. al. The transtubular potassium concentration in patients with hypokalemia and hyperkalemia. Am J Kidney Dis. 15:309,1990."
        ]
    },
    "formula": {
        "type": "paragraph",
        "content": [
            "TTKG = (UrineK / SerumK) / (UrineOsm / SerumOsm)"
        ]
    }
}
