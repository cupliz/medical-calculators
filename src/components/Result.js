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
  titleWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  header: {
    paddingBottom: 0
  },
  title: {
    flex: 1,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontSize: 14,
    fontWeight: 'bold'
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary
  },
  shareIcon: {
    width: 16,
    height: 16
  },
  content: {
    paddingTop: 10
  },
  resultText: {
    marginBottom: 15
  }
})

const Result = props => {
  const { classes } = props

  return (
    <div>
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
          <Typography type='caption' className={classes.resultText}>
            Points
          </Typography>
          <Typography type='title' className={classes.resultText}>
            {props.points}
          </Typography>
          <Typography type='caption' className={classes.resultText}>
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
