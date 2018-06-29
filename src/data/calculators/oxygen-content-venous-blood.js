import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from '@material-ui/core/MenuItem';
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
    o2vsat: [
        { value: 1, unit: '%' },
        { value: 100, unit: 'fraction' },
        { value: 100, unit: 'ratio' }
    ],
    pvo2: [
        { value: 1, unit: 'mmHg' },
        { value: 51.7149326, unit: 'psi' },
        { value: 1, unit: 'atm' },
        { value: 0.00750062, unit: 'Pa' },
        { value: 1, unit: 'torr' }
    ],
    CvO2: [
        { value: 1, unit: 'vol%' },
        { value: 0.1, unit: 'mL/L' },
        { value: 1, unit: 'mL/dL' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        CvO2SelectUnit: 'mL/L',
        CvO2SelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        hemoglobin,
        o2vsat,
        pvo2,
        selectValue
    ) => {
        // CvO2 = ( Hgb * 13.4 * O2vSat / 100 ) + ( PvO2 * 0.031 )
        const CvO2 = (hemoglobin * 13.4 * o2vsat /100) + ( pvo2 * 0.031 )
        return (CvO2 / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.CvO2, value)
        this.setState({ CvO2SelectUnit: value, CvO2SelectValue: selectValue })
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
        let o2vsatValue = null
        let o2vsatUnitValue = null
        let pvo2Value = null
        let pvo2UnitValue = null


        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    hemoglobinValue = input
                    hemoglobinUnitValue = filterUnit(unitData.hemoglobin, select)
                }
                if (index === 1) {
                    o2vsatValue = input
                    o2vsatUnitValue = filterUnit(unitData.o2vsat, select)
                }
                if (index === 2) {
                    pvo2Value = input
                    pvo2UnitValue = filterUnit(unitData.pvo2, select)
                }
            }
            return calculate
        })

        if (hemoglobinValue && o2vsatValue && pvo2Value) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='CvO2'
                        value={this.handleCalc(
                            hemoglobinValue * hemoglobinUnitValue,
                            o2vsatValue * o2vsatUnitValue,
                            pvo2Value * pvo2UnitValue,
                            this.state.CvO2SelectValue
                        )}
                        selectValue={this.state.CvO2SelectUnit}
                        selectOnChange={this.handleSelectChange}
                    >
                        {unitData.CvO2.map(option => (
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
  "id": "oxygen-content-venous-blood",
  "title": "Oxygen Content of Venous Blood",
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
      "group": "Venous Oxygen Saturation",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter O2vSat",
          "values": ["%", "fraction", "ratio"]
        }
      ]
    },
    {
      "group": "Partial Pressure of Oxygen in Venous Blood (PvO2)",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter PvO2",
          "values": ["mmHg", "psi", "atm", "Pa", "torr"]
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "Calculates patient venous blood oxygen content"
    ]
  },
  "formula": {
    "type": "paragraph",
    "content": [
      "CvO2 = ( Hgb ⨉ 13.4 ⨉ O2vSat / 100 ) + ( PvO2 ⨉ 0.031 )"
    ]
  }
}
