import React, { Component } from 'react'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'

class InputSelectField extends Component {
  state = {
    input: '',
    select: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render () {
    return (
      <form noValidate autoComplete='off' className={this.props.classes.inputWrapper}>
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
          {this.props.values.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </form>
    )
  }
}

export default InputSelectField
