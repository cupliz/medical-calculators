import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'

const styles = theme => ({
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
})

const Loader = props => {
  const { classes } = props
  return (
    <div>
      <CircularProgress className={classes.progress} />
    </div>
  )
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Loader)
