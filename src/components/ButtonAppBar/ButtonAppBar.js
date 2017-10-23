import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import MoreIcon from 'material-ui-icons/MoreVert'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%'
  },
  flex: {
    flex: 1
  },
  closeButton: {
    marginLeft: -12,
    marginRight: 20
  }
})

function ButtonAppBar (props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            className={classes.closeButton}
            color='contrast'
            aria-label='Close'
          >
            <CloseIcon />
          </IconButton>
          <Typography type='title' color='inherit' className={classes.flex}>
            Title
          </Typography>
          <IconButton
            color='contrast'
            aria-label='More'
          >
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonAppBar)
