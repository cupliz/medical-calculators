import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ShareIcon from 'material-ui-icons/Share'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  card: {
    minWidth: 275,
    position: 'absolute',
    bottom: 0
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

const renderResult = (classes, points, data) => {
  if (points === 0) {
    return null
  } else {
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
          <Typography type='caption' className={classes.resultText}>
            Points
          </Typography>
          <Typography type='title' className={classes.resultText}>
            {points}
          </Typography>
          {data.map(item => (
            <Typography key={`${points}-${item}`} type='caption' className={classes.resultText}>
              {item}
            </Typography>
          ))}
        </CardContent>
      </Card>
    )
  }
}

const Result = props => {
  const { classes, points, data } = props

  return renderResult(classes, points, data)
}

Result.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Result)
