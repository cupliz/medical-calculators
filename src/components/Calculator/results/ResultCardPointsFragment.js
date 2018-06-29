import React from 'react'
import Typography from '@material-ui/core/Typography'

const ResultCardPointsFragment = props => {
  const { classes, content, short } = props
  if (short) {
    return (
      <Typography className={`${classes.contentText} ${classes.shortFragment}`}>
        {`Points: ${content}`}
      </Typography>
    )
  } else {
    return (
      <React.Fragment>
        <Typography type='caption' className={classes.contentText}>
          Points
        </Typography>
        <Typography type='title' className={classes.contentText}>
          {content}
        </Typography>
      </React.Fragment>
    )
  }
}

export default ResultCardPointsFragment
