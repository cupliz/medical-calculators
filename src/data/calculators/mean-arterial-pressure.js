import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Decimal from '../../components/Decimal/Decimal'


const unitData = {
    systolicBP: [
        { value: 1, unit: 'mmHg' }
    ],
    diastolicBP: [
        { value: 1, unit: 'mmHg' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        decimal: 0
    }

    handleCalc = (
        systolicBP,
        diastolicBP
    ) => {
        // Mean Arterial Pressure = (⅓ ⨉ Systolic BP) + (⅔ ⨉ Diastolic BP)
        const map = (1/3 * systolicBP) + (2/3 * diastolicBP)
        return `${map.toFixed(this.state.decimal)} mmHg`
    }


    render () {
        const { classes, data } = this.props
        const { questions } = data

        // extract needed field vars
        let systolicBPValue = null
        let systolicBPUnitValue = null
        let diastolicBPValue = null
        let diastolicBPUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    systolicBPValue = input
                    systolicBPUnitValue = filterUnit(unitData.systolicBP, select)
                }
                if (index === 1) {
                    diastolicBPValue = input
                    diastolicBPUnitValue = filterUnit(unitData.diastolicBP, select)
                }
            }
            return calculate
        })

        if (systolicBPValue && diastolicBPValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <CardContent className={classes.content}>
                        <Typography type='caption' className={classes.contentText}>
                            Mean Arterial Pressure
                        </Typography>
                        <div className={classes.resultWrapper}>
                            <Typography type='title' className={classes.resultText}>
                                {this.handleCalc(
                                    systolicBPValue * systolicBPUnitValue,
                                    diastolicBPValue * diastolicBPUnitValue
                                )}
                            </Typography>

                        </div>
                    </CardContent>
                </ResultCardHeader>
            )
        } else {
            return null
        }
    }
}
export default FormulaComponent
