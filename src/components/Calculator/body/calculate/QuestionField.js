import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'
import RadioField from './fields/RadioField'

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

  renderQuestion = type => {
    let answerPoints = ['0', '1']
    if (this.props.type === 'radio') {
      answerPoints = this.props.points.split('/')
    }

    if (type === 'radio') {
      return (
        <RadioField
          answerPoints={answerPoints}
          label={this.props.label}
          classes={this.props.classes}
          value={this.state.value}
          onChange={this.handleChange}
          checked={this.state.checked}
        />
      )
    }
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.questionField}>
        <FormControl component='fieldset' className={classes.formControl}>
          <FormLabel
            component='legend'
            classes={{ root: classes.label, focused: classes.focusedLabel }}
          >
            {this.props.label}
          </FormLabel>
          {this.renderQuestion(this.props.type)}
        </FormControl>
      </div>
    )
  }
}

QuestionField.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(QuestionField)
