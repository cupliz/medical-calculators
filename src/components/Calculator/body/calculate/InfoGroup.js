import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import MobileStepper from 'material-ui/MobileStepper'
import Button from 'material-ui/Button'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'

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
    const { classes, theme } = this.props

    return (
      <div className={classes.infoGroup}>
        <div className={classes.content}>
          <MobileStepper
            type='dots'
            steps={6}
            position='static'
            activeStep={this.state.activeStep}
            className={classes.root}
            nextButton={
              <Button
                dense
                onClick={this.handleNext}
                disabled={this.state.activeStep === 5}
              >
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                dense
                onClick={this.handleBack}
                disabled={this.state.activeStep === 0}
              >
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
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
