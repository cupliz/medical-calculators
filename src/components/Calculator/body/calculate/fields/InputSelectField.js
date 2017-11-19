import React, { Component } from 'react'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import { typePickInputSelect } from '../../../../../store/modules/calculator'
import { connect } from 'react-redux'

class InputSelectField extends Component {
  state = {
    input: '',
    select: this.props.values[0]
  }

  componentDidMount () {
    console.log('componentDidMount')
    import(`./test1.js`)
      .catch(err => {
        console.log(err)
        return null
      })
      .then(module => {
        const { clog, add1 } = module
        clog(123)
        console.log(add1(5))
      })
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
          fullWidth
        />
        <TextField
          select
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
