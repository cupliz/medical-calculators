import React from 'react'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ShareIcon from 'material-ui-icons/Share'
import Typography from 'material-ui/Typography'

const doseFormula = (weight, dosage) => {
  // Dose = Weight * Dosage
  return weight * dosage
}

const liquidDoseFormula = (weight, dosage) => {
  // Dose = Weight * Dosage
  return weight * dosage
}

const FormulaComponent = props => {
  const { classes, data } = props
  const dosage = data.questions[0].calculate && data.questions[0].calculate.input
  const weight = data.questions[1].calculate && data.questions[1].calculate.input

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        title={
          <div className={classes.titleWrapper}>
            <Typography type='title' className={classes.title}>
              Result
            </Typography>
            <IconButton aria-label='Share'>
              <ShareIcon className={classes.shareIcon} />
            </IconButton>
          </div>
        }
      />
      <CardContent className={classes.content}>
        <Typography type='caption' className={classes.contentText}>
          Dose
        </Typography>
        <Typography type='title' className={classes.contentText}>
          { dosage && weight && doseFormula(dosage, weight) }
        </Typography>
      </CardContent>
    </Card>
  )
}
export default FormulaComponent
