import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    na: [
        { value: 1, unit: 'mmol/L' },
        { value: 1, unit: 'mEq/L' }
    ],
    bun: [
        { value: 2.8, unit: 'mmol/L' },
        { value: 1, unit: 'mg/dL' }
    ],
    glucose: [
        { value: 18.01801801801802, unit: 'mmol/L' },
        { value: 1, unit: 'mg/dL'}
    ],
    ethanol: [
        { value: 4.6082949308755765, unit: 'mmol/L' },
        { value: 1, unit: 'mg/dL' }
    ],
    measuredSerumOsm: [
        { value: 1, unit: 'mOsm/kg' },
        { value: 1, unit: 'mmol/kg' }
    ],
    serumOsm: [
        { value: 1, unit: 'mOsm/kg' },
        { value: 1, unit: 'mmol/kg' }
    ],
    serumOsmGap: [
        { value: 1, unit: 'mOsm/kg' },
        { value: 1, unit: 'mmol/kg' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        serumOsmSelectUnit: 'mOsm/kg',
        serumOsmSelectValue: 1,
        serumOsmGapSelectUnit: 'mOsm/kg',
        serumOsmGapSelectValue: 1,
        decimal: 2
    }

    handleFormulaCalc = (
        type,
        na,
        bun,
        glucose,
        ethanol,
        measuredSerumOsm,
        serumOsmSelectValue,
        serumOsmGapSelectValue
    ) => {
        // Serum Osmolarity (US) = (2 * (Na) + (BUN / 2.8) + (glucose / 18) + (ethanol/3.7)
        // Normal Serum Osm Gap = Measured Serum Osm - Serum Osm
        const serumOsm = (2 * na) + (bun/2.8) + (glucose/18) + (ethanol/3.7)
        if (type === 'serum osmolarity') {
            return (serumOsm / serumOsmSelectValue).toFixed(this.state.decimal)
        } else if (type === 'normal serum osmolarity gap') {
            if (measuredSerumOsm) {
                const serumOsmGap = measuredSerumOsm - serumOsm
                return (serumOsmGap / serumOsmGapSelectValue).toFixed(this.state.decimal)
            } else {
                return 0
            }
        }
    }

    handleSerumOsmSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.serumOsm, value)
        this.setState({ serumOsmSelectUnit: value, serumOsmSelectValue: selectValue })
    }

    handleserumOsmGapSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.serumOsmGap, value)
        this.setState({
            serumOsmGapSelectUnit: value,
            serumOsmGapSelectValue: selectValue
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
        let naValue = null
        let naUnitValue = null
        let bunValue = null
        let bunUnitValue = null
        let glucoseValue = null
        let glucoseUnitValue = null
        let ethanolValue = null
        let ethanolUnitValue = null
        let measuredSerumOsmValue = null
        let measuredSerumOsmUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    naValue = input
                    naUnitValue = filterUnit(unitData.na, select)
                }
                if (index === 1) {
                    bunValue = input
                    bunUnitValue = filterUnit(unitData.bun, select)
                }
                if (index === 2) {
                    glucoseValue = input
                    glucoseUnitValue = filterUnit(unitData.glucose, select)
                }
                if (index === 3) {
                    ethanolValue = input
                    ethanolUnitValue = filterUnit(unitData.ethanol, select)
                }
                if (index === 4) {
                    measuredSerumOsmValue = input
                    measuredSerumOsmUnitValue = filterUnit(unitData.measuredSerumOsm, select)
                }
            }
            return calculate
        })

        if (naValue && bunValue && glucoseValue && ethanolValue && measuredSerumOsmValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='Normal Serum Osmolarity'
                        value={this.handleFormulaCalc(
                            'serum osmolarity',
                            naValue * naUnitValue,
                            bunValue * bunUnitValue,
                            glucoseValue * glucoseUnitValue,
                            ethanolValue * ethanolUnitValue,
                            measuredSerumOsmValue * measuredSerumOsmUnitValue,
                            this.state.serumOsmSelectValue
                        )}
                        selectValue={this.state.serumOsmSelectUnit}
                        selectOnChange={this.handleSerumOsmSelectChange}
                    >
                        {unitData.serumOsm.map(option => (
                            <MenuItem key={option.unit} value={option.unit}>
                                {option.unit}
                            </MenuItem>
                        ))}
                    </ResultCardFormulaValueSelectFragment>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='Normal Serum Osmolarity Gap'
                        value={this.handleFormulaCalc(
                            'normal serum osmolarity gap',
                            naValue * naUnitValue,
                            bunValue * bunUnitValue,
                            glucoseValue * glucoseUnitValue,
                            ethanolValue * ethanolUnitValue,
                            measuredSerumOsmValue * measuredSerumOsmUnitValue,
                            this.state.serumOsmSelectValue,
                            this.state.serumOsmGapSelectValue
                        )}
                        selectValue={this.state.serumOsmGapSelectUnit}
                        selectOnChange={this.handleCorrectedAnionGapSelectChange}
                    >
                        {unitData.serumOsmGap.map(option => (
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
    "id": "serum-osmolarity-calculator",
    "title": "Serum Osmolarity Calculator",
    "type": "formula",
    "questions": [
        {
            "group": "Na",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Norm: 136-145",
                    "values": ["mmol/L", "mEq/L"]
                }
            ]
        },
        {
            "group": "BUN",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Value",
                    "values": ["mmol/L", "mg/dL"]
                }
            ]
        },
        {
            "group": "Glucose",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Value",
                    "values": ["mmol/L", "mg/dL"]
                }
            ]
        },
        {
            "group": "Ethanol",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Value",
                    "values": ["mmol/L", "mg/dL"]
                }
            ]
        },
        {
            "group": "Measured Serum Osmolarity",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Value",
                    "values": ["mmol/kg", "mOsm/kg"]
                }
            ]
        }
    ],
    "results": {},
    "notes": {
        "type": "unordered-list",
        "content": [
            "This calculator is used to calculate the expected serum osmolarity for comparison to measured osmolarity",
            "Normal serum osmolarity is 285-295 mOsm/kg",
            "Normal serum osmolarity gap is -14 to +10"
        ]
    },
    "references": {
        "type": "ordered-list",
        "content": [
            "Roy Purssell, Morris Pudek, Jeffrey Brubacher, Riyad B. Abu-Laban, Derivation and validation of a formula to calculate the contribution of ethanol to the osmolal gap, Annals of Emergency Medicine, Volume 38, Issue 6, December 2001, Pages 653-659"
        ]
    },
    "formula": {
        "type": "unordered-list",
        "content": [
            "Serum Osmolarity = (2 * (Na) + (BUN / 2.8) + (glucose / 18) + Ethanol/3.7",
            "Normal Serum Osm Gap = Measured Serum Osm - Serum Osm"
        ]
    }
}
