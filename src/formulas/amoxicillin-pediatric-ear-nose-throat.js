import React from 'react'
import { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { ResultCardHeader } from '../components/Calculator/body/calculate/results/ResultCardHeader'
import math from 'mathjs'
import convert from 'convert-units'

const doseFormula = (weight, dosage) => {
  // Dose = Weight * Dosage
  return weight * dosage
}

const FormulaComponent = ({ classes, data }) => {
  // extract needed field vars

  const dosageValue =
    data.questions[0].calculate && data.questions[0].calculate.input
  const weightValue =
    data.questions[1].calculate && data.questions[1].calculate.input
  const dosageUnits =
    data.questions[0].calculate && data.questions[0].calculate.select.split('/')[0]
  const weightUnits =
    data.questions[1].calculate && data.questions[1].calculate.select

  console.log(dosageValue, dosageUnits)
  console.log(weightValue, weightUnits)

  if (dosageValue && weightValue) {
    return (
      <ResultCardHeader classes={classes}>
        <CardContent className={classes.content}>
          <Typography type='caption' className={classes.contentText}>
            Dose
          </Typography>
          <Typography type='title' className={classes.contentText}>
            {doseFormula(dosageValue, weightValue)}
          </Typography>
        </CardContent>
      </ResultCardHeader>
    )
  } else {
    return null
  }
}
export default FormulaComponent
