import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import ResultCardHeader from '../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Decimal from '../components/Decimal/Decimal'

const unitData = {
    calcium: [
        { value: 18.01801801801802, unit: 'mmol/L' },
        { value: 1, unit: 'mg/dL' }
    ],
    albumin: [
        { value: 0.1, unit: 'g/L' },
        { value: 1, unit: 'g/dL' }
    ],
    normAlb: [
        { value: 0.1, unit: 'g/L' },
        { value: 1, unit: 'g/dL' }
    ],
    correctedCa: [
        { value: 18.01801801801802, unit: 'mmol/L' },
        { value: 1, unit: 'mg/dL' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        correctedCaSelectUnit: 'mg/dL',
        correctedCaSelectValue: 1,
        decimal: 1
    }

    handleCalc = (
        calcium,
        albumin,
        normAlb,
        selectValue
    ) => {
        // Corrected Calcium = (0.8 * (Normal Albumin - Pt's Albumin)) + Serum Ca
        const correctedCa = (0.8 * ( normAlb - albumin)) + calcium
        return (correctedCa / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.correctedCa, value)
        this.setState({ correctedCaSelectUnit: value, correctedCaSelectValue: selectValue })
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
        let calciumValue = null
        let calciumUnitValue = null
        let albuminValue = null
        let albuminUnitValue = null
        let normAlbValue = null
        let normAlbUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    calciumValue = input
                    calciumUnitValue = filterUnit(unitData.calcium, select)
                }
                if (index === 1) {
                    albuminValue = input
                    albuminUnitValue = filterUnit(unitData.albumin, select)
                }
                if (index === 2) {
                    normAlbValue = input
                    normAlbUnitValue = filterUnit(unitData.normAlb, select)
                }
            }
            return calculate
        })

        if (calciumValue && albuminValue && normAlbValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <CardContent className={classes.content}>
                        <Typography type='caption' className={classes.contentText}>
                            Corrected Calcium
                        </Typography>
                        <div className={classes.resultWrapper}>
                            <Typography type='title' className={classes.resultText}>
                                {this.handleCalc(
                                    calciumValue * calciumUnitValue,
                                    albuminValue * albuminUnitValue,
                                    normAlbValue * normAlbUnitValue,
                                    this.state.correctedCaSelectValue
                                )}
                            </Typography>
                            <TextField
                                select
                                value={this.state.correctedCaSelectUnit}
                                onChange={this.handleSelectChange}
                                SelectProps={{ classes: { root: this.props.classes.select } }}
                                margin='normal'
                            >
                                {unitData.correctedCa.map(option => (
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
