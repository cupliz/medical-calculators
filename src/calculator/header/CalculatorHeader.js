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
  title: {
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  appBar: {
    backgroundColor: theme.brand.colors.primary
  },
  closeButton: {
    marginLeft: -12,
    marginRight: 20
  }
})

function CalculatorHeader (props) {
  const { classes } = props
  return (
    <div>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.closeButton}
            color='contrast'
            aria-label='Close'
          >
            <CloseIcon />
          </IconButton>
          <Typography type='title' color='inherit' className={classes.title}>
            CHADS2 Score for Atrial Fibrillation Lorem ipsum dolor sit amet.
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

CalculatorHeader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CalculatorHeader)
