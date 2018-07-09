import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import { ResultCardFormulaValueFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    history: [
        { value: 1, unit: '#' }
    ],
    age: [
        { value: 1, unit: 'years' }
    ],
    temp: [
        { value: 1, unit: 'deg C' },
        { value: -17.2222, unit: 'deg F' }
    ],
    meanArtP: [
        { value: 1, unit: 'mmHg' }
    ],
    pH: [
        { value: 1, unit: '#' }
    ],
    heartRate: [
        { value: 1, unit: 'beats/min' }
    ],
    respRate: [
        { value: 1, unit: 'breaths/min' }
    ],
    sodium: [
        { value: 1, unit: 'mmol/L' },
        { value: 1, unit: 'mEq/L' }
    ],
    potassium: [
        { value: 1, unit: 'mmol/L' },
        { value: 1, unit: 'mEq/L' }
    ],
    creatinine: [
        { value: 1, unit: 'mg/dL' },
        { value: 0.011312217194570135, unit: 'µmol/L' }
    ],
    hematocrit: [
        { value: 1, unit: '%' }
    ],
    wbc: [
        { value: 1, unit: '×10³/µL' },
        { value: 1, unit: '×10⁹/L' }
    ],
    gcs: [
        { value: 1, unit: '#' }
    ],
    aaGradOrPaO2: [
        { value: 1, unit: '#'}
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        apacheIISelectUnit: 'points',
        apacheIISelectValue: 1
    }

    handleCalc = (
        history,
        age,
        temp,
        meanArtP,
        pH,
        heartRate,
        respRate,
        sodium,
        potassium,
        raf,
        creatinine,
        hematocrit,
        wbc,
        gcs,
        aaGradOrPaO2,
        selectValue
    ) => {
        // apacheII =  Sum of all the points https://www.mdcalc.com/apache-ii-score#evidence
        // GCS points = GCS Score - 15
        const ageScore = age <= 44 ? 0 : age <= 54 ? 2 : age <= 64 ? 3 : age <= 74 ? 5 : 6
        const tempScore = temp < 30 ? 4 : temp <= 31.9 ? 3 : temp <= 33.9 ? 2 : temp <= 35.9 ? 1 : temp <= 38.4 ? 0 : temp <= 38.9 ? 1 : temp <= 40.9 ? 3 : 4
        const meanArtPScore = meanArtP < 50 ? 4 : meanArtP <= 69 ? 2 : meanArtP <= 109 ? 0 : meanArtP <= 129 ? 2 : meanArtP <= 159 ? 3 : 4
        const pHScore = pH < 7.15 ? 4 : pH <= 7.24 ? 3 : pH <= 7.32 ? 2 : pH <= 7.49 ? 0 : pH <= 7.59 ? 1 : pH <= 7.69 ? 3 : 4
        const heartRateScote = heartRate < 40 ? 4 : heartRate <= 54 ? 3 : heartRate <= 69 ? 2 : heartRate <= 109 ? 0 : heartRate <= 139 ? 2 : heartRate <= 179 ? 3 : 4
        const respRateScore = respRate < 6 ? 4 : respRate <= 9 ? 2 : respRate <= 11 ? 1 : respRate <= 24 ? 0 : respRate <= 34 ? 1 : respRate <= 49 ? 3 : 4
        const sodiumScore = sodium < 111 ? 4 : sodium <= 119 ? 3 : sodium <= 129 ? 2 : sodium <= 149 ? 0 : sodium <= 154 ? 1 : sodium <= 159 ? 2 : sodium <= 179 ? 3 : 4
        const potassiumScore = potassium < 2.5 ? 4 : potassium <= 2.9 ? 2 : potassium <= 3.4 ? 1 : potassium <= 5.4 ? 0 : potassium <= 5.9 ? 1 : potassium <= 6.9 ? 3 : 4
        const creatinineScore = creatinine < 0.6 ? 2 : creatinine <= 1.4 ? 0 : creatinine <= 1.9 && raf ? 4 : creatinine <= 1.9 ? 2 : creatinine <= 3.4 && raf ? 6 : creatinine <= 3.4 ? 3 : creatinine > 3.4 && raf ? 8 : 4
        const hematocritScore = hematocrit < 20 ? 4 : hematocrit <= 29.9 ? 2 : hematocrit <= 45.9 ? 0 : hematocrit <= 49.9 ? 1 : hematocrit <= 59.9 ? 2 : 4
        const wbcScore = wbc < 1 ? 4 : wbc <= 2.9 ? 2 : wbc <= 14.9 ? 0 : wbc <= 19.9 ? 1 : wbc <= 39.9 ? 2 : 4
        const gcsScore = 15 - gcs;
        const aaGradOrPaO2Score = aaGradOrPaO2
        const apacheII = ageScore + tempScore + meanArtPScore + pHScore + heartRateScote + respRateScore + sodiumScore + potassiumScore + creatinineScore + hematocritScore + wbcScore + gcsScore + aaGradOrPaO2Score;
        return apacheII;
    }

    render () {
        const { classes, data } = this.props
        const { questions } = data

        // extract needed field vars
        let history = null
        let ageValue = null
        let tempValue = null
        let tempUnitValue = null
        let meanArtPValue = null
        let pHValue = null
        let heartRateValue = null
        let respRateValue = null
        let sodiumValue = null
        let sodiumUnitValue = null
        let potassiumValue = null
        let potassiumUnitValue = null
        let raf = null
        let creatinineValue = null
        let creatinineUnitValue = null
        let hematocritValue = null
        let wbcValue = null
        let wbcUnitValue = null
        let gcsValue = null
        let aaGradOrPaO2 = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                if (index === 0) {
                    history = calculate["points"]
                } else {
                    const {input, select} = calculate
                    if (index === 1) {
                        ageValue = input
                    }
                    if (index === 2) {
                        tempValue = select === "def F" ? (input - 32) * 0.5556 : input
                    }
                    if (index === 3) {
                        meanArtPValue = input
                    }
                    if (index === 4) {
                        pHValue = input
                    }
                    if (index === 5) {
                        heartRateValue = input
                    }
                    if (index === 6) {
                        respRateValue = input
                    }
                    if (index === 7) {
                        sodiumValue = input
                        sodiumUnitValue = filterUnit(unitData.sodium, select)
                    }
                    if (index === 8) {
                        potassiumValue = input
                        potassiumUnitValue = filterUnit(unitData.potassium, select)
                    }
                    if (index === 9) {
                        raf = calculate["points"]
                    }
                    if (index === 10) {
                        creatinineValue = input
                        creatinineUnitValue = filterUnit(unitData.creatinine, select)
                    }
                    if (index === 11) {
                        hematocritValue = input
                    }
                    if (index === 12) {
                        wbcValue = input
                        wbcUnitValue = filterUnit(unitData.wbc, select)
                    }
                    if (index === 13) {
                        gcsValue = input
                    }
                    if (index === 14) {
                        aaGradOrPaO2 = calculate["points"]
                    }
                }
            }
            return calculate
        })

        if (history !== null && ageValue && tempValue && meanArtPValue && pHValue && heartRateValue && respRateValue && sodiumValue && potassiumValue && raf!== null && creatinineValue && hematocritValue && wbcValue && gcsValue && aaGradOrPaO2!== null) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption='APACHE II Score'
                        values={[this.handleCalc(
                            history,
                            ageValue,
                            tempValue * tempUnitValue,
                            meanArtPValue,
                            pHValue,
                            heartRateValue,
                            respRateValue,
                            sodiumValue * sodiumUnitValue,
                            potassiumValue * potassiumUnitValue,
                            raf,
                            creatinineValue * creatinineUnitValue,
                            hematocritValue,
                            wbcValue * wbcUnitValue,
                            gcsValue,
                            aaGradOrPaO2
                        )]}
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
    "id": "apache-ii-score",
    "title": "APACHE II Score",
    "type": "formula",
    "questions": [
        {
            "group": "History of severe organ failure or immunocompromised?",
            "data": [
                {
                    "type": "radio",
                    "options": "Yes (Emergency Post-Op) | Yes (Elective Post-Op) | Yes, and non-operative | No",
                    "points": "5/2/5/0"
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
            "group": "Rectal Temperature",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Temperature",
                    "values": ["deg C", "deg F"]
                }
            ]
        },
        {
            "group": "Mean Arterial Pressure",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Mean Arterial Pressure",
                    "values": ["mm Hg"]
                }
            ]
        },
        {
            "group": "Arterial pH",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter pH",
                    "values": ["points"]
                }
            ]
        },
        {
            "group": "Heart Rate/Pulse",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Heart Rate/Pulse",
                    "values": ["beats/min"]
                }
            ]
        },
        {
            "group": "Respiratory Rate",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Respiratory Rate",
                    "values": ["breaths/min"]
                }
            ]
        },
        {
            "group": "Serum Sodium",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Sodium",
                    "values": ["mEq/L", "mmol/L"]
                }
            ]
        },
        {
            "group": "Serum Potassium",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Potassium",
                    "values": ["mEq/L", "mmol/L"]
                }
            ]
        },
        {
            "group": "Acute Renal Failure",
            "showPoints": false,
            "data": [
                {
                    "type": "radio",
                    "options": "Yes | No",
                    "points": "1/0"
                }
            ]
        },
        {
            "group": "Serum Creatinine",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Creatinine",
                    "values": ["mg/dL", "µmol/L"]
                }
            ]
        },
        {
            "group": "Hematocrit",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Hematocrit",
                    "values": ["%"]
                }
            ]
        },
        {
            "group": "White Blood Cell Count",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter White Blood Cell Count",
                    "values": ["×10³/µL", "×10⁹/L"]
                }
            ]
        },
        {
            "group": "Glasgow Coma Scale",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Glasgow Coma Scale",
                    "values": ["points"]
                }
            ]
        },
        {
            "group": "A-a gradient(if FiO2>50%) or PaO2(if FiO2<50%)",
            "data": [
                {
                    "type": "radio",
                    "options": "A-a gradient >= 500 | A-a gradient 350-499 |  A-a gradient 200-349 | A-a gradient < 200 or PaO2 > 70 | PaO2 = 61-70 | PaO2 = 55-60 | PaO2 < 55",
                    "points": "4/3/2/0/1/3/4"
                }
            ]
        }
    ],
    "results": {
        "0 - 4": ["4% non-op mortality rate, 1% post-op mortality rate"],
        "5 - 9": ["8% non-op mortality rate, 3% post-op mortality rate"],
        "10 - 14": ["15% non-op mortality rate, 7% post-op mortality rate"],
        "15 - 19": ["24% non-op mortality rate, 12% post-op mortality rate"],
        "20 - 24": ["40% non-op mortality rate, 30% post-op mortality rate"],
        "25 - 29": ["55% non-op mortality rate, 35% post-op mortality rate"],
        "30 - 34": ["Approx 73% on both non-op and post-op mortality rates"],
        "35 - 100": ["85% non-op mortality rate, 88% post-op mortality rate"],
    },
    "notes": {
        "type": "unordered-list",
        "content": [
            "APACHE II calculator provides an estimate of ICU mortality based on a number of lab values and patient signs",
            "For the APACHE II score to be correct, a value must be selected for every variable.",
            "Data should be used from the first 24 hours in the ICU and the worst value (i.e. furthest from baseline/normal) should be used"
        ]
    },
    "references": {
        "type": "ordered-list",
        "content": [
            "Knaus WA, et al. APACHE II: a severity of disease classification system. Crit Care Med. 1985 Oct;13(10):818-29."
        ]
    },
    "formula": {
        "type": "paragraph",
        "content": [
            "Addition of the selected points; *Note that points for GCS are calculated by 15 - GCS Score"
        ]
    }
}