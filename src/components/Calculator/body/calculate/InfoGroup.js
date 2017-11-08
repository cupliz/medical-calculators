import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import MobileStepper from 'material-ui/MobileStepper'
import Button from 'material-ui/Button'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  infoGroup: {
    display: 'flex',
    borderBottom: `1px solid ${theme.brand.colors.separatorGrey}`,
    borderTop: `1px solid ${theme.brand.colors.separatorGrey}`,
    backgroundColor: theme.brand.colors.greyBg
  },
  content: {
    margin: `${theme.spacing.unit * 2}px`,
    flexGrow: 1
  },
  stepper: {
    maxWidth: 300,
    margin: '0 auto'
  },
  drugName: {

  },
  drugIndication: {

  },
  drugDosageInformation: {

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

  renderContentViews = (drugDosageInformation, classes) => {
    return drugDosageInformation.map((item, index) => (
      <div key={item.title}>
        <Typography
          type='body2'
          gutterBottom
          className={classes.drugDosageInformation}
        >
          {item.title}
        </Typography>
        {item.content.map(content => <p key={content}>{content}</p>)}
      </div>
    ))
  }

  render () {
    const { classes, theme, drugDosageInformation } = this.props

    return (
      <div className={classes.infoGroup}>
        <div className={classes.content}>
          <Typography type='title' gutterBottom className={classes.drugName}>
            {this.props.drugName}
          </Typography>
          <Typography
            type='body2'
            gutterBottom
            className={classes.drugIndication}
          >
            {this.props.drugIndication}
          </Typography>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.stepIndex}
            onChangeIndex={this.handleChangeIndex}
          >
            {this.renderContentViews(drugDosageInformation, classes)}
          </SwipeableViews>
          {drugDosageInformation.length > 1 && (
            <MobileStepper
              type='dots'
              steps={drugDosageInformation.length}
              position='static'
              activeStep={this.state.stepIndex}
              className={classes.stepper}
              nextButton={
                <Button
                  dense
                  onClick={this.handleNext}
                  disabled={
                    this.state.stepIndex === drugDosageInformation.length - 1
                  }
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
          )}
        </div>
      </div>
    )
  }
}

InfoGroup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(InfoGroup)
