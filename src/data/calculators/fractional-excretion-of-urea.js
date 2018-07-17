import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import { ResultCardFormulaValueFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    bun: [
        { value: 2.8, unit: 'mmol/L' },
        { value: 1, unit: 'mg/dL' }
    ],
    screatinine: [
        { value: 1, unit: 'mg/dL' },
        { value: 0.011312217194570135, unit: 'µmol/L' }
    ],
    uurea: [
        { value: 2.8, unit: 'mmol/L' },
        { value: 1, unit: 'mg/dL' }
    ],
    ucreatinine: [
        { value: 1, unit: 'mg/dL' },
        { value: 0.011312217194570135, unit: 'µmol/L' }
    ],
    feurea: [
        { value: 1, unit: '%' },
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {

    handleCalc = (
        bun,
        screatinine,
        uurea,
        ucreatinine,
    ) => {
        // FEUrea = (SerumCr * UUrea) / (SerumUrea x UCr) %
        const feurea = (screatinine * uurea) / (bun * ucreatinine) * 100
        return feurea        
    }

    handleResults = results => {
        if (results < 35) {
            return 'FEUrea <35% suggests pre-renal disease'
        } else {
            return 'FEUrea >35% suggests intrinsic renal disease'
        }
    }    

    render () {
        const { classes, data } = this.props
        const { questions } = data

        // extract needed field vars
        let bunValue = null
        let bunUnitValue = null
        let screatinineValue = null
        let screatinineUnitValue = null
        let uureaValue = null
        let uureaUnitValue = null
        let ucreatinineValue = null
        let ucreatinineUnitValue = null
 
        questions.map((question, index) => {
          const { calculate } = question
          if (calculate) {
            const { input, select } = calculate
            if (index === 0) {
              bunValue = input
              bunUnitValue = filterUnit(unitData.bun, select)
            }
            if (index === 1) {
              screatinineValue = input
              screatinineUnitValue = filterUnit(unitData.screatinine, select)
            }
            if (index === 2) {
              uureaValue = input
              uureaUnitValue = filterUnit(unitData.uurea, select)
            }
            if (index === 3) {
              ucreatinineValue = input
              ucreatinineUnitValue = filterUnit(unitData.ucreatinine, select)
            }
          }
          return calculate
        })

        if (bunValue && screatinineValue && uureaValue && ucreatinineValue) {
            const results = this.handleCalc(
                bunValue * bunUnitValue,
                screatinineValue * screatinineUnitValue,
                uureaValue * uureaUnitValue,
                ucreatinineValue * ucreatinineUnitValue,
            );
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption="FEUrea"
                        values={[results + ' %']}
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
    "id": "fractional-excretion-of-urea",
    "title": "Fractional Excretion of Urea (FEUrea)",
    "type": "formula",
    "questions": [
        {
            "group": "BUN",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter BUN",
                    "values": ["mg/dL", "mmol/L"]
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
        },
        {
            "group": "Urine Urea",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Urine Urea",
                    "values": ["mg/dL", "mmol/L"]
                }
            ]
        },
        {
            "group": "Urine Creatinine",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Urine Creatinine",
                    "values": ["mg/dL", "µmol/L"]
                }
            ]
        },
    ],
    "results": {},
    "formula": {
        "type": "paragraph",
        "content": [
            "Fractional Excretion of Urea (FEUrea) = (SerumCr * UUrea) / (SerumUrea x UCr) %"
        ]
    }
}
