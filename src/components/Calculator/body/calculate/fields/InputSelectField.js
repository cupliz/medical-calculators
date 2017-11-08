import React, { Component } from 'react'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'

const currencies = [
  {
    value: 'USD',
    label: '$'
  },
  {
    value: 'EUR',
    label: '€'
  },
  {
    value: 'BTC',
    label: '฿'
  },
  {
    value: 'JPY',
    label: '¥'
  }
]

class InputSelectField extends Component {
  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR'
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render () {
    return (
      <div>
        <form noValidate autoComplete='off'>
          <TextField
            id='name'
            label='Name'
            className={''}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin='normal'
          />
          <TextField
            id='select-currency'
            select
            label='Select'
            className={''}
            value={this.state.currency}
            onChange={this.handleChange('currency')}
            SelectProps={{
              MenuProps: {
                className: ''
              }
            }}
            helperText='Please select your currency'
            margin='normal'
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </div>
    )
  }
}

export default InputSelectField
