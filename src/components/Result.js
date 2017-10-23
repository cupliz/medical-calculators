import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import ShareIcon from 'material-ui-icons/Share'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  card: {
    minWidth: 275
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary
  }
})

const Result = props => {
  const { classes } = props

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          title={
            <div>
              <Typography type='title'>Result</Typography>
              <IconButton aria-label='Share'>
                <ShareIcon />
              </IconButton>
            </div>
          }
        />
        <CardContent>
          <Typography type='caption'>Points</Typography>
          <Typography type='title'>3</Typography>
          <Typography type='caption'>
            Stroke risk was 3.2% per year in >90,000 patients (the Swedish
            Atrial Fibrillation Cohort Study) and 4.6% risk of
            stroke/TIA/systemic embolism.
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

Result.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Result)
