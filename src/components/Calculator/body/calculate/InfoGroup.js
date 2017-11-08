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
      .spacing.unit * 2}px`,
    flexGrow: 1
  },
  stepper: {
    maxWidth: 300,
    margin: '0 auto'
  }
})

class InfoGroup extends Component {
  state = {
    stepIndex: 0
  }

  handleNext = () => {
    this.setState({
      stepIndex: this.state.stepIndex + 1
    })
  }

  handleBack = () => {
    this.setState({
      stepIndex: this.state.stepIndex - 1
    })
  }

  handleChangeIndex = index => {
    this.setState({ stepIndex: index })
  }

  render () {
    const { classes, theme } = this.props

    return (
      <div className={classes.infoGroup}>
        <div className={classes.content}>
          <p>{this.props.drugName}</p>
          <p>{this.props.drugIndication}</p>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.stepIndex}
            onChangeIndex={this.handleChangeIndex}
          >
            <div>1
            </div>
            <div>2</div>
            <div>3</div>
          </SwipeableViews>
          { this.props.drugDosageInformation.length > 0 &&
            <MobileStepper
              type='dots'
              steps={3}
              position='static'
              activeStep={this.state.stepIndex}
              className={classes.stepper}
              nextButton={
                <Button
                  dense
                  onClick={this.handleNext}
                  disabled={this.state.stepIndex === 2}
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
                  disabled={this.state.stepIndex === 0}
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
          }
        </div>
      </div>
    )
  }
}

InfoGroup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(InfoGroup)
