import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormControlLabel } from 'material-ui/Form'

const RadioField = props => {
  const { answerPoints, ariaLabel, classes, value, onChange, checked } = props
  return (
    <RadioGroup
      row
      name={answerPoints[1]}
      aria-label={ariaLabel}
      className={classes.group}
      value={value}
      onChange={onChange}
    >
      <FormControlLabel
        value={answerPoints[0]}
        className={classes.formControlLabel}
        control={<Radio checked={!checked} />}
        label={
          <span>
            No{' '}
            <small
              className={
                checked
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
        control={<Radio checked={checked} />}
        label={
          <span>
            Yes{' '}
            <small
              className={
                !checked
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
