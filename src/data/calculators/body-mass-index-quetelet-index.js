import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
  height: [
    { value: 0.01, unit: 'cm' },
    { value: 0.0254, unit: 'in' },
    { value: 1, unit: 'm' }
  ],
  weight: [
    { value: 1, unit: 'kg' },
    { value: 0.453592, unit: 'lb' }
  ]
}

const filterUnit = (arr, select) =>
  arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
  state = {
    decimal: 2
  }

  handleCalc = (height, weight) => {
    // BMI = (Weight/2.205) / (Height/39.37)^2
    // Note that yc changed the formula to use SI units by default
    const bmi = weight / (height * height)
    let label = ''
    if (bmi < 18.5) {
      label = 'Below normal weight'
    } else if (bmi >= 18.5 && bmi < 25) {
      label = 'Normal weight'
    } else if (bmi >= 25 && bmi < 30) {
      label = 'Overweight'
    } else if (bmi >= 30 && bmi < 35) {
      label = 'Class I Obesity'
    } else if (bmi >= 35 && bmi < 40) {
      label = 'Class II Obesity'
    } else if (bmi >= 40) {
      label = 'Class III Obesity'
    }
    return `${bmi.toFixed(this.state.decimal)} kg/m² - ${label}`
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
    let heightValue = null
    let heightUnitValue = null
    let weightValue = null
    let weightUnitValue = null

    questions.map((question, index) => {
      const { calculate } = question
      if (calculate) {
        const { input, select } = calculate
        if (index === 0) {
          heightValue = input
          heightUnitValue = filterUnit(unitData.height, select)
        }
        if (index === 1) {
          weightValue = input
          weightUnitValue = filterUnit(unitData.weight, select)
        }
      }
      return calculate
    })

    if (heightValue && weightValue) {
      return (
        <ResultCardHeader classes={classes}>
          <ResultCardFormulaValueFragment
              classes={classes}
              caption='BMI'
              values={[this.handleCalc(
                heightValue * heightUnitValue,
                weightValue * weightUnitValue
              )]}
          />
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
  "id": "body-mass-index-quetelet-index",
  "title": "Body Mass Index (BMI)",
  "type": "formula",
  "questions": [
    {
      "group": "Height",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Please enter Height",
          "values": ["m", "in", "cm"]
        }
      ]
    },
    {
      "group": "Weight",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Please enter Weight",
          "values": ["kg", "lb"]
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "The default unit of measure for weight is kilograms and height is meters."
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "National Institutes of Health (NIH), National Heart, Lung, and Blood Institute (NHLBI). The practical guide: identification, evaluation, and treatment of overweight and obesity in adults. Bethesda: National Institutes of Health. 2000, NIH publication 00-4084.",
      "Khosla T, Lowe CR. Indices of obesity derived from body weight and height. Br J Prev Soc Med. 1967; 21: 122-128."
    ]
  },
  "formula": {
    "type": "paragraph",
    "content": ["BMI = Weight / (Height * Height)"]
  }
}
