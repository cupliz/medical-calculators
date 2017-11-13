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
    const { points, answerPoints, answerOptions, group, pickRadioAnswer } = this.props
    let checked = false
    if (value === answerPoints[0]) {
      const decreasedValue = points - parseInt(answerPoints[1], 10)
      pickRadioAnswer(group, answerOptions[0], decreasedValue, value)
    } else if (value === answerPoints[1]) {
      checked = true
      const increasedValue = points + parseInt(answerPoints[1], 10)
      pickRadioAnswer(group, answerOptions[1], increasedValue, value)
    }
    this.setState({ value, checked })
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
