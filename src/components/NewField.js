import React from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText
} from 'material-ui/Form'

const NewField = () => (
  <div>
    <FormControl component='fieldset' required>
      <FormLabel component='legend'>Gender</FormLabel>
      <RadioGroup
        aria-label='gender'
        name='gender'
        value={this.state.value}
        onChange={this.handleChange}
      >
        <FormControlLabel value='male' control={<Radio />} label='Male' />
        <FormControlLabel value='female' control={<Radio />} label='Female' />
        <FormControlLabel value='other' control={<Radio />} label='Other' />
        <FormControlLabel
          value='disabled'
          disabled
          control={<Radio />}
          label='Disabled'
        />
      </RadioGroup>
    </FormControl>
    <FormControl
      component='fieldset'
      required
      error
    >
      <FormLabel component='legend'>Gender</FormLabel>
      <RadioGroup
        aria-label='gender'
        name='gender'
        value={this.state.value}
        onChange={this.handleChange}
      >
        <FormControlLabel value='male' control={<Radio />} label='Male' />
        <FormControlLabel value='female' control={<Radio />} label='Female' />
        <FormControlLabel value='other' control={<Radio />} label='Other' />
        <FormControlLabel
          value='disabled'
          disabled
          control={<Radio />}
          label='Disabled'
        />
      </RadioGroup>
      <FormHelperText>You can display an error</FormHelperText>
    </FormControl>
  </div>
)

export default NewField
