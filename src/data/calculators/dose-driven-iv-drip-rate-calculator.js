import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from '@material-ui/core/MenuItem';
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    desiredDose: [
        { value: 1000, unit: 'mg/kg/min' },
        { value: 1000000, unit: 'g/kg/min' },
        { value: 1, unit: 'mcg/kg/min' }
    ],
    weight: [
        { value: 1, unit: 'kg' },
        { value: 0.453592, unit: 'lb' }
    ],
    drug: [
        { value: 1, unit: 'mg' },
        { value: 1000, unit: 'g' },
        { value: 0.001, unit: 'mcg' }
    ],
    bagVol: [
        { value: 1, unit: 'mL' },
        { value: 1000, unit: 'L' }
    ],
    ivdriprate: [
        { value: 1000, unit: 'L/hr' },
        { value: 1, unit: 'mL/hr' },
        { value: 60, unit: 'mL/min' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        ivdriprateSelectUnit: 'mL/hr',
        ivdriprateSelectValue: 1,
        decimal: 2
    }
    handleCalc = (
        desiredDose,
        weight,
        drug,
        bagVol,
        selectValue
    ) => {
        // IV Drip Rate = (60 ⨉ Desired Dose ⨉ Weight ⨉ Bag Volume) / (1000 ⨉ Drug in Bag)
        const ivdriprate = ( 60 * desiredDose * weight)/((drug/bagVol) * 1000)
        console.log(desiredDose)
        console.log(weight)
        console.log(drug)
        console.log(bagVol)
        console.log(ivdriprate)
        return (ivdriprate / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.ivdriprate, value)
        this.setState({ ivdriprateSelectUnit: value, ivdriprateSelectValue: selectValue })
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
        let desiredDoseValue = null
        let desiredDoseUnitValue = null
        let weightValue = null
        let weightUnitValue = null
        let drugValue = null
        let drugUnitValue = null
        let bagVolValue = null
        let bagVolUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    desiredDoseValue = input
                    desiredDoseUnitValue = filterUnit(unitData.desiredDose, select)
                }
                if (index === 1) {
                    weightValue = input
                    weightUnitValue = filterUnit(unitData.weight, select)
                }
                if (index === 2) {
                    drugValue = input
                    drugUnitValue = filterUnit(unitData.drug, select)
                }
                if (index === 3) {
                    bagVolValue = input
                    bagVolUnitValue = filterUnit(unitData.bagVol, select)
                }
            }
            return calculate
        })

        if (desiredDoseValue && weightValue && drugValue && bagVolValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='IV Drip Rate'
                        value={this.handleCalc(
                            desiredDoseValue * desiredDoseUnitValue,
                            weightValue * weightUnitValue,
                            drugValue * drugUnitValue,
                            bagVolValue * bagVolUnitValue,
                            this.state.ivdriprateSelectValue
                        )}
                        selectValue={this.state.ivdriprateSelectUnit}
                        selectOnChange={this.handleSelectChange}
                    >
                        {unitData.ivdriprate.map(option => (
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
  "id": "dose-driven-iv-drip-rate-calculator",
  "title": "Dose Driven IV Drip Rate Calculator",
  "type": "formula",
  "questions": [
    {
      "group": "Desired Dose",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter dose value",
          "values": ["mcg/kg/min", "g/kg/min", "mg/kg/min"]
        }
      ]
    },
    {
      "group": "Weight",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter weight",
          "values": ["kg", "lb"]
        }
      ]
    },
    {
      "group": "Drug in Bag",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter drug amount",
          "values": ["mg", "g", "mcg"]
        }
      ]
    },
    {
      "group": "Bag Volume",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter bag volume",
          "values": ["mL", "L"]
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "Calculates the IV drip rate required to achieve a desired dose",
      "Default unit of measure for weight is in kg."
    ]
  },
  "formula": {
    "type": "paragraph",
    "content": [
      "IV Drip Rate = (60 ⨉ Desired Dose ⨉ Weight ⨉ Bag Volume) / (1000 ⨉ Drug in Bag)"
    ]
  }
}
