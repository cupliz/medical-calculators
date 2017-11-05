import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import RadioField from './fields/RadioField'
import CheckboxField from './fields/CheckboxField'

const styles = theme => ({
  group: {
    margin: 0
  },
  checkedBadge: {
    borderRadius: '5px',
    backgroundColor: '#00bcd4',
    color: '#fff',
    padding: '3px 7px',
    marginLeft: '10px'
  },
  unCheckedBadge: {
    borderRadius: '5px',
    backgroundColor: '#c1c7cd',
    color: '#fff',
    padding: '3px 7px',
    marginLeft: '10px'
  },
  formControlLabel: {
    marginRight: `${theme.spacing.unit * 4}px`
  }
})

class QuestionField extends React.Component {
  state = {
    value: '',
    checked: false
  }

  handleChange = (event, value) => {
    console.log(event, 'event')
    console.log(event.target.value, 'event.target.value')
    console.log(value, 'value')
    let checked = false
    if (value === this.props.points.split('/')[1]) {
      checked = true
    }
    this.setState({ value, checked })
    this.props.onChange(value, this.props.points)
  }

  renderQuestion = () => {
    let answerPoints = ['0', '1']

    if (this.props.type === 'radio') {
      answerPoints = this.props.points.split('/')
      const answerOptions = this.props.options.split('/')
      return (
        <RadioField
          answerOptions={answerOptions}
          answerPoints={answerPoints}
          ariaLabel={this.props.group}
          classes={this.props.classes}
          value={this.state.value}
          onChange={this.handleChange}
          checked={this.state.checked}
        />
      )
    } if (this.props.type === 'checkbox') {
      return (
        <CheckboxField
          answerPoints={answerPoints}
          ariaLabel={this.props.label}
          questionLabel={this.props.label}
          classes={this.props.classes}
          value={this.state.value}
          onChange={this.handleChange}
          checked={this.state.checked}
        />
      )
    }
  }

  render () {
    return this.renderQuestion()
  }
}

QuestionField.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(QuestionField)
