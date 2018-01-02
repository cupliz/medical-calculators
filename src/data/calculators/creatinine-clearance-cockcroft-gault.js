import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Decimal from '../../components/Decimal/Decimal'

const unitData = {
    age: [
        { value: 1, unit: 'yr' },
        { value: 1 / 12, unit: 'mo' }
    ],
    serumCreatinine: [
        { value: 100, unit: 'mg/mL' },
        { value: 1, unit: 'mg%' },
        { value: 1, unit: 'mg/dL' },
        { value: 100, unit: 'g/L'},
        { value: 1000, unit: 'g/dL'}
    ],
    weight: [
        { value: 0.453592, unit: 'lb' },
        { value: 1, unit: 'kg' }
    ],
    creatClear: [
        { value: 1000, unit: 'L/min' },
        { value: 60000, unit: 'L/sec' },
        { value: 0.01666666667, unit: 'mL/hr' },
        { value: 1, unit: 'mL/min' },
        { value: 60, unit: 'mL/sec' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        creatClearSelectUnit: 'mL/min',
        creatClearSelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        gender,
        age,
        serumCreatinine,
        weight,
        selectValue
    ) => {
        // CreatClear = Sex * ((140 - Age) / (SerumCreat)) * (Weight / 72)
        // console.log("gender " + gender)
        // console.log(age)
        // console.log(serumCreatinine)
        // console.log(weight)
        const creatClear = gender * ((140-age) / (serumCreatinine)) * (weight / 72)
        // console.log(creatClear)
        return (creatClear / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.creatClear, value)
        this.setState({ creatClearSelectUnit: value, creatClearSelectValue: selectValue })
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
        let ageValue = null
        let ageUnitValue = null
        let serumCreatinineValue = null
        let serumCreatinineUnitValue = null
        let weightValue = null
        let weightUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                if (index === 0) {
                    genderValue = calculate["points"]
                }
                else {
                    const { input, select } = calculate
                    if (index === 1) {
                        ageValue = input
                        ageUnitValue = filterUnit(unitData.age, select)
                    }
                    if (index === 2) {
                        serumCreatinineValue = input
                        serumCreatinineUnitValue = filterUnit(unitData.serumCreatinine, select)
                    }
                    if (index === 3) {
                        weightValue = input
                        weightUnitValue = filterUnit(unitData.weight, select)
                    }
                }
            }
            return calculate
        })

        if (genderValue && ageValue && serumCreatinineValue && weightValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <CardContent className={classes.content}>
                        <Typography type='caption' className={classes.contentText}>
                            Creatinine Clearance
                        </Typography>
                        <div className={classes.resultWrapper}>
                            <Typography type='title' className={classes.resultText}>
                                {this.handleCalc(
                                    genderValue,
                                    ageValue * ageUnitValue,
                                    serumCreatinineValue * serumCreatinineUnitValue,
                                    weightValue * weightUnitValue,
                                    this.state.creatClearSelectValue
                                )}
                            </Typography>
                            <TextField
                                select
                                value={this.state.creatClearSelectUnit}
                                onChange={this.handleSelectChange}
                                SelectProps={{ classes: { root: this.props.classes.select } }}
                                margin='normal'
                            >
                                {unitData.creatClear.map(option => (
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
