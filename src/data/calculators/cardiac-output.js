import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from '@material-ui/core/MenuItem';
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
  o2consumption: [
    { value: 1, unit: 'mL/min' },
    { value: 0.01666666667, unit: 'mL/hr' },
    { value: 60000, unit: 'L/sec' },
    { value: 1000, unit: 'L/min' },
    { value: 60, unit: 'mL/sec' }
  ],
  hgb: [
    { value: 0.1, unit: 'gm/L' },
    { value: 1, unit: 'gm/dL' },
    { value: 1e-6, unit: 'mcg/dL' },
    { value: 0.0001, unit: 'mcg/mL' },
    { value: 0.001, unit: 'mg%' },
    { value: 0.001, unit: 'mg/dL' },
    { value: 0.1, unit: 'mg/mL' },
    { value: 1e-7, unit: 'ng/mL' }
  ],
  o2sat: [
    { value: 1, unit: '%' },
    { value: 100, unit: 'fraction' },
    { value: 100, unit: 'ratio' }
  ],
  pao2: [
    { value: 0.00750063755419211, unit: 'Pascal' },
    { value: 760.002100178515, unit: 'atm' },
    { value: 750.063755419211, unit: 'bar' },
    { value: 0.735561538478802, unit: 'cmH2O' },
    { value: 10, unit: 'cmHg' },
    { value: 22.4199156928339, unit: 'ftH2O' },
    { value: 0.735561538478802, unit: 'gm/sqcm' },
    { value: 1.86832630773616, unit: 'inH2O' },
    { value: 25.4000840071406, unit: 'inHg' },
    { value: 7.50063755419211, unit: 'kPa' },
    { value: 0.750063755419211, unit: 'mbar' },
    { value: 1, unit: 'mmHg' },
    { value: 51.7150957831416, unit: 'psi' },
    { value: 1, unit: 'torr' }
  ],
  o2vsat: [
    { value: 1, unit: '%' },
    { value: 100, unit: 'fraction' },
    { value: 100, unit: 'ratio' }
  ],
  pvo2: [
    { value: 0.00750063755419211, unit: 'Pascal' },
    { value: 760.002100178515, unit: 'atm' },
    { value: 750.063755419211, unit: 'bar' },
    { value: 0.735561538478802, unit: 'cmH2O' },
    { value: 10, unit: 'cmHg' },
    { value: 22.4199156928339, unit: 'ftH2O' },
    { value: 0.735561538478802, unit: 'gm/sqcm' },
    { value: 1.86832630773616, unit: 'inH2O' },
    { value: 25.4000840071406, unit: 'inHg' },
    { value: 7.50063755419211, unit: 'kPa' },
    { value: 0.750063755419211, unit: 'mbar' },
    { value: 1, unit: 'mmHg' },
    { value: 51.7150957831416, unit: 'psi' },
    { value: 1, unit: 'torr' }
  ],
  cao2: [
    { value: 10, unit: 'Vol%' },
    { value: 1, unit: 'mL/L' },
    { value: 10, unit: 'mL/dL' }
  ],
  cvo2: [
    { value: 10, unit: 'Vol%' },
    { value: 1, unit: 'mL/L' },
    { value: 10, unit: 'mL/dL' }
  ],
  co: [
    { value: 1, unit: 'L/min' },
    { value: 60, unit: 'L/sec' },
    { value: 1.666666667e-5, unit: 'mL/hr' },
    { value: 0.001, unit: 'mL/min' },
    { value: 0.06, unit: 'mL/sec' }
  ]
}

const filterUnit = (arr, select) =>
  arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
  state = {
    cao2SelectUnit: 'mL/L',
    cao2SelectValue: 1,
    cvo2SelectUnit: 'mL/L',
    cvo2SelectValue: 1,
    coSelectUnit: 'L/min',
    coSelectValue: 1,
    decimal: 2
  }

  handleFormulaCalc = (
    type,
    o2,
    hgb,
    o2sat,
    pao2,
    o2vsat,
    pvo2,
    cao2SelectValue,
    cvo2SelectValue,
    coSelectValue
  ) => {
    // CaO2 = ( Hgb * 13.4 * O2Sat / 100 ) + ( PaO2 * 0.031 )
    // CvO2 = ( Hgb * 13.4 * O2vSat / 100 ) + ( PvO2 * 0.031 )
    // CO = O2Consumption / (CaO2 - CvO2)
    const cao2 = hgb * 13.4 * o2sat / 100 + pao2 * 0.031
    const cvo2 = hgb * 13.4 * o2vsat / 100 + pvo2 * 0.031
    const co = o2 / (cao2 - cvo2)
    if (type === 'cao2') {
      return (cao2 / cao2SelectValue).toFixed(this.state.decimal)
    } else if (type === 'cvo2') {
      return (cvo2 / cvo2SelectValue).toFixed(this.state.decimal)
    } else if (type === 'co') {
      return (co / coSelectValue).toFixed(this.state.decimal)
    }
  }

  handleCaO2SelectChange = event => {
    const { value } = event.target
    let selectValue = filterUnit(unitData.cao2, value)
    this.setState({ cao2SelectUnit: value, cao2SelectValue: selectValue })
  }

  handleCvO2SelectChange = event => {
    const { value } = event.target
    let selectValue = filterUnit(unitData.cvo2, value)
    this.setState({ cvo2SelectUnit: value, cvo2SelectValue: selectValue })
  }

  handleCOSelectChange = event => {
    const { value } = event.target
    let selectValue = filterUnit(unitData.co, value)
    this.setState({ coSelectUnit: value, coSelectValue: selectValue })
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
    let o2Value = null
    let o2UnitValue = null
    let hgbValue = null
    let hgbUnitValue = null
    let o2satValue = null
    let o2satUnitValue = null
    let pao2Value = null
    let pao2UnitValue = null
    let o2vsatValue = null
    let o2vsatUnitValue = null
    let pvo2Value = null
    let pvo2UnitValue = null

    questions.map((question, index) => {
      const { calculate } = question
      if (calculate) {
        const { input, select } = calculate
        if (index === 0) {
          o2Value = input
          o2UnitValue = filterUnit(unitData.o2consumption, select)
        }
        if (index === 1) {
          hgbValue = input
          hgbUnitValue = filterUnit(unitData.hgb, select)
        }
        if (index === 2) {
          o2satValue = input
          o2satUnitValue = filterUnit(unitData.o2sat, select)
        }
        if (index === 3) {
          pao2Value = input
          pao2UnitValue = filterUnit(unitData.pao2, select)
        }
        if (index === 4) {
          o2vsatValue = input
          o2vsatUnitValue = filterUnit(unitData.o2vsat, select)
        }
        if (index === 5) {
          pvo2Value = input
          pvo2UnitValue = filterUnit(unitData.pvo2, select)
        }
      }
      return calculate
    })

    if (
      o2Value &&
      hgbValue &&
      o2satValue &&
      pao2Value &&
      o2vsatValue &&
      pvo2Value
    ) {
      return (
        <ResultCardHeader classes={classes}>
          <ResultCardFormulaValueSelectFragment
            classes={classes}
            caption='Arterial Oxygen Content CaO2'
            value={this.handleFormulaCalc(
              'cao2',
              o2Value * o2UnitValue,
              hgbValue * hgbUnitValue,
              o2satValue * o2satUnitValue,
              pao2Value * pao2UnitValue,
              o2vsatValue * o2vsatUnitValue,
              pvo2Value * pvo2UnitValue,
              this.state.cao2SelectValue
            )}
            selectValue={this.state.cao2SelectUnit}
            selectOnChange={this.handleCaO2SelectChange}
          >
            {unitData.cao2.map(option => (
              <MenuItem key={option.unit} value={option.unit}>
                {option.unit}
              </MenuItem>
            ))}
          </ResultCardFormulaValueSelectFragment>
          <ResultCardFormulaValueSelectFragment
            classes={classes}
            caption='Venous Oxygen Content CvO2'
            value={this.handleFormulaCalc(
              'cvo2',
              o2Value * o2UnitValue,
              hgbValue * hgbUnitValue,
              o2satValue * o2satUnitValue,
              pao2Value * pao2UnitValue,
              o2vsatValue * o2vsatUnitValue,
              pvo2Value * pvo2UnitValue,
              this.state.cao2SelectValue,
              this.state.cvo2SelectValue
            )}
            selectValue={this.state.cvo2SelectUnit}
            selectOnChange={this.handleCvO2SelectChange}
          >
            {unitData.cvo2.map(option => (
              <MenuItem key={option.unit} value={option.unit}>
                {option.unit}
              </MenuItem>
            ))}
          </ResultCardFormulaValueSelectFragment>
          <ResultCardFormulaValueSelectFragment
            classes={classes}
            caption='Cardiac Output'
            value={this.handleFormulaCalc(
              'co',
              o2Value * o2UnitValue,
              hgbValue * hgbUnitValue,
              o2satValue * o2satUnitValue,
              pao2Value * pao2UnitValue,
              o2vsatValue * o2vsatUnitValue,
              pvo2Value * pvo2UnitValue,
              this.state.cao2SelectValue,
              this.state.cvo2SelectValue,
              this.state.coSelectValue
            )}
            selectValue={this.state.coSelectUnit}
            selectOnChange={this.handleCOSelectChange}
          >
            {unitData.co.map(option => (
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
  "id": "cardiac-output",
  "title": "Cardiac Output",
  "type": "formula",
  "questions": [
    {
      "group": "Oxygen Consumption (O2)",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Please enter Oxygen Consumption (O2)",
          "values": ["mL/min", "L/min", "L/sec", "mL/hr", "mL/sec"]
        }
      ]
    },
    {
      "group": "Hemoglobin (Hgb)",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Please enter Hemoglobin (Hgb)",
          "values": [
            "gm/dL",
            "gm/L",
            "mcg/dL",
            "mcg/mL",
            "mg%",
            "mg/dL",
            "mg/mL",
            "ng/mL"
          ]
        }
      ]
    },
    {
      "group": "O2 Saturation",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Please enter O2 Saturation",
          "values": ["%", "fraction", "ratio"]
        }
      ]
    },
    {
      "group": "PaO2",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Please enter PaO2",
          "values": [
            "mmHg",
            "Pascal",
            "atm",
            "bar",
            "cmH2O",
            "cmHg",
            "ftH2O",
            "gm/sqcm",
            "inH2O",
            "inHg",
            "kPa",
            "mbar",
            "psi",
            "torr"
          ]
        }
      ]
    },
    {
      "group": "O2vSat",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Please enter O2vSat",
          "values": ["%", "fraction", "ratio"]
        }
      ]
    },
    {
      "group": "PvO2",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Please enter PvO2",
          "values": [
            "mmHg",
            "Pascal",
            "atm",
            "bar",
            "cmH2O",
            "cmHg",
            "ftH2O",
            "gm/sqcm",
            "inH2O",
            "inHg",
            "kPa",
            "mbar",
            "psi",
            "torr"
          ]
        }
      ]
    }
  ],
  "results": {},
  "formula": {
    "type": "unordered-list",
    "content": [
      "CaO2 = (Hgb*13.4*O2Sat/100) + (PaO2*0.031)",
      "CvO2 = (Hgb*13.4*O2vSat/100) + (PvO2*0.031)",
      "CO = O2Consumption/(CaO2-CvO2)"
    ]
  }
}
