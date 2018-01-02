import React, { Component } from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import ResultCardHeader from '../../components/Calculator/results/ResultCardHeader'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Decimal from '../../components/Decimal/Decimal'


const unitData = {
    serumNa: [
        { value: 1, unit: 'mEq/L' },
        { value: 1, unit: 'mmol/L' }
    ],
    serumCr: [
        { value: 1, unit: 'mg/dL' },
        { value: 0.011312217194570135, unit: 'µmol/L' }
    ],
    urineNa: [
        { value: 1, unit: 'mEq/L' },
        { value: 1, unit: 'mmol/L' }
    ],
    urineCr: [
        { value: 1, unit: 'mg/dL' },
        { value: 0.011312217194570135, unit: 'µmol/L' }
    ]
}

const filterUnit = (arr, select) =>
    arr.filter(item => (item.unit === select ? item.value : null))[0].value

class FormulaComponent extends Component {
    state = {
        decimal: 1
    }

    handleCalc = (
        serumNa,
        serumCr,
        urineNa,
        urineCr
    ) => {
        //FENa = (UrineNa / SerumNa) / (UrineCr / SerumCr) * 100
        const FENa = (urineNa / serumNa ) / (urineCr / serumCr ) * 100
        let label = ''
        if (FENa >= 4) {
            label = 'Post-renal/obstructive pathology; E.g. Bladder stones, bilateral ureter obstruction, Benign Prostatic Hyperplasia'
        } else if (FENa >= 1.0 && FENa < 4) {
            label = 'Intrinsic pathology; E.g. Acute tubular necrosis, Acute interstitial nephritis etc.'
        } else if (FENa < 1.0) {
            label = 'Pre-renal pathology; E.g. Heart failure, Renal artery stenosis, Hypovolemia etc.'
        }
        return `${FENa.toFixed(this.state.decimal)} % - ${label}`
    }


    render () {
        const { classes, data } = this.props
        const { questions } = data

        // extract needed field vars
        let serumNaValue = null
        let serumNaUnitValue = null
        let serumCrValue = null
        let serumCrUnitValue = null
        let urineNaValue = null
        let urineNaUnitValue = null
        let urineCrValue = null
        let urineCrUnitValue = null

        questions.map((question, index) => {
            const { calculate } = question
            if (calculate) {
                const { input, select } = calculate
                if (index === 0) {
                    serumNaValue = input
                    serumNaUnitValue = filterUnit(unitData.serumNa, select)
                }
                if (index === 1) {
                    serumCrValue = input
                    serumCrUnitValue = filterUnit(unitData.serumCr, select)
                }
                if (index === 2) {
                    urineNaValue = input
                    urineNaUnitValue = filterUnit(unitData.urineNa, select)
                }
                if (index === 3) {
                    urineCrValue = input
                    urineCrUnitValue = filterUnit(unitData.urineCr, select)
                }
            }
            return calculate
        })

        if (serumNaValue && serumCrValue && urineNaValue && urineCrValue) {
            return (
                <ResultCardHeader classes={classes}>
                    <CardContent className={classes.content}>
                        <Typography type='caption' className={classes.contentText}>
                            Fractional Excretion of Sodium (FeNa)
                        </Typography>
                        <div className={classes.resultWrapper}>
                            <Typography type='title' className={classes.resultText}>
                                {this.handleCalc(
                                    serumNaValue * serumNaUnitValue,
                                    serumCrValue * serumCrUnitValue,
                                    urineNaValue * urineNaUnitValue,
                                    urineCrValue * urineCrUnitValue
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
