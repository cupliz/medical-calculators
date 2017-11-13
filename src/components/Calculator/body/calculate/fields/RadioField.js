import React, { Component } from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormControlLabel } from 'material-ui/Form'
import { connect } from 'react-redux'
import { pickRadioAnswer } from '../../../../../store/modules/calculator'

class RadioField extends Component {
  state = {
    checked: false
  }

  handleChange = (e, value) => {
    let checked = false
    if (value === this.props.answerPoints[0]) {
      // const maxValue = parseInt(this.props.answerPoints[1], 10)
    } else if (value === this.props.answerPoints[1]) {
      checked = true
    }
    this.setState({ value, checked })
    this.props.pickRadioAnswer(this.props.group, this.props.answerOptions[value], value)
    // const answerPoints = points.split('/')
    // if (value === answerPoints[0]) {
    //   this.setState(prevState => {
    //     const maxValue = parseInt(answerPoints[1], 10)
    //     this.props.pickAnswer(prevState.points - maxValue)
    //     return { points: prevState.points - maxValue }
    //   })
    // } else {
    //   this.setState(prevState => {
    //     this.props.pickAnswer(prevState.points + parseInt(value, 10))
    //     return { points: prevState.points + parseInt(value, 10) }
    //   })
    // }
  }

  render () {
    const { answerOptions, answerPoints, group, classes } = this.props
    return (
      <RadioGroup
        row
        aria-label={group}
        className={classes.group}
        onChange={this.handleChange}
      >
        <FormControlLabel
          value={answerPoints[0]}
          className={classes.formControlLabel}
          control={<Radio checked={!this.state.checked} />}
          label={
            <span>
              {answerOptions[0]}
              <small
                className={
                  this.state.checked
                    ? classes.unCheckedBadge
                    : classes.checkedBadge
                }
              >
                {answerPoints[0]}
              </small>
            </span>
          }
        />
        <FormControlLabel
          value={answerPoints[1]}
          className={classes.formControlLabel}
          control={<Radio checked={this.state.checked} />}
          label={
            <span>
              {answerOptions[1]}
              <small
                className={
                  !this.state.checked
                    ? classes.unCheckedBadge
                    : classes.checkedBadge
                }
              >
                +{answerPoints[1]}
              </small>
            </span>
          }
        />
      </RadioGroup>
    )
  }
}

const mapStateToProps = state => ({
  points: state.calculator.data.points
})

export default connect(mapStateToProps, { pickRadioAnswer })(RadioField)
