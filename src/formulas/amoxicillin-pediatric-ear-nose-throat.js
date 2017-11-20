import React from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { ResultCardHeader } from '../components/Calculator/body/calculate/results/ResultCardHeader'

const doseFormula = (dosageValue, dosageUnit, weightValue, weightUnit) => {
  // Dose = Weight * Dosage
  return dosageValue * dosageUnit * weightValue * weightUnit
}

const dosageUnitData = [
  { value: 1000, unit: 'gm/kg' },
  { value: 0.001, unit: 'mcg/kg' },
  { value: 1, unit: 'mg/kg' }
]

const weightUnitData = [
  { value: 1, unit: 'kg' },
  { value: 0.45359237, unit: 'lb' }
]

const medAmountUnitData = [
  { value: 1000, unit: 'gm' },
  { value: 0.001, unit: 'mcg' },
  { value: 1, unit: 'mg' }
]

const perVolumeUnitData = [
  { value: 1000, unit: 'L' },
  { value: 1, unit: 'mL' }
]

const doseUnitData = [
  { value: 2000, unit: 'gm BID' },
  { value: 1000, unit: 'gm Daily' },
  { value: 4000, unit: 'gm QID' },
  { value: 3000, unit: 'gm TID' },
  { value: 24000, unit: 'gm q1 hr' },
  { value: 12000, unit: 'gm q2 hr' },
  { value: 6000, unit: 'gm q4 hr' },
  { value: 0.002, unit: 'mcg BID' },
  { value: 0.001, unit: 'mcg Daily' },
  { value: 0.004, unit: 'mcg QID' },
  { value: 0.003, unit: 'mcg TID' },
  { value: 0.024, unit: 'mcg q1 hr' },
  { value: 0.012, unit: 'mcg q2 hr' },
  { value: 0.006, unit: 'mcg q4 hr' },
  { value: 2, unit: 'mg BID' },
  { value: 1, unit: 'mg Daily' },
  { value: 4, unit: 'mg QID' },
  { value: 3, unit: 'mg TID' },
  { value: 24, unit: 'mg q1 hr' },
  { value: 12, unit: 'mg q2 hr' },
  { value: 6, unit: 'mg q4 hr' }
]

const liquidDoseUnitData = [
  { value: 2000, unit: 'L BID' },
  { value: 1000, unit: 'L Daily' },
  { value: 4000, unit: 'L QID' },
  { value: 3000, unit: 'L TID' },
  { value: 24000, unit: 'L q1 hr' },
  { value: 12000, unit: 'L q2 hr' },
  { value: 6000, unit: 'L q4 hr' },
  { value: 2, unit: 'mL BID' },
  { value: 1, unit: 'mL Daily' },
  { value: 4, unit: 'mL QID' },
  { value: 3, unit: 'mL TID' },
  { value: 24, unit: 'mL q1 hr' },
  { value: 12, unit: 'mL q2 hr' },
  { value: 6, unit: 'mL q4 hr' }
]

const FormulaComponent = ({ classes, data }) => {
  // extract needed field vars
  let dosageValue = null
  let dosageUnit = null
  let weightValue = null
  let weightUnit = null

  if (data.questions[0].calculate) {
    dosageValue = data.questions[0].calculate.input
    dosageUnit = data.questions[0].calculate.select
  }

  if (data.questions[1].calculate) {
    weightValue = data.questions[1].calculate.input
    weightUnit = data.questions[1].calculate.select
  }

  console.log(dosageValue, dosageUnit)
  console.log(weightValue, weightUnit)

  if (dosageValue && weightValue) {
    return (
      <ResultCardHeader classes={classes}>
        <CardContent className={classes.content}>
          <Typography type='caption' className={classes.contentText}>
            Dose
          </Typography>
          <Typography type='title' className={classes.contentText}>
            {doseFormula(dosageValue, dosageUnit, weightValue, weightUnit)}
          </Typography>
        </CardContent>
      </ResultCardHeader>
    )
  } else {
    return null
  }
}
export default FormulaComponent
