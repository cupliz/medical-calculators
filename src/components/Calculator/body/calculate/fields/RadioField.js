import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormControlLabel } from 'material-ui/Form'

const RadioField = props => {
  const { answerPoints } = props
  return (
    <RadioGroup
      row
      name={answerPoints[1]}
      aria-label={props.label}
      className={props.classes.group}
      value={props.value}
      onChange={props.onChange}
    >
      <FormControlLabel
        value={answerPoints[0]}
        className={props.classes.formControlLabel}
        control={<Radio checked={!props.checked} />}
        label={
          <span>
            No{' '}
            <small
              className={
                props.checked
                  ? props.classes.unCheckedBadge
                  : props.classes.checkedBadge
              }
            >
              {answerPoints[0]}
            </small>
          </span>
        }
      />
      <FormControlLabel
        value={answerPoints[1]}
        className={props.classes.formControlLabel}
        control={<Radio checked={props.checked} />}
        label={
          <span>
            Yes{' '}
            <small
              className={
                !props.checked
                  ? props.classes.unCheckedBadge
                  : props.classes.checkedBadge
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
