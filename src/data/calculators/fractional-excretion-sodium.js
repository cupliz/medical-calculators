import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import { ResultCardFormulaValueFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'


const unitData = {
    serumNa: [
        { value: 1, unit: 'mEq/L' },
        { value: 1, unit: 'mmol/L' }
    ],
    serumCr: [
        { value: 1, unit: 'mg/dL' },
        { value: 0.011312217194570135, unit: 'µmol/L' }
    ],
    urineNa: [
        { value: 1, unit: 'mEq/L' },
        { value: 1, unit: 'mmol/L' }
    ],
    urineCr: [
        { value: 1, unit: 'mg/dL' },
        { value: 0.011312217194570135, unit: 'µmol/L' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        decimal: 1
    }

    handleCalc = (
        serumNa,
        serumCr,
        urineNa,
        urineCr
    ) => {
        //FENa = (UrineNa / SerumNa) / (UrineCr / SerumCr) * 100
        const FENa = (urineNa / serumNa ) / (urineCr / serumCr ) * 100
        let label = ''
        if (FENa >= 4) {
            label = 'Post-renal/obstructive pathology; E.g. Bladder stones, bilateral ureter obstruction, Benign Prostatic Hyperplasia'
        } else if (FENa >= 1.0 && FENa < 4) {
            label = 'Intrinsic pathology; E.g. Acute tubular necrosis, Acute interstitial nephritis etc.'
        } else if (FENa < 1.0) {
            label = 'Pre-renal pathology; E.g. Heart failure, Renal artery stenosis, Hypovolemia etc.'
        }
        return `${FENa.toFixed(this.state.decimal)} % - ${label}`
    }


    render () {
        const { classes, data } = this.props
        const { questions } = data

        // extract needed field vars
        let serumNaValue = null
        let serumNaUnitValue = null
        let serumCrValue = null
        let serumCrUnitValue = null
        let urineNaValue = null
        let urineNaUnitValue = null
        let urineCrValue = null
        let urineCrUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    serumNaValue = input
                    serumNaUnitValue = filterUnit(unitData.serumNa, select)
                }
                if (index === 1) {
                    serumCrValue = input
                    serumCrUnitValue = filterUnit(unitData.serumCr, select)
                }
                if (index === 2) {
                    urineNaValue = input
                    urineNaUnitValue = filterUnit(unitData.urineNa, select)
                }
                if (index === 3) {
                    urineCrValue = input
                    urineCrUnitValue = filterUnit(unitData.urineCr, select)
                }
            }
            return calculate
        })

        if (serumNaValue && serumCrValue && urineNaValue && urineCrValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption='Fractional Excretion of Sodium (FeNa)'
                        values={[this.handleCalc(
                            serumNaValue * serumNaUnitValue,
                            serumCrValue * serumCrUnitValue,
                            urineNaValue * urineNaUnitValue,
                            urineCrValue * urineCrUnitValue
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
  "id": "fractional-excretion-sodium",
  "title": "Fractional Excretion of Sodium (FeNa)",
  "type": "formula",
  "questions": [
    {
      "group": "Serum Sodium",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter value",
          "values": ["mEq/L", "mmol/L"]
        }
      ]
    },
    {
      "group": "Serum Creatinine",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter value",
          "values": ["mg/dL", "µmol/L"]
        }
      ]
    },
    {
      "group": "Urine Sodium",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter value",
          "values": ["mEq/L", "mmol/L"]
        }
      ]
    },
    {
      "group": "Urine Creatinine",
      "data": [
        {
          "type": "input/select",
          "placeholder": "Enter value",
          "values": ["mg/dL", "µmol/L"]
        }
      ]
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "Helps to determine if kidney failure is due to pre-renal,intrinsic, or post-renal pathology",
      "This calculator should not be used in patients who are taking diuretics or who have known CKD, urinary tract obstruction or acute glomerular disease"
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Espinel CH. The FENa test. Use in the differential diagnosis of acute renal failure. JAMA. 1976 Aug 9;236(6):579-81.",
      "Steiner RW. Intepreting the fractional excretion of sodium. Am J Med. 1984 Oct;77(4):699-702.",
      "Miller TR, Andreson RJ, Linas SL, et al. Urinary diagnostic indices in acute renal failure: a prospective study. Ann Intern Med. 1978 Jul;89(1):47-50."
    ]
  },
  "formula": {
    "type": "paragraph",
    "content": [
      "Fractional Excretion of Sodium = (Urine Sodium / Serum Sodium) / (Urine Creatinine / Serum Creatinine) ⨉ 100 "
    ]
  }
}
