import React, { Component } from 'react'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'

class CheckboxField extends Component {
  state = {
    checked: false,
    value: '0'
  }

  handleChange = points => {
    console.log(points)
  }

  render () {
    const { answerPoints, questionLabel, group, classes } = this.props
    return (
      <FormGroup row aria-label={group} className={classes.group}>
        <FormControlLabel
          value={answerPoints[0]}
          className={classes.formControlLabel}
          control={
            <Checkbox
              value={this.state.value}
              onChange={() => this.handleChange(answerPoints[1])}
              name={answerPoints[1]}
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
