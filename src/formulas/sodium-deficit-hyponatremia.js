import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { ResultCardHeader } from '../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Decimal from '../components/Decimal/Decimal'

const unitData = {
    weight: [
        { value: 0.453592, unit: 'lb' },
        { value: 1, unit: 'kg' },
        { value: 0.001, unit: 'g' },
        { value: 1e-6, unit: 'mg' }
    ],
    serumNa: [
        { value: 1, unit: 'mEq/L' },
        { value: 1, unit: 'mmol/L' }
    ],
    desiredNa: [
        { value: 1, unit: 'mEq/L' },
        { value: 1, unit: 'mmol/L' }
    ],
    NaDeficit: [
        { value: 1, unit: 'mEq' },
        { value: 1, unit: 'mmol' },
        { value: 1000, unit: 'Eq' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        NaDeficitSelectUnit: 'mEq',
        NaDeficitSelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        gender,
        weight,
        serumNa,
        desiredNa,
        selectValue
    ) => {
        // NaDeficit = gender * weight * (desiredNa - serumNa)
        const NaDeficit = gender * weight * (desiredNa - serumNa)
        console.log(NaDeficit)
        console.log(gender)
        console.log(weight)
        console.log(desiredNa)
        return (NaDeficit / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.NaDeficit, value)
        this.setState({ NaDeficitSelectUnit: value, NaDeficitSelectValue: selectValue })
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
        let genderValue = null
        let weightValue = null
        let weightUnitValue = null
        let serumNaValue = null
        let serumNaUnitValue = null
        let desiredNaValue = null
        let desiredNaUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                if (index === 0) {
                    genderValue = calculate["points"]
                }
                else {
                    const { input, select } = calculate
                    if (index === 1) {
                        weightValue = input
                        weightUnitValue = filterUnit(unitData.weight, select)
                    }
                    if (index === 2) {
                        serumNaValue = input
                        serumNaUnitValue = filterUnit(unitData.serumNa, select)
                    }
                    if (index === 3) {
                        desiredNaValue = input
                        desiredNaUnitValue = filterUnit(unitData.desiredNa, select)
                    }
                }
            }
            return calculate
        })

        if (genderValue && weightValue && serumNaValue && desiredNaValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <CardContent className={classes.content}>
                        <Typography type='caption' className={classes.contentText}>
                            Sodium Deficit
                        </Typography>
                        <div className={classes.resultWrapper}>
                            <Typography type='title' className={classes.resultText}>
                                {this.handleCalc(
                                    genderValue,
                                    weightValue * weightUnitValue,
                                    serumNaValue * serumNaUnitValue,
                                    desiredNaValue * desiredNaUnitValue,
                                    this.state.NaDeficitSelectValue
                                )}
                            </Typography>
                            <TextField
                                select
                                value={this.state.NaDeficitSelectUnit}
                                onChange={this.handleSelectChange}
                                SelectProps={{ classes: { root: this.props.classes.select } }}
                                margin='normal'
                            >
                                {unitData.NaDeficit.map(option => (
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
