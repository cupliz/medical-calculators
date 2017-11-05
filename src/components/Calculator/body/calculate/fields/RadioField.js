import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormControlLabel } from 'material-ui/Form'

const RadioField = props => {
  const { answerPoints, label, classes, value, onChange } = props
  return (
    <RadioGroup
      row
      name={answerPoints[1]}
      aria-label={label}
      className={classes.group}
      value={value}
      onChange={onChange}
    >
      <FormControlLabel
        value={answerPoints[0]}
        className={classes.formControlLabel}
        control={<Radio checked={!props.checked} />}
        label={
          <span>
            No{' '}
            <small
              className={
                props.checked
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
        control={<Radio checked={props.checked} />}
        label={
          <span>
            Yes{' '}
            <small
              className={
                !props.checked
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

export default RadioField
