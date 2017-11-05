import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { FormLabel, FormControl } from 'material-ui/Form'
import RadioField from './fields/RadioField'
import CheckboxField from './fields/CheckboxField'

const styles = theme => ({
  questionField: {
    display: 'flex',
    borderBottom: `1px solid ${theme.brand.colors.separatorGrey}`,
    borderTop: `1px solid ${theme.brand.colors.separatorGrey}`,
    backgroundColor: theme.brand.colors.greyBg
  },
  formControl: {
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 0 ${theme
      .spacing.unit * 2}px`
  },
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
  label: {
    fontSize: 14
  },
  focusedLabel: {
    color: 'rgba(0, 0, 0, 0.54)'
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
      return (
        <RadioField
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
