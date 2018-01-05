import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'
//"values": "mmHg", "psi", "atm", "Pa", "torr"

const unitData = {
    hemoglobin: [
        { value: 1e-6, unit: 'mcg/dL' },
        { value: 0.0001, unit: 'mcg/mL' },
        { value: 0.001, unit: 'mg%' },
        { value: 0.001, unit: 'mg/dL' },
        { value: 0.01, unit: 'mg/mL' },
        { value: 1e-7, unit: 'ng/mL' },
        { value: 1, unit: 'g/dL' },
        { value: 0.1, unit: 'g/L' }
    ],
    o2sat: [
        { value: 1, unit: '%' },
        { value: 100, unit: 'fraction' },
        { value: 100, unit: 'ratio' }
    ],
    pao2: [
        { value: 1, unit: 'mmHg' },
        { value: 51.7149326, unit: 'psi' },
        { value: 1, unit: 'atm' },
        { value: 0.00750062, unit: 'Pa' },
        { value: 1, unit: 'torr' }
    ],
    CaO2: [
        { value: 1, unit: 'vol%' },
        { value: 0.1, unit: 'mL/L' },
        { value: 1, unit: 'mL/dL' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        CaO2SelectUnit: 'mL/L',
        CaO2SelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        hemoglobin,
        o2sat,
        pao2,
        selectValue
    ) => {
        // CvO2 = ( Hgb * 13.4 * O2Sat / 100 ) + ( PaO2 * 0.031 )
        const CaO2 = (hemoglobin * 13.4 * o2sat /100) + ( pao2 * 0.031 )
        return (CaO2 / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.CaO2, value)
        this.setState({ CaO2SelectUnit: value, CaO2SelectValue: selectValue })
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
        let hemoglobinValue = null
        let hemoglobinUnitValue = null
        let o2satValue = null
        let o2satUnitValue = null
        let pao2Value = null
        let pao2UnitValue = null


        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    hemoglobinValue = input
                    hemoglobinUnitValue = filterUnit(unitData.hemoglobin, select)
                }
                if (index === 1) {
                    o2satValue = input
                    o2satUnitValue = filterUnit(unitData.o2sat, select)
                }
                if (index === 2) {
                    pao2Value = input
                    pao2UnitValue = filterUnit(unitData.pao2, select)
                }
            }
            return calculate
        })

        if (hemoglobinValue && o2satValue && pao2Value) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='CvO2'
                        value={this.handleCalc(
                            hemoglobinValue * hemoglobinUnitValue,
                            o2satValue * o2satUnitValue,
                            pao2Value * pao2UnitValue,
                            this.state.CaO2SelectValue
                        )}
                        selectValue={this.state.CaO2SelectUnit}
                        selectOnChange={this.handleSelectChange}
                    >
                        {unitData.CaO2.map(option => (
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
  "id": "oxygen-content-arterial-blood",
  "title": "Oxygen Content of Arterial Blood",
  "type": "formula",
  "questions": [
    {
      "group": "Hemoglobin (Hgb)",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter Hgb",
          "values": ["mg/dL", "g/dL", "g/L", "mcg/dL", "mcg/mL", "mg%", "mg/mL", "ng/mL"]
        }
      ]
    },
    {
      "group": "Oxygen Saturation (O2Sat)",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter O2Sat",
          "values": ["%", "fraction", "ratio"]
        }
      ]
    },
    {
      "group": "Partial Pressure of Oxygen in Arterial Blood (PaO2)",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter PaO2",
          "values": ["mmHg", "psi", "atm", "Pa", "torr"]
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "Calculates patient arterial blood oxygen content"
    ]
  },
  "formula": {
    "type": "paragraph",
    "content": [
      "CaO2 = ( Hgb ⨉ 13.4 ⨉ O2Sat / 100 ) + ( PaO2 ⨉ 0.031 )"
    ]
  }
}
