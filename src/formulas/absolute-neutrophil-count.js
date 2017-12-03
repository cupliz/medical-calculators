import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { ResultCardHeader } from '../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Decimal from '../components/Decimal/Decimal'


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
    ],
    ANC: [
        { value: 1, unit: '⨉10³/µL' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        ANCSelectUnit: '⨉10³/µL',
        ANCSelectValue: 1,
        decimal: 0
    }

    handleCalc = (
        neutrophils,
        bands,
        WBC_count,
        selectValue
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
        return `${(ANC / selectValue).toFixed(this.state.decimal)} - ${label}`
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.ANC, value)
        this.setState({ ANCSelectUnit: value, ANCSelectValue: selectValue })
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
                    <CardContent className={classes.content}>
                        <Typography type='caption' className={classes.contentText}>
                            Absolute Neutrophil Count
                        </Typography>
                        <div className={classes.resultWrapper}>
                            <Typography type='title' className={classes.resultText}>
                                {this.handleCalc(
                                    neutrophilsValue * neutrophilsUnitValue,
                                    bandsValue * bandsUnitValue,
                                    WBC_countValue * WBC_countUnitValue,
                                    this.state.ANCSelectValue
                                )}
                            </Typography>
                            <TextField
                                select
                                value={this.state.ANCSelectUnit}
                                onChange={this.handleSelectChange}
                                SelectProps={{ classes: { root: this.props.classes.select } }}
                                margin='normal'
                            >
                                {unitData.ANC.map(option => (
                                    <MenuItem key={option.unit} value={option.unit}>
                                        {option.unit}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <Decimal
                            classes={classes}
                            decimal={this.state.decimal}
                            onDecimalChange={this.handleDecimalChange}
                        />
                    </CardContent>
                </ResultCardHeader>
            )
        } else {
            return null
        }
    }
}
export default FormulaComponent
