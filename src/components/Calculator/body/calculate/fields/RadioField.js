import React, { Component } from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormControlLabel } from 'material-ui/Form'

class RadioField extends Component {
  state = {
    checked: false
  }

  handleChange = (e, value) => {
    let checked = false
    if (value === this.props.answerPoints[1]) {
      checked = true
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

export default RadioField
