import React from 'react'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'

const CheckboxField = props => {
  const { answerPoints, ariaLabel, classes, value, onChange, checked, questionLabel } = props
  return (
    <FormGroup
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
        control={<Checkbox checked={checked} />}
        label={
          <span>
            {questionLabel}
            <small
              className={
                checked ? classes.unCheckedBadge : classes.checkedBadge
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
