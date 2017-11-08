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
    input: 'Cat in the Hat',
    select: ''
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
            id='input'
            className={this.props.classes.input}
            value={this.state.input}
            onChange={this.handleChange('input')}
            margin='normal'
          />
          <TextField
            id='select'
            select
            className={this.props.classes.select}
            value={this.state.select}
            onChange={this.handleChange('select')}
            SelectProps={{
              MenuProps: {
                className: this.props.classes.menu
              }
            }}
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
