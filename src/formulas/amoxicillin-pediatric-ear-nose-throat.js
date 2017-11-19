import React from 'react'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ShareIcon from 'material-ui-icons/Share'
import Typography from 'material-ui/Typography'

const formula = (weight, dosage) => {
  // Dose = Weight * Dosage
  return weight * dosage
}

const Formula = props => {
  const classes = props
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
          Points
        </Typography>
        <Typography type='title' className={classes.contentText}>
          123
        </Typography>
      </CardContent>
    </Card>
  )
}
export default Formula
