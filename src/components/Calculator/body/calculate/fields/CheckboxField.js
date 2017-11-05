import React from 'react'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'

const CheckboxField = props => {
  const {
    answerPoints,
    ariaLabel,
    classes,
    value,
    onChange,
    checked,
    questionLabel
  } = props
  return (
    <FormGroup row aria-label={ariaLabel} className={classes.group}>
      <FormControlLabel
        value={answerPoints[0]}
        className={classes.formControlLabel}
        control={
          <Checkbox
            value={value}
            onChange={onChange}
            name={answerPoints[1]}
            checked={checked}
          />
        }
        label={
          <span>
            {questionLabel}
            <small
              className={
                checked ? classes.checkedBadge : classes.unCheckedBadge
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

export default CheckboxField
