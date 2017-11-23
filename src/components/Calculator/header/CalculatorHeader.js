import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import MoreIcon from 'material-ui-icons/MoreVert'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { cleanCalculator } from '../../../store/modules/calculator'

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

const CalculatorHeader = props => {
  const { classes, title } = props

  const handleClick = () => {
    props.changePage()
    props.cleanCalculator()
  }

  return (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar>
        <IconButton
          className={classes.closeButton}
          color='contrast'
          aria-label='Close'
          onClick={handleClick}
        >
          <CloseIcon />
        </IconButton>
        <Typography type='title' color='inherit' className={classes.title}>
          {title}
        </Typography>
        <IconButton color='contrast' aria-label='More'>
          <MoreIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

CalculatorHeader.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapDispatchToProps = {
  changePage: () => push('/'),
  cleanCalculator: cleanCalculator
}

export default connect(null, mapDispatchToProps)(
  withStyles(styles)(CalculatorHeader)
)
