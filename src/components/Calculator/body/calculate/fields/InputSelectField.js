import React, { Component } from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField'
import { typePickInputSelect } from '../../../../../store/modules/calculator'
import { connect } from 'react-redux'

class InputSelectField extends Component {
  state = {
    input: '',
    select: this.props.values[0]
  }

  handleChange = name => event => {
    const { typePickInputSelect, group } = this.props
    const { input, select } = this.state
    const { value } = event.target

    name === 'input'
      ? typePickInputSelect(group, value, select)
      : typePickInputSelect(group, input, value)

    this.setState({
      [name]: value
    })
  }

  render () {
    return (
      <form
        noValidate
        autoComplete='off'
        className={this.props.classes.inputWrapper}
      >
        <TextField
          className={this.props.classes.input}
          value={this.state.input}
          placeholder={this.props.placeholder}
          onChange={this.handleChange('input')}
          margin='normal'
          type='number'
        />
        <TextField
          select
          disabled={this.props.disabled}
          value={this.state.select}
          onChange={this.handleChange('select')}
          SelectProps={{
            classes: {
              root: this.props.classes.select
            },
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

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {
  typePickInputSelect: typePickInputSelect
})(InputSelectField)
