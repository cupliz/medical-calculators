import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormControlLabel } from 'material-ui/Form'

const RadioField = props => (
  <RadioGroup
    row
    aria-label={this.props.label}
    name={answerPoints[1]}
    className={classes.group}
    value={this.state.value}
    onChange={this.handleChange}
  >
    <FormControlLabel
      value={answerPoints[0]}
      className={classes.formControlLabel}
      control={<Radio checked={!this.state.checked} />}
      label={
        <span>
          No{' '}
          <small
            className={
              this.state.checked ? classes.unCheckedBadge : classes.checkedBadge
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
          Yes{' '}
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

export default RadioField
