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
        selectValue
    ) => {
        // GFR = 175 × Serum Cr-1.154 × age-0.203 × 1.212 (if patient is black) × 0.742 (if female)
        const eGfr = 175 * Math.pow(serumCr,-1.154) * Math.pow(age,-0.203) * black * gender
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
    "id": "mdrd-gfr-equation",
    "title": "MDRD GFR Equation",
    "type": "formula",
    "questions": [
        {
            "group": "Gender",
            "data": [
                {
                    "type": "radio",
                    "options": "Male | Female",
                    "points": "1/0.742"
                }
            ]
        },
        {
            "group": "Black race",
            "data": [
                {
                    "type": "radio",
                    "options": "No | Yes",
                    "points": "1/1.212"
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
            "This calculator provides an estimate of glomerular filtration rate based on creatinine and patient characteristics",
            "Only for chronic kidney disease (CKD), not accurate for acute renal failure",
            "Studies show that the MDRD is more accurate than creatinine clearance measured from 24-hr urine collections or estimated by the Cockcroft-Gault formula.",
            "Was re-expressed in 2005 for use with a standardized serum creatinine assay which yields 5% percent lower values for serum creatinine concentration.\n"
        ]
    },
    "references": {
        "type": "ordered-list",
        "content": [
            "Stevens LA, Manzi J, Levey AS, et al. Impact of creatinine calibration on performance of GFR estimating equations in a pooled individual patient database. Am J Kidney Dis. Jul 2007;50(1):21-35.",
            "Levey AS, Coresh J, Greene T, et al. Using standardized serum creatinine values in the modification of diet in renal disease study equation for estimating glomerular filtration rate. Ann Intern Med. 2006;145(4):247-254.",
            "Levey AS, Coresh J, Greene T, et al. Expressing the Modification of Diet in Renal Disease Study equation for estimating glomerular filtration rate with standardized serum creatinine values. Clin Chem. Apr 2007;53(4):766-772."
        ]
    },
    "formula": {
        "type": "paragraph",
        "content": [
            "GFR = 175 × Serum Cr^-1.154 × age^-0.203 × 1.212 (if patient is black) × 0.742 (if female)",
            "GFR units are mL/min/1.73m²",
            "Creatinine units are in mg/dL",
            "Age is in years"
        ]
    }
}
