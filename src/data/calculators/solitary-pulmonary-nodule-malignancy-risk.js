import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import { ResultCardFormulaValueFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'
const unitData = {
    age: [
        { value: 1, unit: 'yr' },
        { value: 1 / 12, unit: 'mo' }
    ],
    noduleDiameter: [
        { value: 1, unit: 'mm' },
        { value: 10, unit: 'cm' },
        { value: 25.4, unit: 'in' },
        { value: 0.001, unit: 'mcm'},
        { value: 1e-6, unit: 'nm'}
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        decimal: 2
    }

    handleCalc = (
        age,
        smoker,
        cancer,
        noduleDiameter,
        spiculation,
        upperlobe,
        selectValue
    ) => {
        // X = (0.0391 * Age) + (0.7917 * Smoker) + (1.3388 * Cancer) + (0.1274 * NoduleDiameter) + (1.0407 * Spiculation) + (0.7838 * UpperLobe) - 6.8272
        // MaligProbability = 100 * e(X) / ( 1 + e(X))
        const maligProb = 100 * ((Math.pow(2.718, ((0.0391 * age) + (0.7917 * smoker) + (1.3388 * cancer) + (0.1274 * noduleDiameter) + (1.0407 * spiculation) + (0.7838 * upperlobe) - 6.8272))) / (1 + Math.pow(2.718, ((0.0391 * age) + (0.7917 * smoker) + (1.3388 * cancer) + (0.1274 * noduleDiameter) + (1.0407 * spiculation) + (0.7838 * upperlobe) - 6.8272))))
        return `${maligProb.toFixed(this.state.decimal)}%`
    }

    render () {
        const { classes, data } = this.props
        const { questions } = data

        // extract needed field vars
        let ageValue = null
        let ageUnitValue = null
        let smokerValue = null
        let cancerValue = null
        let noduleDiameterValue = null
        let noduleDiameterUnitValue = null
        let spiculationValue = null
        let upperlobeValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    ageValue = input
                    ageUnitValue = filterUnit(unitData.age, select)
                }
                if (index === 1) {
                    smokerValue = calculate["points"]
                }
                if (index === 2) {
                    cancerValue = calculate["points"]
                }
                if (index === 3) {
                    noduleDiameterValue = input
                    noduleDiameterUnitValue = filterUnit(unitData.noduleDiameter, select)
                }
                if (index === 4) {
                    spiculationValue = calculate["points"]
                }
                if (index === 5) {
                    upperlobeValue = calculate["points"]
                }
            }
            return calculate
        })

        if (ageValue && smokerValue && cancerValue && noduleDiameterValue && spiculationValue && upperlobeValue) {
            return (
                <ResultCardHeader classes={classes}>
                     <ResultCardFormulaValueFragment
                         classes={classes}
                         caption='Malignancy Probability %'
                         values={[this.handleCalc(
                             ageValue * ageUnitValue,
                             smokerValue,
                             cancerValue,
                             noduleDiameterValue * noduleDiameterUnitValue,
                             spiculationValue,
                             upperlobeValue
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
  "id": "solitary-pulmonary-nodule-malignancy-risk",
  "title": "Solitary Pulmonary Nodule Malignancy Risk (Mayo Clinic)",
  "type": "formula",
  "questions": [
    {
      "group": "Patient's Age",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter Age",
          "values": ["yr", "mo"]
        }
      ]
    },
    {
      "group": "Smoking History",
      "data": [
        {
          "type": "radio",
          "options": "Yes | No",
          "points": "1/0"
        }
      ]
    },
    {
      "group": "Cancer",
      "data": [
        {
          "type": "radio",
          "options": "Extrathoracic cancer > 5 yrs prior | No ",
          "points": "1/0"
        }
      ]
    },
    {
      "group": "Nodule diameter",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter value",
          "values": ["mm", "cm", "in", "mcm", "nm"]
        }
      ]
    },
    {
      "group": "Spiculation",
      "data": [
        {
          "type": "radio",
          "options": "Yes | No",
          "points": "1/0"
        }
      ]
    },
    {
      "group": "Upper Lobe",
      "data": [
        {
          "type": "radio",
          "options": "Yes | No",
          "points": "1/0"
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "Calculator is not useful or validated in patients with prior lung cancer or some other cancer history within last 5 years",
      "The formula is derived based on data from 629 patients in the mid-1980s who were found to have a solitary pulmonary nodule (4-30mm).",
      "Prediction rule by Swensen has been externally validated in a study of 106 patients with similar characteristics but a higher incidence of malignancy (Herder et al, 2005)"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Swensen SJ, Silverstein MD, Ilstrup DM, et. al. The probability of malignancy in solitary pulmonary nodules. Application to small radiologically indeterminate nodules. Arch Intern Med. 1997 Apr 28;157(8):849-55.",
      "Herder GJ et al. Clinical Prediction Model To Characterize Pulmonary Nodules: Validation and Added Value of 18F-Fluorodeoxyglucose Positron Emission Tomography. Chest 2005;128:2490",
      "Swensen SJ et al. Solitary pulmonary nodules: clinical prediction model versus physicians. Mayo Clin Proc 1999;74:319."
    ]
  },
  "formula": {
    "type": "paragraph",
    "content": [
      "X = (0.0391 ⨉ Age) + (0.7917 ⨉ Smoker) + (1.3388 ⨉ Cancer) + (0.1274 ⨉ NoduleDiameter) + (1.0407 ⨉ Spiculation) + (0.7838 ⨉ UpperLobe) - 6.8272",
      "Malignancy Probability = ( 100 ⨉ e^X ) / ( 1 + (e^X) )"
    ]
  }
}
