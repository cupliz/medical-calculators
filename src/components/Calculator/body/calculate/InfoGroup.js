import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'

const styles = theme => ({
  infoGroup: {
    display: 'flex',
    borderBottom: `1px solid ${theme.brand.colors.separatorGrey}`,
    borderTop: `1px solid ${theme.brand.colors.separatorGrey}`,
    backgroundColor: theme.brand.colors.greyBg
  },
  content: {
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 0 ${theme
      .spacing.unit * 2}px`
  }
})

class InfoGroup extends Component {
  state = {
    tabIndex: 0
  }

  handleChangeIndex = index => {
    this.setState({ tabIndex: index })
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.infoGroup}>
        <div className={classes.content}>
          <SwipeableViews
            index={this.state.tabIndex}
            onChangeIndex={this.handleChangeIndex}
          >
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </SwipeableViews>
        </div>
      </div>
    )
  }
}

InfoGroup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(InfoGroup)
