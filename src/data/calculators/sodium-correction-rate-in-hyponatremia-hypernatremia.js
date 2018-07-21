import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import { ResultCardFormulaValueFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    weight: [
        { value: 1, unit: 'kg' }, 
        { value: 0.45359237, unit: 'lbs' }
    ],
    serumSodium: [
        { value: 1, unit: 'mmol/L' },
        { value: 1, unit: 'mEq/L' }
    ],
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {

    handleCalc = (
        sex,
        age,
        weight,
        serumSodium,
        fluidSodium
    ) => {
        // apacheII =  Sum of all the points https://www.mdcalc.com/apache-ii-score#evidence
        // GCS points = GCS Score - 15
        let goalNa 
        let tbWater
        let changeNa
        let ivfRate
        let rateNa = 1

        if ((serumSodium > 136 && rateNa > 0) || (serumSodium < 136 && rateNa < 0)) {rateNa = -rateNa;}

        if (sex === 0){
            //female
            if (age === 0){ tbWater = weight * 0.6  }
            if (age === 1){ tbWater = weight * 0.5  }
            if (age === 2){ tbWater = weight * 0.45 }
        }else if (sex === 1) {
            //male
            if (age === 0){ tbWater = weight * 0.6 }
            if (age === 1){ tbWater = weight * 0.6 }
            if (age === 2){ tbWater = weight * 0.5 }
        }

        if (serumSodium >= 142) {
            goalNa = serumSodium - 10;
            if (goalNa < 140) {goalNa = 140}
        } else if (serumSodium <= 136) {
            goalNa = serumSodium + 10;
            if (goalNa > 142) {goalNa = 140}
        } else {goalNa = 140}

        changeNa = (fluidSodium - serumSodium) / (tbWater + 1);
        console.log('goalNa');
        console.log(goalNa);
        console.log('serumSodium');
        console.log(serumSodium);
        console.log('changeNa');
        console.log(changeNa);
        ivfRate = Math.round((goalNa - serumSodium) * 1000 / (changeNa * (goalNa - serumSodium) * rateNa));
        return [ivfRate, rateNa];
    }

    handleResults = (
        results,
        fluidSodium
    ) => {
        
        let ret = []
        let strWith
        if (fluidSodium === 130){
            strWith = 'LR'
        }else if(fluidSodium === 77){
            strWith = '1/2 NS'
        }else if(fluidSodium === 34){
            strWith = '0.2 NS'
        }else if(fluidSodium === 0 ){
            strWith = 'D5W'
        }else if(fluidSodium === 513){
            strWith = '3% saline'
        }else if(fluidSodium === 154){
            strWith = 'NS'
        }

        if(results[1] > 0){
            ret[0] = results[0] * 0.5 + ' ml/hr Fluid rate to increase Na by 0.5 mmol/L/hr with ' + strWith 
            ret[1] = results[0] * 1.0 + ' ml/hr Fluid rate to increase Na by 1.0 mmol/L/hr with ' + strWith 
            ret[2] = results[0] * 2.0 + ' ml/hr Fluid rate to increase Na by 2.0 mmol/L/hr with ' + strWith 
        }else{
            ret[0] = results[0] * 0.5 + ' ml/hr Fluid rate to decrease Na by 0.5 mmol/L/hr with ' + strWith 
            ret[1] = results[0] * 1.0 + ' ml/hr Fluid rate to decrease Na by 1.0 mmol/L/hr with ' + strWith 
            ret[2] = results[0] * 2.0 + ' ml/hr Fluid rate to decrease Na by 2.0 mmol/L/hr with ' + strWith 
        }

        return ret
    };

    render () {
        const { classes, data } = this.props
        const { questions } = data

        // extract needed field vars
        let sex = null
        let age = null
        let fluidSodium
        let weightValue = null
        let weightUnitValue = null
        let serumSodiumValue = null
        let serumSodiumUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const {input, select} = calculate
                if (index === 0) {
                    sex = calculate["points"]
                }
                if (index === 1) {
                    age = calculate["points"]
                }
                if (index === 2) {
                    weightValue = input
                    weightUnitValue = filterUnit(unitData.weight, select)
                }
                if (index === 3) {
                    serumSodiumValue = input
                    serumSodiumUnitValue = filterUnit(unitData.serumSodium, select)
                }
                if (index === 4) {
                    fluidSodium = calculate["points"]
                }
            }
            return calculate
        })

        if (sex !== null && age !==null && fluidSodium && weightValue && serumSodiumValue !== null) {
            const results = this.handleCalc(
                sex,
                age,
                weightValue * weightUnitValue,
                serumSodiumValue * serumSodiumUnitValue,
                fluidSodium
            );
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption="Fluid rate"
                        values={[results[0] + 'ml/hr']}
                    />
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption=""
                        values={this.handleResults(results, fluidSodium)}
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
    "id": "serumSodium-correction-rate-in-hyponatremia-hypernatremia",
    "title": "Sodium Correction Rate in Hyponatremia/Hypernatremia",
    "type": "formula",
    "questions": [
        {
            "group": "sex",
            "data": [
                {
                    "type": "radio",
                    "options": "Female | Male",
                    "points": "0/1"
                }
            ]
        },
        {
            "group": "Age range",
            "data": [
                {
                    "type": "radio",
                    "options": "Child | Adult | Elderly",
                    "points": "0/1/2"
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
        },
        {
            "group": "Sodium",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Sodium",
                    "values": ["mmol/L", "mEq/L"]
                }
            ]
        },
        {
            "group": "Fluid type",
            "data": [
                {
                    "type": "radio",
                    "options": "Lactated Ringer's (130 mmol/L Na) | 1/2 Normal saline (77 mmol/L Na) |  0.2 Normal saline (34 mmol/L Na) | 5% Dextrose in water (0 mmol/L Na) | 3% saline (513 mmol/L Na) | Normal saline (154 mmol/L Na)",
                    "points": "130/77/34/0/513/154"
                }
            ]
        }
    ],
    "results": {},
    "notes": {
        "type": "unordered-list",
        "content": [
            "Experts recommend correcting no faster than 12 mmol/L/day (0.5mmol/L/hr) to avoid central pontine myelinolysis (first calculation), and only correcting it faster — and only using hypertonic (3%) saline — if the patient is seriously symptomatic at a rate of 1-2 mmol/L/hr (second/third calculations), and even then, only correcting it at 1-2 mmol/L/hr.",
        ]
    },
    "references": {
        "type": "ordered-list",
        "content": [
            "Adrogué HJ, Madias NE. Hyponatremia. NEJM, 2000."
        ]
    },
    "formula": {
        "type": "unordered-list",
        "content": [
            "Change in Serum Sodium = (Fluid Sodium - Serum Sodium) / (Total Body Water + 1)",
            "Total Body Water = (Wt in kg * % Water)"
        ]
    }
}