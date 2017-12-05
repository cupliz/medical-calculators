import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { ResultCardHeader } from '../components/Calculator/results/ResultCardHeader'

const getCalculateGroupPoints = calculate => {
    return calculate
        .map(item => parseFloat(item.points))
        .reduce((previousValue, currentValue) => previousValue + currentValue)
}

class FormulaComponent extends Component {
    state = {}

    handleFormulaCalc = (
        feV1,
        symptomburden,
        exacerbation,
        classes
    ) => {
        // Diagnostic : 2 Major Criteria and 0 Minor Criteria
        // Diagnostic : 1 Major Criteria and 3 Minor Criteria
        // Diagnostic : 0 Major Criteria and 5 Minor Criteria
        if (
            (feV1 >= 1 && symptomburden === 1 && exacerbation ===1 )
        ) {
            return (
                <Typography type='title' className={classes.contentText}>
                    Gold A - Low risk, low symptom burden
                    <div>
                        <Typography type='title' className={classes.resultTextNoBold}>
                        3 year mortality : 3.8%
                        </Typography>
                    </div>
                    <div>
                        <Typography type='title' className={classes.resultTextNoBold}>
                        Treatment: Bronchodilator (long or short acting)
                        </Typography>
                    </div>
                </Typography>
            )
        }
        if (
            (feV1 >= 1 && symptomburden === 2 && exacerbation ===1 )
        ) {
            return (
                <Typography type='title' className={classes.contentText}>
                    Gold B - Low risk, higher symptom  burden
                    <div>
                        <Typography type='title' className={classes.resultTextNoBold}>
                        3 year mortality : 10.6%
                        </Typography>
                    </div>
                    <div>
                        <Typography type='title' className={classes.resultTextNoBold}>
                        Treatment: Long-acting bronchodilator (LABA) or long-acting methacholine antagonist (LAMA)
                        </Typography>
                    </div>
                </Typography>
            )
        }
        if (
            (feV1 >= 1 && symptomburden === 1 && exacerbation ===2 )
        ) {
            return (
                <Typography type='title' className={classes.contentText}>
                    Gold C - High risk, low symptom burden
                    <div>
                        <Typography type='title' className={classes.resultTextNoBold}>
                        3 year mortality : 8.2%
                        </Typography>
                    </div>
                    <div>
                        <Typography type='title' className={classes.resultTextNoBold}>
                    Treatment: LAMA (or LAMA + LABA, or LABA + ICS (inhaled corticosteroids) if frequent exacerbations)
                        </Typography>
                    </div>
                </Typography>
            )
        }
        if (
            (feV1 >= 1 && symptomburden === 2 && exacerbation ===2 )
        ) {
            return (
                <Typography type='title' className={classes.contentText}>
                    Gold D - High risk, high symptom burden
                    <div>
                        <Typography type='title' className={classes.resultTextNoBold}>
                        3 year mortality : 20.1%
                        </Typography>
                    </div>
                    <div>
                        <Typography type='title' className={classes.resultTextNoBold}>
                        Treatment: LAMA and LABA, plus inhaled corticosteroid (ICS) if frequent exacerbations
                        </Typography>
                    </div>
                </Typography>
            )
        } else {
            return (
                <Typography type='title' className={classes.contentText}>
                    Please fill in criteria
                </Typography>
            )
        }


    }

    render () {
        const { classes, data } = this.props
        const { questions } = data

        // extract needed field vars
        let feV1Value = 0
        let symptomburdenValue = 0
        let exacerbationValue = 0

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                if (index === 0) {
                    feV1Value = calculate["points"]
                }
                if (index === 1) {
                    symptomburdenValue = calculate["points"]
                }
                if (index === 2) {
                    exacerbationValue = calculate["points"]
                }
            }

            return calculate
        })

        if (feV1Value && symptomburdenValue && exacerbationValue ) {
            return (
                <ResultCardHeader classes={classes}>
                    <CardContent className={classes.content}>
                        {this.handleFormulaCalc(
                            feV1Value,
                            symptomburdenValue,
                            exacerbationValue,
                            classes
                        )}

                        <div className={classes.resultWrapper}>
                            <Typography type='title' className={classes.contentText}>
                               Gold {feV1Value} airflow obstruction
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
