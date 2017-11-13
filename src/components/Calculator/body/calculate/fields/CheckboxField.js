import React, { Component } from 'react'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'

class CheckboxField extends Component {
  state = {
    checked: false,
    value: '0'
  }

  handleChange = () => {
    // const {
    //   points,
    //   answerPoints,
    //   answerOptions,
    //   group,
    //   pickRadioAnswer
    // } = this.props
    //
    // let checked = false
    //
    // if (value === answerPoints[0]) {
    //   const decreasedValue = points - parseInt(answerPoints[1], 10)
    //   pickRadioAnswer(group, answerOptions[0], decreasedValue, value)
    // } else if (value === answerPoints[1]) {
    //   checked = true
    //   const increasedValue = points + parseInt(answerPoints[1], 10)
    //   pickRadioAnswer(group, answerOptions[1], increasedValue, value)
    // }

    // this.setState({ value, checked })

    if (this.state.checked) {
      this.setState({ checked: false, value: this.props.answerPoints[0] })
    } else {
      this.setState({ checked: true, value: this.props.answerPoints[1] })
    }
  }

  render () {
    const { answerPoints, questionLabel, group, classes } = this.props
    return (
      <FormGroup row aria-label={group} className={classes.group}>
        <FormControlLabel
          className={classes.formControlLabel}
          control={
            <Checkbox
              value={this.state.value}
              onChange={this.handleChange}
              checked={this.state.checked}
            />
          }
          label={
            <span>
              {questionLabel}
              <small
                className={
                  this.state.checked
                    ? classes.checkedBadge
                    : classes.unCheckedBadge
                }
              >
                {`${answerPoints[1]} Point`}
              </small>
            </span>
          }
        />
      </FormGroup>
    )
  }
}

export default CheckboxField
