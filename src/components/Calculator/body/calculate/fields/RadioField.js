import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormControlLabel } from 'material-ui/Form'

const RadioField = props => (
  <RadioGroup
    row
    name={this.props.answerPoints[1]}
    aria-label={this.props.label}
    className={this.props.classes.group}
    value={this.props.value}
    onChange={this.props.onChange}
  >
    <FormControlLabel
      value={this.props.answerPoints[0]}
      className={this.props.classes.formControlLabel}
      control={<Radio checked={!this.props.checked} />}
      label={
        <span>
          No{' '}
          <small
            className={
              this.props.checked ? this.props.classes.unCheckedBadge : this.props.classes.checkedBadge
            }
          >
            {this.props.answerPoints[0]}
          </small>
        </span>
      }
    />
    <FormControlLabel
      value={this.props.answerPoints[1]}
      className={this.props.classes.formControlLabel}
      control={<Radio checked={this.props.checked} />}
      label={
        <span>
          Yes{' '}
          <small
            className={
              !this.props.checked
                ? this.props.classes.unCheckedBadge
                : this.props.classes.checkedBadge
            }
          >
            +{this.props.answerPoints[1]}
          </small>
        </span>
      }
    />
  </RadioGroup>
)

export default RadioField
