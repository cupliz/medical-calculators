import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from '@material-ui/core/MenuItem';
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    age: [
        { value: 1, unit: 'yrs' },
        { value: 0.0833334, unit: 'mos' }
    ],
    serumCr: [
        { value: 1, unit: 'mg/dL' },
        { value: 0.011312217194570135, unit: 'µmol/L'}
    ],
    eGfr: [
        { value: 1, unit:'mL/min/1.73 m²'}
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        eGfrSelectUnit: 'mL/min/1.73 m²',
        eGfrSelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        gender,
        black,
        age,
        serumCr,
        selectValue,
    ) => {
        // CKD-EPI GFR = 141 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^-1.209 × 0.993^Age × 1.018 [if female] _ 1.159 [if black]
        // if male, α = -0.411, κ = 0.9
        // if female, α = -0.329, κ = 0.7
        let kap, alpha
        if (gender === 1.018) {
            alpha = -0.329
            kap = 0.7
            //assign α = -0.329, κ = 0.7
        } else {
            alpha = -0.411
            kap = 0.9
            // male, α = -0.411, κ = 0.9
        }
        const eGfr = 141 * Math.pow(Math.min(serumCr/kap,1),alpha) * Math.pow(Math.max(serumCr/kap,1),-1.209) * Math.pow(0.993, age) * black * gender
        return (eGfr / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.eGfr, value)
        this.setState({ eGfrSelectUnit: value, eGfrSelectValue: selectValue })
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
        let blackValue = null
        let ageValue = null
        let ageUnitValue = null
        let serumCrValue = null
        let serumCrUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                if (index === 0) {
                    genderValue = calculate["points"]
                }
                if (index ===1) {
                    blackValue = calculate["points"]
                }
                else {
                    const { input, select } = calculate
                    if (index === 2) {
                        ageValue = input
                        ageUnitValue = filterUnit(unitData.age, select)
                    }
                    if (index === 3) {
                        serumCrValue = input
                        serumCrUnitValue = filterUnit(unitData.serumCr, select)
                    }
                }
            }
            return calculate
        })

        if (genderValue && blackValue && ageValue && serumCrValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='Estimated GFR'
                        value={this.handleCalc(
                            genderValue,
                            blackValue,
                            ageValue * ageUnitValue,
                            serumCrValue * serumCrUnitValue,
                            this.state.eGfrSelectValue
                        )}
                        selectValue={this.state.eGfrSelectUnit}
                        selectOnChange={this.handleSelectChange}
                    >
                        {unitData.eGfr.map(option => (
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
    "id": "ckd-epi-gfr-equation",
    "title": "CKD-EPI GFR Equation",
    "type": "formula",
    "questions": [
        {
            "group": "Gender",
            "data": [
                {
                    "type": "radio",
                    "options": "Male | Female",
                    "points": "1/1.018"
                }
            ]
        },
        {
            "group": "Black race",
            "data": [
                {
                    "type": "radio",
                    "options": "No | Yes",
                    "points": "1/1.159"
                }
            ]
        },
        {
            "group": "Age",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Age",
                    "values": ["yrs", "mos"]
                }
            ]
        },
        {
            "group": "Serum Creatinine",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Serum Creatinine",
                    "values": ["mg/dL", "µmol/L"]
                }
            ]
        }
    ],
    "results": {},
    "notes": {
        "type": "unordered-list",
        "content": [
            "This calculator estimates glomerular filtration rate (GFR) using an equation developed by the Chronic Kidney Disease Epidemiology (CKD-EPI) Collaboration.",
            "It was developed by Levy et al. in 2009, using GFR measurements from 8254 participants"
        ]
    },
    "references": {
        "type": "ordered-list",
        "content": [
            "Levey AS, Stevens LA, Schmid CH, et al. for the CKD-EPI (Chronic Kidney Disease Epidemiology Collaboration). A New Equation to Estimate Glomerular Filtration Rate. Ann Intern Med 2009; 150:604."
        ]
    },
    "formula": {
        "type": "unordered-list",
        "content": [
            "GFR =  141 x min(sCr/κ, 1)^α x max(sCr/κ, 1)^-1.209 x 0.993^Age x 1.018 (if female) x 1.159 (if patient is black)",
            "GFR units are mL/min/1.73m². Serum creatinine (sCr) units are in mg/dL, Age is in years.",
            "For females: α = -0.329; κ = 0.7. For males: α = -0.411; κ = 0.9."
        ]
    }
}
