import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Radio, { RadioGroup } from 'material-ui/Radio'
import {
  FormGroup,
  FormLabel,
  FormControl,
  FormControlLabel
} from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'

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

  renderRadioQuestion = (classes, answerPoints) => (
    <div className={classes.questionField}>
      <FormControl component='fieldset' className={classes.formControl}>
        <FormLabel
          component='legend'
          classes={{ root: classes.label, focused: classes.focusedLabel }}
        >
          {this.props.label}
        </FormLabel>
        <RadioGroup
          row
          aria-label={this.props.label}
          name={answerPoints[1]}
          className={classes.group}
          value={this.state.value}
          onChange={this.handleChange}
        >
          <FormControlLabel
            value={answerPoints[0]}
            className={classes.formControlLabel}
            control={<Radio checked={!this.state.checked} />}
            label={
              <span>
                No{' '}
                <small
                  className={
                    this.state.checked
                      ? classes.unCheckedBadge
                      : classes.checkedBadge
                  }
                >
                  {answerPoints[0]}
                </small>
              </span>
            }
          />
          <FormControlLabel
            value={answerPoints[1]}
            className={classes.formControlLabel}
            control={<Radio checked={this.state.checked} />}
            label={
              <span>
                Yes{' '}
                <small
                  className={
                    !this.state.checked
                      ? classes.unCheckedBadge
                      : classes.checkedBadge
                  }
                >
                  +{answerPoints[1]}
                </small>
              </span>
            }
          />
        </RadioGroup>
      </FormControl>
    </div>
  )

  renderCheckboxQuestion = () => {
    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedA}
              onChange={this.handleChange('checkedA')}
              value='checkedA'
            />
          }
          label='Option A'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedB}
              onChange={this.handleChange('checkedB')}
              value='checkedB'
            />
          }
          label='Option B'
        />
        <FormControlLabel
          control={<Checkbox value='checkedC' />}
          label='Option C'
        />
        <FormControlLabel
          disabled
          control={<Checkbox value='checkedD' />}
          label='Disabled'
        />
        <FormControlLabel
          disabled
          control={<Checkbox checked value='checkedE' />}
          label='Disabled'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedF}
              onChange={this.handleChange('checkedF')}
              value='checkedF'
              indeterminate
            />
          }
          label='Indeterminate'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedG}
              onChange={this.handleChange('checkedG')}
              classes={{
                checked: classes.checked
              }}
              value='checkedG'
            />
          }
          label='Custom color'
        />
      </FormGroup>
    )
  }

  render () {
    const { classes, type } = this.props
    const answerPoints = this.props.points.split('/')

    if (type === 'radio') {
      return this.renderRadioQuestion(classes, answerPoints)
    } else if (type === 'checkbox') {
      return this.renderCheckboxQuestion(classes, answerPoints)
    } else {
      return <div>Please check 'type' of question</div>
    }
  }
}

QuestionField.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(QuestionField)
