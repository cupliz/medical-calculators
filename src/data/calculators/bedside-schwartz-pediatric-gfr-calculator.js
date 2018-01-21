import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    height: [
        { value: 1, unit: 'cm' },
        { value: 100, unit: 'm' },
        { value: 2.54, unit: 'in' },
        { value: 30.48, unit: 'ft' }
    ],
    serumCr: [
        { value: 1, unit: 'mg/dL' },
        { value: 38.610, unit: 'mmol/L' }
    ],
    eGfr: [
        { value: 1, unit:'mL/min/1.73 m²'}
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        eGfrSelectUnit: 'mL/min/1.73 m²',
        eGfrSelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        height,
        serumCr,
        selectValue
    ) => {
        // eGFR = 0.413 * height in cm/ serumCr in mg/dL
        const eGfr = 0.413 * (height / serumCr)
        return (eGfr / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.eGfr, value)
        this.setState({ eGfrSelectUnit: value, eGfrSelectValue: selectValue })
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
        let serumCrValue = null
        let serumCrUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    heightValue = input
                    heightUnitValue = filterUnit(unitData.height, select)
                }
                if (index === 1) {
                    serumCrValue = input
                    serumCrUnitValue = filterUnit(unitData.serumCr, select)
                }
            }
            return calculate
        })

        if (heightValue && serumCrValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='Estimated GFR'
                        value={this.handleCalc(
                            heightValue * heightUnitValue,
                            serumCrValue * serumCrUnitValue,
                            this.state.eGfrSelectValue
                        )}
                        selectValue={this.state.eGfrSelectUnit}
                        selectOnChange={this.handleSelectChange}
                    >
                        {unitData.eGfr.map(option => (
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
    "id": "bedside-schwartz-pediatric-gfr-calculator",
    "title": "Bedside Schwartz Pediatric GFR Calculator",
    "type": "formula",
    "questions": [
        {
            "group": "Patient Height",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Height",
                    "values": ["cm", "m", "in", "ft"]
                }
            ]
        },
        {
            "group": "Serum Creatinine",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Value",
                    "values": ["mg/dL", "mmol/L"]
                }
            ]
        }

    ],
    "results": {},
    "notes": {
        "type": "unordered-list",
        "content": [
            "This calculator provides an estimate of glomerular filtration rate in children ages 1-18 years",
            "For patients 19 and older, use the GFR calculator for adults",
            "The formula was updated in 2009 and is currently considered the best method for estimating GFR in children. It is known as the “Bedside Schwartz” formula",
            'Using the original Schwartz equation with a creatinine value from a method with calibration traceable to IDMS will overestimate GFR by 20 to 40%',
            "The NKDEP presently recommends reporting estimated GFR values for children greater than or equal to 75 mL/min/1.73 m² simply as “≥ 75 mL/min/1.73 m²,” not an exact number"
        ]
    },
    "references": {
        "type": "ordered-list",
        "content": [
            "Schwartz GJ and Work DF. Measurement and estimation of GFR in children and adolescents. J Am Soc Nephrol. 2009; Nov; 4(11): 1832-643",
            "Schwartz GJ and Work DF. Measurement and estimation of GFR in children and adolescents. J Am Soc Nephrol. 2009; Nov; 4(11): 1832-643",
            "Staples A, LeBlond R, Watkins S, Wong C, Brandt J. Validation of the revised Schwartz estimating equation in a predominantly non-CKD population. Pediatr Nephrol. 2010 Nov;25(11):2321-6"
        ]
    },
    "formula": {
        "type": "paragraph",
        "content": [
            "Schwartz GFR (mL/min/1.73m²) = (0.413 × height in cm)/ Serum Creatinine in mg/dL"
        ]
    }
}
