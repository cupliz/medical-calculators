import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import ResultCardHeader from '../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Decimal from '../components/Decimal/Decimal'

const unitData = {
    height: [
        { value: 1, unit: 'in' },
        { value: 0.393701, unit: 'cm' },
        { value: 39.3701, unit: 'm' },
        { value: 12, unit: 'ft' }
    ],
    weight: [
        { value: 0.453592, unit: 'lb' },
        { value: 1, unit: 'kg' },
        { value: 0.001, unit: 'g' },
        { value: 1e-6, unit: 'mg' }
    ],
    idealbodyweight: [
        { value: 0.453592, unit: 'lb' },
        { value: 1, unit: 'kg' },
        { value: 0.001, unit: 'g' },
        { value: 1e-6, unit: 'mg' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        idealbodyweightSelectUnit: 'kg',
        idealbodyweightSelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        gender,
        height,
        selectValue
    ) => {
        // Ideal Body Weight = Gender + 2.3 * (Height - 60)
        const idealbodyweight = gender + 2.3 * (height - 60)
        return (idealbodyweight / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.idealbodyweight, value)
        this.setState({ idealbodyweightSelectUnit: value, idealbodyweightSelectValue: selectValue })
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
        let heightValue = null
        let heightUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                if (index === 0) {
                    genderValue = calculate["points"]
                }
                else {
                    const { input, select } = calculate
                    if (index === 1) {
                        heightValue = input
                        heightUnitValue = filterUnit(unitData.height, select)
                    }
                }
            }
            return calculate
        })

        if (genderValue && heightValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <CardContent className={classes.content}>
                        <Typography type='caption' className={classes.contentText}>
                            Ideal Body Weight
                        </Typography>
                        <div className={classes.resultWrapper}>
                            <Typography type='title' className={classes.resultText}>
                                {this.handleCalc(
                                    genderValue,
                                    heightValue * heightUnitValue,
                                    this.state.idealbodyweightSelectValue
                                )}
                            </Typography>
                            <TextField
                                select
                                value={this.state.idealbodyweightSelectUnit}
                                onChange={this.handleSelectChange}
                                SelectProps={{ classes: { root: this.props.classes.select } }}
                                margin='normal'
                            >
                                {unitData.idealbodyweight.map(option => (
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
