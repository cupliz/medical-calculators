import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    calcium: [
        { value: 18.01801801801802, unit: 'mmol/L' },
        { value: 1, unit: 'mg/dL' }
    ],
    albumin: [
        { value: 0.1, unit: 'g/L' },
        { value: 1, unit: 'g/dL' }
    ],
    normAlb: [
        { value: 0.1, unit: 'g/L' },
        { value: 1, unit: 'g/dL' }
    ],
    correctedCa: [
        { value: 18.01801801801802, unit: 'mmol/L' },
        { value: 1, unit: 'mg/dL' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        correctedCaSelectUnit: 'mg/dL',
        correctedCaSelectValue: 1,
        decimal: 1
    }

    handleCalc = (
        calcium,
        albumin,
        normAlb,
        selectValue
    ) => {
        // Corrected Calcium = (0.8 * (Normal Albumin - Pt's Albumin)) + Serum Ca
        const correctedCa = (0.8 * ( normAlb - albumin)) + calcium
        return (correctedCa / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.correctedCa, value)
        this.setState({ correctedCaSelectUnit: value, correctedCaSelectValue: selectValue })
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
        let calciumValue = null
        let calciumUnitValue = null
        let albuminValue = null
        let albuminUnitValue = null
        let normAlbValue = null
        let normAlbUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    calciumValue = input
                    calciumUnitValue = filterUnit(unitData.calcium, select)
                }
                if (index === 1) {
                    albuminValue = input
                    albuminUnitValue = filterUnit(unitData.albumin, select)
                }
                if (index === 2) {
                    normAlbValue = input
                    normAlbUnitValue = filterUnit(unitData.normAlb, select)
                }
            }
            return calculate
        })

        if (calciumValue && albuminValue && normAlbValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='Corrected Calcium'
                        value={this.handleCalc(
                            calciumValue * calciumUnitValue,
                            albuminValue * albuminUnitValue,
                            normAlbValue * normAlbUnitValue,
                            this.state.correctedCaSelectValue
                        )}
                        selectValue={this.state.correctedCaSelectUnit}
                        selectOnChange={this.handleSelectChange}
                    >
                        {unitData.correctedCa.map(option => (
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
  "id": "calcium-correction-hypoalbuminemia",
  "title": "Calcium Correction for Hypoalbuminemia",
  "type": "formula",
  "questions": [
    {
      "group": "Calcium",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter calcium values",
          "values": ["mg/dL", "mmol/L"]
        }
      ]
    },
    {
      "group": "Albumin",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter albumin values",
          "values": ["g/L", "g/dL"]
        }
      ]
    },
    {
      "group": "Normal Albumin",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter normal albumin value e.g. 4 g/dL or 40 g/L",
          "values": ["g/L", "g/dL"]
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "Calculates the corrected calcium level for patients with hypoalbuminemia",
      "Some patients with suspected hypercalcemia may appear to have a normal calcium level result if their albumin is low. Conisder an alternative or additional confirmatory test such as an ionized calcium level",
      "Patients with hypercalcemia may require initial volume resuscitation in hypovolemic patients, loop diuretics can help with renal excretion of calcium. Biphosphonates are also effective in malignancy related hypercalcemia"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Payne RB, Little AJ, Williams RB, Milner JR. Interpretation of Serum Calcium in Patients with Abnormal Serum Proteins. Br Med J. 1973 Dec 15; 4(5893): 643–646.",
      "Parent X, Spielmann C, hanser AM. Corrected calcium: calcium status underestimation in non-hypoalbuminemic patients and in hypercalcemic patients. Ann Biol Clin (Paris). 2009 Jul-Aug;67(4):411-8."
    ]
  },
  "formula": {
    "type": "paragraph",
    "content": [
      "Corrected Calcium = (0.8 ⨉ (Normal Albumin - Patient Albumin)) + Serum Calcium",
      "Formula assumes albumin units in g/dL"
    ]
  }
}
