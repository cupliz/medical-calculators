import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import ResultCardHeader from '../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Decimal from '../components/Decimal/Decimal'
//"values": "mmHg", "psi", "atm", "Pa", "torr"

const unitData = {
    hemoglobin: [
        { value: 1e-6, unit: 'mcg/dL' },
        { value: 0.0001, unit: 'mcg/mL' },
        { value: 0.001, unit: 'mg%' },
        { value: 0.001, unit: 'mg/dL' },
        { value: 0.01, unit: 'mg/mL' },
        { value: 1e-7, unit: 'ng/mL' },
        { value: 1, unit: 'g/dL' },
        { value: 0.1, unit: 'g/L' }
    ],
    o2sat: [
        { value: 1, unit: '%' },
        { value: 100, unit: 'fraction' },
        { value: 100, unit: 'ratio' }
    ],
    pao2: [
        { value: 1, unit: 'mmHg' },
        { value: 51.7149326, unit: 'psi' },
        { value: 1, unit: 'atm' },
        { value: 0.00750062, unit: 'Pa' },
        { value: 1, unit: 'torr' }
    ],
    CaO2: [
        { value: 1, unit: 'vol%' },
        { value: 0.1, unit: 'mL/L' },
        { value: 1, unit: 'mL/dL' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        CaO2SelectUnit: 'mL/L',
        CaO2SelectValue: 1,
        decimal: 2
    }

    handleCalc = (
        hemoglobin,
        o2sat,
        pao2,
        selectValue
    ) => {
        // CvO2 = ( Hgb * 13.4 * O2Sat / 100 ) + ( PaO2 * 0.031 )
        const CaO2 = (hemoglobin * 13.4 * o2sat /100) + ( pao2 * 0.031 )
        return (CaO2 / selectValue).toFixed(this.state.decimal)
    }

    handleSelectChange = event => {
        const { value } = event.target
        let selectValue = filterUnit(unitData.CaO2, value)
        this.setState({ CaO2SelectUnit: value, CaO2SelectValue: selectValue })
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
        let hemoglobinValue = null
        let hemoglobinUnitValue = null
        let o2satValue = null
        let o2satUnitValue = null
        let pao2Value = null
        let pao2UnitValue = null


        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    hemoglobinValue = input
                    hemoglobinUnitValue = filterUnit(unitData.hemoglobin, select)
                }
                if (index === 1) {
                    o2satValue = input
                    o2satUnitValue = filterUnit(unitData.o2sat, select)
                }
                if (index === 2) {
                    pao2Value = input
                    pao2UnitValue = filterUnit(unitData.pao2, select)
                }
            }
            return calculate
        })

        if (hemoglobinValue && o2satValue && pao2Value) {
            return (
                <ResultCardHeader classes={classes}>
                    <CardContent className={classes.content}>
                        <Typography type='caption' className={classes.contentText}>
                            CvO2
                        </Typography>
                        <div className={classes.resultWrapper}>
                            <Typography type='title' className={classes.resultText}>
                                {this.handleCalc(
                                    hemoglobinValue * hemoglobinUnitValue,
                                    o2satValue * o2satUnitValue,
                                    pao2Value * pao2UnitValue,
                                    this.state.CaO2SelectValue
                                )}
                            </Typography>
                            <TextField
                                select
                                value={this.state.CaO2SelectUnit}
                                onChange={this.handleSelectChange}
                                SelectProps={{ classes: { root: this.props.classes.select } }}
                                margin='normal'
                            >
                                {unitData.CaO2.map(option => (
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
