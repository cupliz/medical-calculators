import React from 'react'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox';

const CheckboxField = props => {
  const { answerPoints, label, classes, value, onChange, checked } = props
  return (
    <FormGroup
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
        control={<Checkbox checked={!checked} />}
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
        control={<Checkbox checked={checked} />}
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
    </FormGroup>
  )
}

export default CheckboxField
