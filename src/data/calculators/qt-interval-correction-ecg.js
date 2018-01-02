import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import ResultCardHeader from '../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Decimal from '../components/Decimal/Decimal'


const unitData = {
    heartRate: [
        { value: 1, unit: 'bpm' }
    ],
    qtInterval: [
        { value: 0.001, unit: 'msec' },
        { value: 1, unit: 'sec' }
    ],
    correctedQTI: [
        { value: 0.001, unit: 'msec' },
        { value: 1, unit: 'sec' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        correctedQTISelectUnit: 'sec',
        correctedQTISelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        heartRate,
        qtInterval,
        selectValue
    ) => {
        // correctedQTI = qtInterval/ sqr(60/heartRate)
        const correctedQTI = qtInterval/Math.sqrt(60/heartRate)
        return (correctedQTI / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.correctedQTI, value)
        this.setState({ correctedQTISelectUnit: value, correctedQTISelectValue: selectValue })
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
        let heartRateValue = null
        let heartRateUnitValue = null
        let qtIntervalValue = null
        let qtIntervalUnitValue = null


        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    heartRateValue = input
                    heartRateUnitValue = filterUnit(unitData.heartRate, select)
                }
                if (index === 1) {
                    qtIntervalValue = input
                    qtIntervalUnitValue = filterUnit(unitData.qtInterval, select)
                }
            }
            return calculate
        })

        if (heartRateValue && qtIntervalValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <CardContent className={classes.content}>
                        <Typography type='caption' className={classes.contentText}>
                            Corrected QT Interval
                        </Typography>
                        <div className={classes.resultWrapper}>
                            <Typography type='title' className={classes.resultText}>
                                {this.handleCalc(
                                    heartRateValue * heartRateUnitValue,
                                    qtIntervalValue * qtIntervalUnitValue,
                                    this.state.correctedQTISelectValue
                                )}
                            </Typography>
                            <TextField
                                select
                                value={this.state.correctedQTISelectUnit}
                                onChange={this.handleSelectChange}
                                SelectProps={{ classes: { root: this.props.classes.select } }}
                                margin='normal'
                            >
                                {unitData.correctedQTI.map(option => (
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
