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
    const {
      totalPoints,
      answerPoints,
      answerOptions,
      group,
      pickRadioAnswer
    } = this.props

    let checked = false

    if (value === answerPoints[0]) {
      const decreasedValue = totalPoints - parseInt(answerPoints[1], 10)
      pickRadioAnswer(group, answerOptions[0], decreasedValue, value)
    } else if (value === answerPoints[1]) {
      checked = true
      const increasedValue = totalPoints + parseInt(answerPoints[1], 10)
      pickRadioAnswer(group, answerOptions[1], increasedValue, value)
    }

    this.setState({ value, checked })
  }

  mapAnswerOptions = () => {
    const { answerOptions, answerPoints, classes } = this.props
    return answerOptions.map((option, index) => (
      <FormControlLabel
        value={answerPoints[index]}
        className={classes.formControlLabel}
        control={<Radio checked={!this.state.checked} />}
        label={
          <span>
            {option}
            <small
              className={
                this.state.checked
                  ? classes.unCheckedBadge
                  : classes.checkedBadge
              }
            >
              {answerPoints[index]}
            </small>
          </span>
        }
      />
    ))
  }

  render () {
    const { answerOptions, group, classes } = this.props
    return (
      <RadioGroup
        row={answerOptions.length === 2}
        aria-label={group}
        className={classes.group}
        onChange={this.handleChange}
      >
        {this.mapAnswerOptions()}
      </RadioGroup>
    )
  }
}

const mapStateToProps = state => ({
  totalPoints: state.calculator.data.points
})

export default connect(mapStateToProps, { pickRadioAnswer })(RadioField)
