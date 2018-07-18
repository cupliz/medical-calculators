import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from '@material-ui/core/MenuItem';
import Decimal from '../../components/Decimal/Decimal'
import { ResultCardFormulaValueSelectFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'
import { ResultCardFormulaValueFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    bun: [ 
        { value: 2.8, unit: 'mmol/L' }, 
        { value: 1, unit: 'mg/dL' } 
    ], 
    screatinine: [ 
        { value: 1, unit: 'mg/dL' }, 
        { value: 0.011312217194570135, unit: 'µmol/L' } 
    ],
    result: [
        { value: 1, unit:'fraction'},
        { value: 0.01, unit:'%'}
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        resultSelectUnit: 'fraction',
        resultSelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        bun,
        screatinine,
        selectValue
    ) => {
        // BUN:CrS_r = BUN / Creatinine (S) ratio (fraction)
        const result = bun /screatinine
        return (result / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.result, value)
        this.setState({ resultSelectUnit: value, resultSelectValue: selectValue })
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

    handleResults= (
        results,
        resultSelectUnit,
    ) => 
    {
        if ((results > 20 && resultSelectUnit === 'fraction') || (results > 2000 && resultSelectUnit === '%')) {
            return 'BUN/Cr (S) ratio > 20 (fraction) indicates prerenal causes.'
        } else if ((results < 10 && resultSelectUnit === 'fraction')||(results < 1000 && resultSelectUnit === '%')) {
            return 'BUN/Cr (S) ratio < 10 (fraction) indicates renal causes.'
        }
    }

    render () {
        const { classes, data } = this.props
        const { questions } = data

        // extract needed field vars
        let bunValue = null
        let bunUnitValue = null
        let screatinineValue = null
        let screatinineUnitValue = null

        questions.map((question, index) => {
          const { calculate } = question
          if (calculate) {
            const { input, select } = calculate
            if (index === 0) {
              bunValue = input
              bunUnitValue = filterUnit(unitData.bun, select)
            }
            if (index === 1) {
              screatinineValue = input
              screatinineUnitValue = filterUnit(unitData.screatinine, select)
            }
          }
          return calculate
        })

        if (bunValue && screatinineValue) {
            const results = this.handleCalc(
                            bunValue * bunUnitValue,
                            screatinineValue * screatinineUnitValue,
                            this.state.resultSelectValue
                        );
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueSelectFragment
                        classes={classes}
                        caption='BUN/Cr'
                        value={results}
                        selectValue={this.state.resultSelectUnit}
                        selectOnChange={this.handleSelectChange}
                    >
                        {unitData.result.map(option => (
                            <MenuItem key={option.unit} value={option.unit}>
                                {option.unit}
                            </MenuItem>
                        ))}
                    </ResultCardFormulaValueSelectFragment>
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption=""
                        values={[this.handleResults(results, this.state.resultSelectUnit)]}
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
    "id": "body-surface-area-children",
    "title": "Body Surface Area (Children)",
    "type": "formula",
    "questions": [
        {
            "group": "BUN (B)",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter BUN",
                    "values": ["mg/dL", "mmol/L"]
                }
            ]
        },
        {
            "group": "Creatinine (S)",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter Creatinine",
                    "values": ["mg/dL", "µmol/L"]
                }
            ]
        },
    ],
    "results": {},
    "formula": {
        "type": "paragraph",
        "content": [
            "BUN:CrS_r = BUN / Creatinine (S) ratio (fraction)"
        ]
    }
}
