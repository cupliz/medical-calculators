import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import Decimal from '../../components/Decimal/Decimal'
import {ResultCardFormulaValueFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    age: [
        { value: 1, unit: 'yrs' },
        { value: 0.0833334, unit: 'mths' }
    ],
    serumCr: [
        { value: 1, unit: 'mg/dL' },
        { value: 0.011312217194570135, unit: 'µmol/L'}
    ],
    eGfr: [
        { value: 1, unit:'mL/min/1.73 m²'}
    ],
    weight: [
        { value: 1, unit: 'kg' },
        { value: 0.453592, unit: 'lb' }
    ],
    creatClear: [
        { value: 1, unit: 'mL/min' }
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
    // if calcChoice === 1: do CKD-EPI, elif calcChoice === 2: do MDRD, else: do cockcroft-gault
    handleCalcCKDEPI = (
        gender,
        black,
        age,
        serumCr,
        selectValue
    ) => {
        // CKD-EPI GFR = 141 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^-1.209 × 0.993^Age × 1.018 [if female] _ 1.159 [if black]
        // if male, α = -0.411, κ = 0.9
        // if female, α = -0.329, κ = 0.7
        let kap, alpha, sex
        if (gender === 2) {
            alpha = -0.329
            kap = 0.7
            sex = 1.018
            //assign α = -0.329, κ = 0.7
        } else {
            alpha = -0.411
            kap = 0.9
            sex = 1
            // male, α = -0.411, κ = 0.9
        }

        let race
        if (black === 2) {
            race = 1.159
        } else {
            race = 1
        }
        const eGfr = 141 * Math.pow(Math.min(serumCr/kap,1),alpha) * Math.pow(Math.max(serumCr/kap,1),-1.209) * Math.pow(0.993, age) * race * sex
        return (eGfr).toFixed(this.state.decimal) + " mL/min/1.73 m²"
    }

    handleCalcMDRD = (
        gender,
        black,
        age,
        serumCr,
        selectValue
    ) => {

        let sex
        if (gender === 2) {
            sex = 0.742
        } else {
            sex = 1
        }

        let race
        if (black === 2) {
            race = 1.212
        } else {
            race = 1
        }
        // GFR = 175 × Serum Cr-1.154 × age-0.203 × 1.212 (if patient is black) × 0.742 (if female)
        const eGfr = 175 * Math.pow(serumCr,-1.154) * Math.pow(age,-0.203) * race * sex
        return (eGfr).toFixed(this.state.decimal) + " mL/min/1.73 m²"
    }

    handleCalcCG = (
        gender,
        age,
        serumCr,
        weight,
        selectValue
    ) => {
        // CreatClear = Sex * ((140 - Age) / (SerumCreat)) * (Weight / 72)
        // console.log("gender " + gender)
        // console.log(age)
        // console.log(serumCreatinine)
        // console.log(weight)
        let sex
        if (gender === 2) {
            sex = 0.85
        } else {
            sex = 1
        }

        const creatClear = sex * ((140-age) / (serumCr)) * (weight / 72)
        // console.log(creatClear)
        return (creatClear).toFixed(this.state.decimal) + " mL/min"
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
        let calcChoice = null
        let genderValue = null
        let blackValue = null
        let ageValue = null
        let ageUnitValue = null
        let serumCrValue = null
        let serumCrUnitValue = null
        let weightValue = null
        let weightUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                if (index === 0) {
                    calcChoice = calculate["points"]
                }
                if (index === 1) {
                    genderValue = calculate["points"]
                }
                if (index ===2) {
                    blackValue = calculate["points"]
                }
                else {
                    const { input, select } = calculate
                    if (index === 3) {
                        ageValue = input
                        ageUnitValue = filterUnit(unitData.age, select)
                    }
                    if (index === 4) {
                        serumCrValue = input
                        serumCrUnitValue = filterUnit(unitData.serumCr, select)
                    }
                    if (index === 5) {
                        weightValue = input
                        weightUnitValue = filterUnit(unitData.weight, select)
                    }
                }
            }
            return calculate
        })

        if (genderValue && blackValue && ageValue && serumCrValue && calcChoice === 1) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption='Estimated GFR'
                        values={[this.handleCalcCKDEPI(
                            genderValue,
                            blackValue,
                            ageValue * ageUnitValue,
                            serumCrValue * serumCrUnitValue,
                            this.state.eGfrSelectValue,
                            calcChoice
                        )]}
                    />
                    <Decimal
                        classes={classes}
                        decimal={this.state.decimal}
                        onDecimalChange={this.handleDecimalChange}
                    />
                </ResultCardHeader>
            )
        } else if (genderValue && blackValue && ageValue && serumCrValue && calcChoice === 2) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption='Estimated GFR'
                        values={[this.handleCalcMDRD(
                            genderValue,
                            blackValue,
                            ageValue * ageUnitValue,
                            serumCrValue * serumCrUnitValue,
                            this.state.eGfrSelectValue
                        )]}
                    />
                    <Decimal
                        classes={classes}
                        decimal={this.state.decimal}
                        onDecimalChange={this.handleDecimalChange}
                    />
                </ResultCardHeader>
            )
        } else if (genderValue && ageValue && serumCrValue && calcChoice === 3 && weightValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption='Estimated CrCl'
                        values={[this.handleCalcCG(
                            genderValue,
                            ageValue * ageUnitValue,
                            serumCrValue * serumCrUnitValue,
                            weightValue * weightUnitValue,
                            this.state.creatClearSelectValue
                        )]}
                    />
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
    "id": "renal_function_calculators_combined",
    "title": "Renal Function Calculators (CKD-EPI, MDRD, Cockcroft-Gault)",
    "type": "formula",
    "questions": [
        {
            "group": "Choose Equation to Estimate Renal Function",
            "data": [
                {
                    "type": "radio",
                    "options": "CKD-EPI for GFR | MDRD for GFR | Cockcroft-Gault for CrCl",
                    "points": "1/2/3"
                }
            ], "showPoints": false
        },
        {
            "group": "Sex",
            "data": [
                {
                    "type": "radio",
                    "options": "Male | Female",
                    "points": "1/2"
                }
            ], "showPoints": false
        },
        {
            "group": "Black Race (for CKD-EPI and MDRD)",
            "data": [
                {
                    "type": "radio",
                    "options": "No | Yes",
                    "points": "1/2"
                }
            ], "showPoints": false
        },
        {
            "group": "Age",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Age",
                    "values": ["yrs", "mths"]
                }
            ]
        },
        {
            "group": "Serum Creatinine",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Serum Creatinine Value",
                    "values": ["mg/dL", "µmol/L"]
                }
            ]
        },
        {
            "group": "Weight (for Cockcroft-Gault)",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Lean Body Weight",
                    "values": ["kg","lb"]
                }
            ]
        }
    ],
    "results": {},
    "notes": {
        "type": "unordered-list",
        "content": [
            "This calculator provides an estimate of glomerular filtration rate (GFR) or creatinine clearance (CrCl) based on serum creatinine (sCr) and patient characteristics.",
            "The CKD-EPI and the MDRD equations are used to estimate GFR. For these calculations, the weight value is not necessary.",
            "The Cockcroft-Gault equation is used to estimate CrCl. For this calculation, the race value is not necessary.",
            "Clinical discretion is required when selecting the appropriate calculator for these estimates."
        ]
    },
    "references": {
        "type": "ordered-list",
        "content": [
            "Levey AS, Stevens LA, Schmid CH, et al. for the CKD-EPI (Chronic Kidney Disease Epidemiology Collaboration). A New Equation to Estimate Glomerular Filtration Rate. Ann Intern Med 2009; 150:604.",
            "Stevens LA, Manzi J, Levey AS, et al. Impact of creatinine calibration on performance of GFR estimating equations in a pooled individual patient database. Am J Kidney Dis. Jul 2007;50(1):21-35.",
            "Levey AS, Coresh J, Greene T, et al. Using standardized serum creatinine values in the modification of diet in renal disease study equation for estimating glomerular filtration rate. Ann Intern Med. 2006;145(4):247-254.",
            "Levey AS, Coresh J, Greene T, et al. Expressing the Modification of Diet in Renal Disease Study equation for estimating glomerular filtration rate with standardized serum creatinine values. Clin Chem. Apr 2007;53(4):766-772.",
            "Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron. 1976;16(1):31-41."
        ]
    },
    "formula": {
        "type": "unordered-list",
        "content": [
            "CKD-EPI equation: GFR =  141 x min(sCr/κ, 1)^α x max(sCr/κ, 1)^-1.209 x 0.993^Age x 1.018 (if female) x 1.159 (if patient is black). The values of constants α and κ vary depending on sex.",
            "MDRD Equation: GFR = 175 × sCr^-1.154 × age^-0.203 × 1.212 (if patient is black) × 0.742 (if female). It is presumed that an IDMS creatinine assay is used.",
            "Cockcroft-Gault Equation: CrCl = Sex ⨉ ((140-Age)/(sCr))⨉(Weight/72).",
            "GFR in mL/min/1.73m². CrCl in ml/min. sCr in mg/dL. Age in years."
        ]
    }
}
