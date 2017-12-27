import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import ResultCardHeader from '../components/Calculator/results/ResultCardHeader'
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
    bloodVol: [
        { value: 1, unit: 'mL' },
        { value: 1000, unit: 'L' },
        { value: 29.5735, unit: 'fL oz' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        bloodVolSelectUnit: 'mL',
        bloodVolSelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        weight,
        avgBloodVol,
        selectValue
    ) => {
        // BloodVol = Weight * AvgBloodVol
        const bloodVol = weight * avgBloodVol
        return (bloodVol / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.bloodVol, value)
        this.setState({ bloodVolSelectUnit: value, bloodVolSelectValue: selectValue })
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
        let avgBloodVolValue = null
        let weightValue = null
        let weightUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                if (index === 0) {
                    avgBloodVolValue = calculate["points"]
                }
                else {
                    const { input, select } = calculate
                    if (index === 1) {
                        weightValue = input
                        weightUnitValue = filterUnit(unitData.weight, select)
                    }
                }
            }
            return calculate
        })

        if (avgBloodVolValue && weightValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <CardContent className={classes.content}>
                        <Typography type='caption' className={classes.contentText}>
                            Blood Volume
                        </Typography>
                        <div className={classes.resultWrapper}>
                            <Typography type='title' className={classes.resultText}>
                                {this.handleCalc(
                                    avgBloodVolValue,
                                    weightValue * weightUnitValue,
                                    this.state.bloodVolSelectValue
                                )}
                            </Typography>
                            <TextField
                                select
                                value={this.state.bloodVolSelectUnit}
                                onChange={this.handleSelectChange}
                                SelectProps={{ classes: { root: this.props.classes.select } }}
                                margin='normal'
                            >
                                {unitData.bloodVol.map(option => (
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
