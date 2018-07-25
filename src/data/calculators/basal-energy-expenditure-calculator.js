import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import { ResultCardFormulaValueFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    height: [
        { value: 1, unit: 'cm' },
        { value: 2.54, unit: 'in' }
    ],
    weight: [
        { value: 1, unit: 'kg' },
        { value: 0.45359237, unit: 'lbs' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {

    handleCalc = (
        sexValue,
        weightValue,
        heightValue,
        ageValue,
        activityLevelValue
    ) => {
        // BEE, kcal/day (female) = 655.1 + (9.563 × weight, kg) + (1.850 × height, cm) - (4.676 × age)
        // BEE, kcal/day (male) = 66.5 + (13.75 × weight, kg) + (5.003 × height, cm) - (6.775 × age)
        // Harris-Benedict adjustment:
        // Sedentary (little to no exercise) = BEE × 1.2
        // Light exercise (1-3 days per week) = BEE × 1.375
        // Moderate exercise (3–5 days per week) = BEE × 1.55
        // Heavy exercise (6–7 days per week) = BEE × 1.725
        // Very heavy exercise (twice per day, extra heavy workouts) = BEE × 1.9

        let bee
        let hba
        
        if (sexValue === 0){
            bee = 655.1 + (9.563 * weightValue) + (1.850 * heightValue) - (4.676 * ageValue)
        }else if(sexValue === 1){
            bee = 66.5 + (13.75 * weightValue) + (5.003 * heightValue) - (6.775 * ageValue)
        }

        if (activityLevelValue === 0){
            hba = bee * 1.2
        }else if (activityLevelValue === 1){
            hba = bee * 1.375
        }else if (activityLevelValue === 2){
            hba = bee * 1.55
        }else if (activityLevelValue === 3){
            hba = bee * 1.725
        }else if (activityLevelValue === 4){
            hba = bee * 1.9
        }
        // convert to Kilojoules (kJ) as in source calculator
        bee = Math.round(bee * 4.184)
        hba = Math.round(hba * 4.184)

        return [bee, hba];
    }

    handleResults = results => {
        let ret = []
        ret[0] = `Basal Energy Expenditure: ${results[0]} kJ/day`
        ret[1] = `Harris-Benedict Recommended Caloric Intake: ${results[1]} kJ/day`
        return ret
    };

    render () {
        const { classes, data } = this.props
        const { questions } = data

        // extract needed field vars
        let sexValue = null
        let weightValue = null
        let weightUnitValue = null
        let heightValue = null
        let heightUnitValue = null
        let ageValue = null
        let activityLevelValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const {input, select} = calculate
                if (index === 0) {
                    sexValue = calculate["points"]
                }
                if (index === 1) {
                    weightValue = input
                    weightUnitValue = filterUnit(unitData.weight, select)
                }
                if (index === 2) {
                    heightValue = input
                    heightUnitValue = filterUnit(unitData.height, select)
                }
                if (index === 3) {
                    ageValue = input
                }
                if (index === 4) {
                    activityLevelValue = calculate["points"]
                }
                
            }
            return calculate
        })

        if (sexValue !== null && weightValue && heightValue && ageValue) {
            const results = this.handleCalc(
                sexValue,
                weightValue * weightUnitValue,
                heightValue * heightUnitValue,
                ageValue,
                activityLevelValue
            );
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption="Basal Energy Expenditure"
                        values={[results[0]+' kJ/day']}
                    />
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption=""
                        values={this.handleResults(results)}
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
    "id": "basal-energy-expenditure-calculator",
    "title": "Basal Energy Expenditure",
    "type": "formula",
    "questions": [
        {
            "group": "Sex",
            "data": [
                {
                    "type": "radio",
                    "options": "Female | Male",
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
                    "values": ["kg", "lbs"]
                }
            ]
        },        {
            "group": "Height",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Height",
                    "values": ["cm", "in"]
                }
            ]
        },        {
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
            "group": "Activity level",
            "data": [
                {
                    "type": "radio",
                    "options": "Sedentary (little to no exercise) | Light exercise (1-3 days per week) |  Moderate exercise (3–5 days per week) | Heavy exercise (6–7 days per week) | Very heavy exercise (twice per day, extra heavy workouts)",
                    "points": "0/1/2/3/4"
                }
            ]
        }
    ],
    "results": {},
    "notes": {
        "type": "paragraph",
        "content": [
            "The Basal Energy Expenditure must be multiplied by activity and stress factors to calculate total caloric requirement."
        ]
    },
    "references": {
        "type": "ordered-list",
        "content": [
            "Harris J, Benedict F. A biometric study of basal metabolism in man. Washington D.C. Carnegie Institute of Washington. 1919."
        ]
    },
    "formula": {
        "type": "unordered-list",
        "content": [
            "BEE, kcal/day (male) = 66.5 + (13.75 × weight, kg) + (5.003 × height, cm) - (6.775 × age)",
            "BEE, kcal/day (female) = 655.1 + (9.563 × weight, kg) + (1.850 × height, cm) - (4.676 × age)",
            "Sedentary (little to no exercise) = BEE × 1.2",
            "Light exercise (1-3 days per week) = BEE × 1.375",
            "Moderate exercise (3–5 days per week) = BEE × 1.55",
            "Heavy exercise (6–7 days per week) = BEE × 1.725",
            "Very heavy exercise (twice per day, extra heavy workouts) = BEE × 1.9"

        ]
    }
}