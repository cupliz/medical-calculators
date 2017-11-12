import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormControlLabel } from 'material-ui/Form'

const RadioField = props => {
  const { answerOptions, answerPoints, group, classes } = props
  return (
    <RadioGroup
      row
      name={answerPoints[1]}
      aria-label={group}
      className={classes.group}
    >
      <FormControlLabel
        value={answerPoints[0]}
        className={classes.formControlLabel}
        control={<Radio checked={!checked} />}
        label={
          <span>
            {answerOptions[0] }
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
            {answerOptions[1] }
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
