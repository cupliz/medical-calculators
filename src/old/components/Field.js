import React from 'react'
import { RadioButtonGroup, RadioButton } from 'material-ui/RadioButton'
import './Field.css'

const rbStyle = { display: 'inline-block', width: 'auto', marginRight: '25px' }

const Field = props => {
  return (
    <div className='field-wrapper'>
      <span className='description'>{props.label}:</span>
      <RadioButtonGroup
        name={props.yesPoints.toString()}
        defaultSelected={0}
        onChange={props.onChange}
      >
        <RadioButton
          label={
            <span>
              No<small className='badge'>0</small>
            </span>
          }
          value={0}
          style={rbStyle}
        />
        <RadioButton
          label={
            <span>
              Yes<small className='badge'>{props.yesPoints}</small>
            </span>
          }
          value={props.yesPoints}
          style={rbStyle}
        />
      </RadioButtonGroup>
    </div>
  )
}

export default Field
