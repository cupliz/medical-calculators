import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from '@material-ui/core/MenuItem';
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'


const unitData = {
    heartRate: [
        { value: 1, unit: 'bpm' }
    ],
    qtInterval: [
        { value: 0.001, unit: 'msec' },
        { value: 1, unit: 'sec' }
    ],
    correctedQTI: [
        { value: 0.001, unit: 'msec' },
        { value: 1, unit: 'sec' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        correctedQTISelectUnit: 'sec',
        correctedQTISelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        heartRate,
        qtInterval,
        selectValue
    ) => {
        // correctedQTI = qtInterval/ sqr(60/heartRate)
        const correctedQTI = qtInterval/Math.sqrt(60/heartRate)
        return (correctedQTI / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.correctedQTI, value)
        this.setState({ correctedQTISelectUnit: value, correctedQTISelectValue: selectValue })
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
        let heartRateValue = null
        let heartRateUnitValue = null
        let qtIntervalValue = null
        let qtIntervalUnitValue = null


        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    heartRateValue = input
                    heartRateUnitValue = filterUnit(unitData.heartRate, select)
                }
                if (index === 1) {
                    qtIntervalValue = input
                    qtIntervalUnitValue = filterUnit(unitData.qtInterval, select)
                }
            }
            return calculate
        })

        if (heartRateValue && qtIntervalValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='Corrected QT Interval'
                        value={this.handleCalc(
                            heartRateValue * heartRateUnitValue,
                            qtIntervalValue * qtIntervalUnitValue,
                            this.state.correctedQTISelectValue
                        )}
                        selectValue={this.state.correctedQTISelectUnit}
                        selectOnChange={this.handleSelectChange}
                    >
                        {unitData.correctedQTI.map(option => (
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
  "id": "qt-interval-correction-ecg",
  "title": "QT Interval Correction (ECG)",
  "type": "formula",
  "questions": [
    {
      "group": "Heart Rate",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter heart rate, Norm 60-100bpm",
          "values": ["bpm"]
        }
      ]
    },
    {
      "group": "QT interval",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter QT interval, Norm 360-440msec",
          "values": ["msec", "sec"]
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "Calculates the corrected QT interval (QTc) for heart rate extremes",
      "Normal QTc ≤ 440msec. A longer QTc increases the risk of Torsade de pointes.",
      "Common causes for prolonged QT intervals include electrolyte abnormalities, central causes, medications and intrinsic cardiac causes"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Bazett HC. An analysis of the time relationships of electrocardiograms. Heart. 1920;7:355-70."
    ]
  },
  "formula": {
    "type": "paragraph",
    "content": [
      "RR Interval = 60/HeartRate",
      "Corrected QT Interval = QTInterval/√(RR Interval)"
    ]
  }
}
