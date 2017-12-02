import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { ResultCardHeader } from '../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Decimal from '../components/Decimal/Decimal'

const unitData = {
    standardDose: [
        { value: 1, unit: 'mg' },
        { value: 1000, unit: 'g' },
        { value: 0.001, unit: 'mcg' }
    ],
    height: [
        { value: 1, unit: 'cm' },
        { value: 100, unit: 'm' },
        { value: 2.54, unit: 'in' }
    ],
    weight: [
        { value: 1, unit: 'kg' },
        { value: 0.453592, unit: 'lb' }
    ],
    adjustedDose: [
        { value: 1, unit: 'mg' },
        { value: 1000, unit: 'g' },
        { value: 0.001, unit: 'mcg' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        adjustedDoseSelectUnit: 'mg',
        adjustedDoseSelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        standardDose,
        height,
        weight,
        selectValue
    ) => {
        // AdjustedDose = StandardDose * BSA / 1.73
        // BSA = 0.007184 * Height^0.725 * Weight^0.425
        //console.log(standardDose)
        //console.log(height)
        //console.log(weight)
        const adjustedDose = (standardDose * ((0.007184 * Math.pow(height,0.725) * Math.pow(weight, 0.425)) / 1.73) )
        return (adjustedDose / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.adjustedDose, value)
        this.setState({ adjustedDoseSelectUnit: value, adjustedDoseSelectValue: selectValue })
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
        let standardDoseValue = null
        let standardDoseUnitValue = null
        let heightValue = null
        let heightUnitValue = null
        let weightValue = null
        let weightUnitValue = null


        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    standardDoseValue = input
                    standardDoseUnitValue = filterUnit(unitData.standardDose, select)
                }
                if (index === 1) {
                    heightValue = input
                    heightUnitValue = filterUnit(unitData.height, select)
                }
                if (index === 2) {
                    weightValue = input
                    weightUnitValue = filterUnit(unitData.weight, select)
                }
            }
            return calculate
        })

        if (standardDoseValue && heightValue && weightValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <CardContent className={classes.content}>
                        <Typography type='caption' className={classes.contentText}>
                            Adjusted Dose
                        </Typography>
                        <div className={classes.resultWrapper}>
                            <Typography type='title' className={classes.resultText}>
                                {this.handleCalc(
                                    standardDoseValue * standardDoseUnitValue,
                                    heightValue * heightUnitValue,
                                    weightValue * weightUnitValue,
                                    this.state.adjustedDoseSelectValue
                                )}
                            </Typography>
                            <TextField
                                select
                                value={this.state.adjustedDoseSelectUnit}
                                onChange={this.handleSelectChange}
                                SelectProps={{ classes: { root: this.props.classes.select } }}
                                margin='normal'
                            >
                                {unitData.adjustedDose.map(option => (
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
