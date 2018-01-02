import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Decimal from '../../components/Decimal/Decimal'
//"values": ["mmol/L", "mg/dL", "g/L", "g/dL","mcg/dL", "mcg/mL"]

const unitData = {
    measuredNa: [
        { value: 1, unit: 'mEq/L' },
        { value: 1, unit: 'mmol/L' }
    ],
    glucose: [
        { value: 18.01801801801802, unit: 'mmol/L' },
        { value: 1, unit: 'mg%' },
        { value: 1, unit: 'mg/dL' },
        { value: 100, unit: 'g/L'},
        { value: 1000, unit: 'g/dL'},
        { value: 0.001, unit: 'mcg/dL'},
        { value: 0.1, unit: 'mcg/mL'}
    ],
    Na: [
        { value: 1, unit: 'mEq/L' },
        { value: 1, unit: 'mmol/L' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        NaSelectUnit: 'mEq/L',
        NaSelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        measuredNa,
        glucose,
        selectValue
    ) => {
        // Na = MeasuredSodium + 0.016 * (Glucose - 100)
        const Na = measuredNa + (0.016 * (glucose - 100))
        return (Na / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.Na, value)
        this.setState({ NaSelectUnit: value, NaSelectValue: selectValue })
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
        let measuredNaValue = null
        let measuredNaUnitValue = null
        let glucoseValue = null
        let glucoseUnitValue = null


        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    measuredNaValue = input
                    measuredNaUnitValue = filterUnit(unitData.measuredNa, select)
                }
                if (index === 1) {
                    glucoseValue = input
                    glucoseUnitValue = filterUnit(unitData.glucose, select)
                }
            }
            return calculate
        })

        if (measuredNaValue && glucoseValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <CardContent className={classes.content}>
                        <Typography type='caption' className={classes.contentText}>
                            Na
                        </Typography>
                        <div className={classes.resultWrapper}>
                            <Typography type='title' className={classes.resultText}>
                                {this.handleCalc(
                                    measuredNaValue * measuredNaUnitValue,
                                    glucoseValue * glucoseUnitValue,
                                    this.state.NaSelectValue
                                )}
                            </Typography>
                            <TextField
                                select
                                value={this.state.NaSelectUnit}
                                onChange={this.handleSelectChange}
                                SelectProps={{ classes: { root: this.props.classes.select } }}
                                margin='normal'
                            >
                                {unitData.Na.map(option => (
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
