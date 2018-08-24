import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import { ResultCardFormulaValueFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

class FormulaComponent extends Component {
    state = {
        apacheIISelectUnit: 'points',
        apacheIISelectValue: 1
    }

    handleCalc = (
        sex,
        rxHTN,
        rxSteroids,
        age,
        bmi,
        fmh,
        smoker
    ) => {
        //Terms = 6.322 - Sex - RxHTN - RxSteroids - (0.063 * Age) - BMI - FMH - Smoker
        //Risk = 100 / (1 + e(Terms))
        let terms
        let risk

        terms = 6.322 - sex - rxHTN - rxSteroids - (0.063 * age) - bmi - fmh - smoker  
        risk = 100 / (1 + Math.pow(Math.E, terms)) 
        return [risk.toFixed(2), terms.toFixed(2)];
    }

    handleResults = results => {
        let ret = []
        ret[1] = 'Terms: ' + results[1]
        return ret
    };

    render () {
        const { classes, data } = this.props
        const { questions } = data

        // extract needed field vars
        let sex = null
        let rxHTN = null
        let rxSteroids = null
        let age = null
        let bmi = null
        let fmh = null
        let smoker = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const {input, select} = calculate
                if (index === 0) {
                    sex = calculate["points"]
                }
                if (index === 1) {
                    rxHTN = calculate["points"]
                }
                if (index === 2) {
                    rxSteroids = calculate["points"]
                }
                if (index === 3) {
                    age = input
                }
                if (index === 4) {
                    bmi = calculate["points"]
                }
                if (index === 5) {
                    fmh = calculate["points"]
                }
                if (index === 6) {
                    smoker = calculate["points"]
                }
            }
            return calculate
        })

        if (sex !== null && rxHTN !== null && rxSteroids !== null && age !== null && bmi !== null && fmh !== null && smoker !== null) {
            const results = this.handleCalc(
                sex,
                rxHTN,
                rxSteroids,
                age,
                bmi,
                fmh,
                smoker
            );
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption="Risk"
                        values={[results[0] + '%']}
                    />
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption=""
                        values={[this.handleResults(results)]}
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
    "id": "diabetes_risk_score_t2",
    "title": "Diabetes Risk Score (T2)",
    "type": "formula",
    "questions": [
        {
            "group": "Sex",
            "data": [
                {
                    "type": "radio",
                    "options": "Female | Male",
                    "points": "-0.879/0"
                }
            ]
        },
        {
            "group": "Rx HTN",
            "data": [
                {
                    "type": "radio",
                    "options": "On HTN meds | No HTN meds",
                    "points": "1.222/0"
                }
            ]
        },
        {
            "group": "Rx Steroids",
            "data": [
                {
                    "type": "radio",
                    "options": "On steroids | Not on steroids",
                    "points": "2.191/0"
                }
            ]
        },
        {
            "group": "Age",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Age",
                    "values": ["years"]
                }
            ]
        },
        {
            "group": "BMI",
            "data": [
                {
                    "type": "radio",
                    "options": "Body Mass Index < 25 | Body Mass Index 25 - 27.49 | Body Mass Index 27.5 - 29.99 | Body Mass Index >= 30",
                    "points": "0/0.699/1.97/2.518"
                }
            ]
        },
        {
            "group": "FMH",
            "data": [
                {
                    "type": "radio",
                    "options": "No 1st degree family members with diabete | Parent OR sib with DM | Parent AND sib with DM",
                    "points": "0/0.728/0.753"
                }
            ]
        },
        {
            "group": "Smoker",
            "data": [
                {
                    "type": "radio",
                    "options": "Patient is a non smoker | Patient used to smoke | Patient is a smoker",
                    "points": "0/-0.218/0.855"
                }
            ]
        }
    ],
    "results": {},
    "notes": {
        "type": "unordered-list",
        "content": [
            "Equation parameters such as Sex have two or more discrete values that may be used in the calculation. The numbers in the parentheses, e.g. (-0.879), represent the values that will be used."
        ]
    },
    "references": {
        "type": "ordered-list",
        "content": [
            "Griffin SJ, Little PS, Hales CN, et al. Diabetes risk score: towards earlier detection of Type 2 diabetes in general practice. Diabet Metab Res Rev. 2000; 16: 164-71."
        ]
    },
    "formula": {
        "type": "unordered-list",
        "content": [
            "Terms = 6.322 - Sex - RxHTN - RxSteroids - (0.063 * Age) - BMI - FMH - Smoker",
            "Risk = 100 / (1 + e^(Terms))"
        ]
    }
}