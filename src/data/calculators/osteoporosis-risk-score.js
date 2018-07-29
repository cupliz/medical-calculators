import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import { ResultCardFormulaValueFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    age: [
        { value: 1, unit: 'yr' },
        { value: 1 / 12, unit: 'mo' }
    ],
    weight: [
        { value: 1, unit: 'lb' },
        { value: 2.20462, unit: 'kg' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {

    handleCalc = (
        raceValue,
        rheumArthValue,
        fractureHxValue,
        ageValue,
        estrogenValue,
        weightValue,
    ) => {
        // SCORE = Race + RheumArth + FractureHx + Estrogen + (3 * Age / 10) - (Weight / 10)
        let score
        score = raceValue + rheumArthValue + fractureHxValue + estrogenValue + Math.round((3 * ageValue / 10)) - Math.round((weightValue / 10))
        if (score < 0){
            score = 0
        }
        return score;
    }

    handleResults = results => {
        let res
        if(results >= 0 && results <= 6){
            res = `0-6 Points:   Low Risk`

        }
        if(results >= 7 && results <=15){
            res = `7-15 Points:  Moderate Risk`

        }
        if(results >= 16 && results <= 50){
            res = `16-50 Points: High Risk`

        }

        return(res)
    };

    render () {
        const { classes, data } = this.props
        const { questions } = data

        // extract needed field vars
        let raceValue = null
        let rheumArthValue = null
        let fractureHxValue = null
        let ageValue = null
        let ageUnitValue = null
        let estrogenValue = null
        let weightValue = null
        let weightUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const {input, select} = calculate
                if (index === 0) {
                    raceValue = calculate["points"]
                }
                if (index === 1) {
                    rheumArthValue = calculate["points"]
                }
                if (index === 2) {
                    fractureHxValue = calculate["points"]
                }
                if (index === 3) {
                    ageValue = input
                    ageUnitValue = filterUnit(unitData.age, select)
                }
                if (index === 4) {
                    estrogenValue = calculate["points"]
                }
                if (index === 5) {
                    weightValue = input
                    weightUnitValue = filterUnit(unitData.weight, select)
                }
            }
            return calculate
        })

        if (raceValue !== null, rheumArthValue !== null, fractureHxValue !== null, ageValue, estrogenValue !== null, weightValue) {
            const results = this.handleCalc(
                raceValue,
                rheumArthValue,
                fractureHxValue,
                ageValue * ageUnitValue,
                estrogenValue,
                weightValue * weightUnitValue
            );
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption="Osteoporosis risk score"
                        values={[results + ' Point']}
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
    "id": "osteoporosis-risk-score",
    "title": "Osteoporosis risk score",
    "type": "formula",
    "questions": [
        {
            "group": "Race",
            "data": [
                {
                    "type": "radio",
                    "options": "Black | Non-Black",
                    "points": "0/5"
                }
            ]
        },
        {
            "group": "Rheum Arth",
            "data": [
                {
                    "type": "radio",
                    "options": "Present | Absent",
                    "points": "4/0"
                }
            ]
        },
        {
            "group": "Fracture Hx",
            "data": [
                {
                    "type": "radio",
                    "options": "No Nontraumatic Fractures | 1 Nontraumatic | 2 Nontraumatic | 3 or more Nontraumatic",
                    "points": "0/4/8/12"
                }
            ]
        },
        {
          "group": "Patient's Age",
          "data": [
            {
              "type": "input/select",
              "placeholder": "Enter Age",
              "values": ["yr", "mo"]
            }
          ]
        },
        {
            "group": "Estrogen",
            "data": [
                {
                    "type": "radio",
                    "options": "Prior use | NO prior use ",
                    "points": "0/1"
                }
            ]
        },
        {
          "group": "Weight",
          "data": [
            {
              "type": "input/select",
              "placeholder": "Enter Weight",
              "values": ["kg", "lb"]
            }
          ]
        }
    ],
    "results": {
        "0 - 6": ["Low Risk"],
        "7 - 15": ["Moderate Risk"],
        "16 - 50": ["High Risk"],
    },
    "notes": {
        "type": "unordered-list",
        "content": [
            "The nontraumatic fractures should be of spine, hip or wrist only.",
            "Equation parameters such as Race have two or more discrete values that may be used in the calculation. The numbers in the parentheses, e.g. (0), represent the values that will be used."
        ]
    },
    "references": {
        "type": "ordered-list",
        "content": [
            "Lydick E, Cook K, Turpin J, et. al. Development and validation of a simple questionnaire to facilitate identification of women likely to have low bone density. Am J Manag Care. 1998 Jan;4(1):37-48.",
            "Geusens P, Hochberg MC, van der Voort DJ, et. al. Performance of risk indices for identifying low bone density in postmenopausal women. Mayo Clin Proc. 2002 Jul;77(7):629-37."
        ]
    },
    "formula": {
        "type": "unordered-list",
        "content": [
            "SCORE = Race + RheumArth + FractureHx + Estrogen + (3 * Age / 10) - (Weight / 10)",
            "0-6 Points:    Low Risk",
            "7-15 Points:   Moderate Risk",
            "16-50 Points:  High Risk"
        ]
    }
}