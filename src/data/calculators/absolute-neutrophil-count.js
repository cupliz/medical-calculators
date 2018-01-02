import React, { Component } from 'react'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import { ResultCardFormulaValueFragment } from '../../components/Calculator/results/ResultCardFormulaFragments'

const unitData = {
    neutrophils: [
        { value: 1, unit: '%' }
    ],
    bands: [
        { value: 1, unit: '%' }
    ],
    WBC_count: [
        { value: 1, unit: '⨉10³/µL' },
        { value: 1000, unit: '/µL' },
        { value: 1, unit: '⨉10⁹/L' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        decimal: 0
    }

    handleCalc = (
        neutrophils,
        bands,
        WBC_count
    ) => {
        // Absolute Neutrophil Count = 10 * WBC count in 1000s * (% PMNs + % Bands)
        const ANC = 10 * WBC_count * (neutrophils + bands)
        let label = ''
        if (ANC >= 1.5) {
            label = 'Unlikely Neutropenia'
        } else if (ANC >= 1.0 && ANC < 1.5) {
            label = 'Mild neutropenia'
        } else if (ANC >= 0.50 && ANC < 1.0) {
            label = 'Moderate neutropenia'
        } else if (ANC < 0.5) {
            label = 'Severe neutropenia'
        }
        return `${ANC.toFixed(this.state.decimal)} ⨉10³/µL - ${label}`
    }


    render () {
        const { classes, data } = this.props
        const { questions } = data

        // extract needed field vars
        let neutrophilsValue = null
        let neutrophilsUnitValue = null
        let bandsValue = null
        let bandsUnitValue = null
        let WBC_countValue = null
        let WBC_countUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    neutrophilsValue = input
                    neutrophilsUnitValue = filterUnit(unitData.neutrophils, select)
                }
                if (index === 1) {
                    bandsValue = input
                    bandsUnitValue = filterUnit(unitData.bands, select)
                }
                if (index === 2) {
                    WBC_countValue = input
                    WBC_countUnitValue = filterUnit(unitData.WBC_count, select)
                }
            }
            return calculate
        })

        if (neutrophilsValue && bandsValue && WBC_countValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <ResultCardFormulaValueFragment
                        classes={classes}
                        caption='Absolute Neutrophil Count'
                        value={this.handleCalc(
                            neutrophilsValue * neutrophilsUnitValue,
                            bandsValue * bandsUnitValue,
                            WBC_countValue * WBC_countUnitValue
                        )}
                    />
                </ResultCardHeader>
            )
        } else {
            return null
        }
    }
}
export default FormulaComponent
