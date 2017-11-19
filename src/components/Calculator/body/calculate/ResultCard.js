import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ShareIcon from 'material-ui-icons/Share'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  card: {
    minWidth: 275
  },
  header: {
    paddingBottom: 0
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center'
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
  contentText: {
    marginBottom: 15
  }
})

const renderResult = (classes, points, data) => {
  if (points === 0 && !data) {
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
          <Typography type='caption' className={classes.contentText}>
            Points
          </Typography>
          <Typography type='title' className={classes.contentText}>
            {points}
          </Typography>
          {data && data.map(item => (
            <Typography
              key={`${points}-${item}`}
              type='caption'
              className={classes.contentText}
            >
              {item}
            </Typography>
          ))}
        </CardContent>
      </Card>
    )
  }
}

const ResultCard = props => {
  const { classes, points, data } = props

  return renderResult(classes, points, data)
}

ResultCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ResultCard)
