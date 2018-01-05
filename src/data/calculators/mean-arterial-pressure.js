import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import { ResultCardFormulaValueFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'


const unitData = {
    systolicBP: [
        { value: 1, unit: 'mmHg' }
    ],
    diastolicBP: [
        { value: 1, unit: 'mmHg' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        decimal: 0
    }

    handleCalc = (
        systolicBP,
        diastolicBP
    ) => {
        // Mean Arterial Pressure = (⅓ ⨉ Systolic BP) + (⅔ ⨉ Diastolic BP)
        const map = (1/3 * systolicBP) + (2/3 * diastolicBP)
        return `${map.toFixed(this.state.decimal)} mmHg`
    }


    render () {
        const { classes, data } = this.props
        const { questions } = data

        // extract needed field vars
        let systolicBPValue = null
        let systolicBPUnitValue = null
        let diastolicBPValue = null
        let diastolicBPUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    systolicBPValue = input
                    systolicBPUnitValue = filterUnit(unitData.systolicBP, select)
                }
                if (index === 1) {
                    diastolicBPValue = input
                    diastolicBPUnitValue = filterUnit(unitData.diastolicBP, select)
                }
            }
            return calculate
        })

        if (systolicBPValue && diastolicBPValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption='Mean Arterial Pressure'
                        values={[this.handleCalc(
                            systolicBPValue * systolicBPUnitValue,
                            diastolicBPValue * diastolicBPUnitValue
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
  "id": "mean-arterial-pressure",
  "title": "Mean Arterial Pressure",
  "type": "formula",
  "questions": [
    {
      "group": "Systolic Blood Pressure",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Normal 100-120 mmHg",
          "values": ["mmHg"]
        }
      ]
    },
    {
      "group": "Diastolic Blood Pressure",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Normal 60-80 mmHg",
          "values": ["mmHg"]
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "Calculates the Mean Arterial Pressure (MAP) for patients",
      "MAP is often used as a surrogate clinical indicator of blood flow and is believed to be better than Systolic BP at indicating tissue perfusion since it accounts for the fact that two thirds of the cardiac cycle are spent in diastole.",
      "Some clinical guidelines may use either Systolic BP or MAP as a blood pressure goal."
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Magder SA. The highs and lows of blood pressure: toward meaningful clinical targets in patients with shock. Crit Care Med. 2014 May;42(5):1241-51.",
      "Walsh M, Devereaux PJ, et. al. Relationship between intraoperative mean arterial pressure and clinical outcomes after noncardiac surgery: toward an empirical definition of hypotension. Anesthesiology. 2013 Sep;119(3):507-15."
    ]
  },
  "formula": {
    "type": "paragraph",
    "content": [
      "Mean Arterial Pressure = (⅓ ⨉ Systolic BP) + (⅔ ⨉ Diastolic BP)"
    ]
  }
}
