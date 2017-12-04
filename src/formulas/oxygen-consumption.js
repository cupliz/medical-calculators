import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { ResultCardHeader } from '../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Decimal from '../components/Decimal/Decimal'
//values": ["mL/min", "mL/sec", "mL/h","L/min", "L/sec"
const unitData = {
    volExp: [
        { value: 1, unit: 'mL/min' },
        { value: 60, unit: 'mL/sec' },
        { value: 0.02, unit: 'mL/h' },
        { value: 1000, unit: 'L/min' },
        { value: 60000, unit: 'L/sec' }
    ],
    fiO2: [
        { value: 1, unit: 'fraction' },
        { value: 0.01, unit: '%' }
    ],
    feO2: [
        { value: 1, unit: 'fraction' },
        { value: 0.01, unit: '%' }
    ],
    volO2: [
        { value: 1, unit: 'mL/min' },
        { value: 60, unit: 'mL/sec' },
        { value: 0.02, unit: 'mL/h' },
        { value: 1000, unit: 'L/min' },
        { value: 60000, unit: 'L/sec' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        volO2SelectUnit: 'mL/min',
        volO2SelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        volExp,
        fiO2,
        feO2,
        selectValue
    ) => {
        // VO2 = VExp * ( FIO2 - FEO2 )
        const volO2 = volExp * ( fiO2 - feO2 )
        return (volO2 / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.volO2, value)
        this.setState({ volO2SelectUnit: value, volO2SelectValue: selectValue })
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
        let volExpValue = null
        let volExpUnitValue = null
        let fiO2Value = null
        let fiO2UnitValue = null
        let feO2Value = null
        let feO2UnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    volExpValue = input
                    volExpUnitValue = filterUnit(unitData.volExp, select)
                }
                if (index === 1) {
                    fiO2Value = input
                    fiO2UnitValue = filterUnit(unitData.fiO2, select)
                }
                if (index === 2) {
                    feO2Value = input
                    feO2UnitValue = filterUnit(unitData.feO2, select)
                }
            }
            return calculate
        })

        if (volExpValue && fiO2Value && feO2Value) {
            return (
                <ResultCardHeader classes={classes}>
                    <CardContent className={classes.content}>
                        <Typography type='caption' className={classes.contentText}>
                            Oxygen Consumption
                        </Typography>
                        <div className={classes.resultWrapper}>
                            <Typography type='title' className={classes.resultText}>
                                {this.handleCalc(
                                    volExpValue * volExpUnitValue,
                                    fiO2Value * fiO2UnitValue,
                                    feO2Value * feO2UnitValue,
                                    this.state.volO2SelectValue
                                )}
                            </Typography>
                            <TextField
                                select
                                value={this.state.volO2SelectUnit}
                                onChange={this.handleSelectChange}
                                SelectProps={{ classes: { root: this.props.classes.select } }}
                                margin='normal'
                            >
                                {unitData.volO2.map(option => (
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
