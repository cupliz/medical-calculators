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
    noduleDiameter: [
        { value: 1, unit: 'mm' },
        { value: 10, unit: 'cm' },
        { value: 25.4, unit: 'in' },
        { value: 0.001, unit: 'mcm'},
        { value: 1e-6, unit: 'nm'}
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        decimal: 2
    }

    handleCalc = (
        age,
        smoker,
        cancer,
        noduleDiameter,
        spiculation,
        upperlobe,
        selectValue
    ) => {
        // X = (0.0391 * Age) + (0.7917 * Smoker) + (1.3388 * Cancer) + (0.1274 * NoduleDiameter) + (1.0407 * Spiculation) + (0.7838 * UpperLobe) - 6.8272
        // MaligProbability = 100 * e(X) / ( 1 + e(X))
        const maligProb = 100 * ((Math.pow(2.718, ((0.0391 * age) + (0.7917 * smoker) + (1.3388 * cancer) + (0.1274 * noduleDiameter) + (1.0407 * spiculation) + (0.7838 * upperlobe) - 6.8272))) / (1 + Math.pow(2.718, ((0.0391 * age) + (0.7917 * smoker) + (1.3388 * cancer) + (0.1274 * noduleDiameter) + (1.0407 * spiculation) + (0.7838 * upperlobe) - 6.8272))))
        return `${maligProb.toFixed(this.state.decimal)}%`
    }

    render () {
        const { classes, data } = this.props
        const { questions } = data

        // extract needed field vars
        let ageValue = null
        let ageUnitValue = null
        let smokerValue = null
        let cancerValue = null
        let noduleDiameterValue = null
        let noduleDiameterUnitValue = null
        let spiculationValue = null
        let upperlobeValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    ageValue = input
                    ageUnitValue = filterUnit(unitData.age, select)
                }
                if (index === 1) {
                    smokerValue = calculate["points"]
                }
                if (index === 2) {
                    cancerValue = calculate["points"]
                }
                if (index === 3) {
                    noduleDiameterValue = input
                    noduleDiameterUnitValue = filterUnit(unitData.noduleDiameter, select)
                }
                if (index === 4) {
                    spiculationValue = calculate["points"]
                }
                if (index === 5) {
                    upperlobeValue = calculate["points"]
                }
            }
            return calculate
        })

        if (ageValue && smokerValue && cancerValue && noduleDiameterValue && spiculationValue && upperlobeValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <CardContent className={classes.content}>
                        <Typography type='caption' className={classes.contentText}>
                            Malignancy Probability %
                        </Typography>
                        <div className={classes.resultWrapper}>
                            <Typography type='title' className={classes.resultText}>
                                {this.handleCalc(
                                    ageValue * ageUnitValue,
                                    smokerValue,
                                    cancerValue,
                                    noduleDiameterValue * noduleDiameterUnitValue,
                                    spiculationValue,
                                    upperlobeValue
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
