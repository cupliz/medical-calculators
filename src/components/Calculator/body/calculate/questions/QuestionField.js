import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import RadioField from '../fields/RadioField'
import CheckboxField from '../fields/CheckboxField'
import InputSelectField from '../fields/InputSelectField'
import InputSearchField from '../fields/InputSearchField'
import SelectField from '../fields/SelectField'

const styles = theme => ({
  group: {
    margin: 0
  },
  checkedBadge: {
    borderRadius: '5px',
    backgroundColor: '#00bcd4',
    color: '#fff',
    padding: '3px 7px',
    marginLeft: '10px',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  unCheckedBadge: {
    borderRadius: '5px',
    backgroundColor: '#c1c7cd',
    color: '#fff',
    padding: '3px 7px',
    marginLeft: '10px',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  formControlLabel: {
    marginRight: `${theme.spacing.unit * 4}px`,
    marginBottom: `${theme.spacing.unit}px`
  },
  inputWrapper: {
    display: 'flex',
    marginBottom: `${theme.spacing.unit}px`
  },
  input: {
    marginRight: `${theme.spacing.unit * 4}px`,
    maxWidth: 300,
    flexGrow: 1
  },
  select: { width: 'auto' }
})

const renderRadioField = props => {
  const answerPoints = props.points.split('/')
  const answerOptions = props.options.split(' | ')
  return (
    <RadioField
      answerOptions={answerOptions}
      answerPoints={answerPoints}
      group={props.group}
      showPoints={props.showPoints}
      classes={props.classes}
    />
  )
}

const renderCheckboxField = props => {
  const answerPoints = ['0', props.points]
  return (
    <CheckboxField
      answerPoints={answerPoints}
      questionLabel={props.label}
      group={props.group}
      showPoints={props.showPoints}
      classes={props.classes}
    />
  )
}

const renderInputSelectField = props => (
  <InputSelectField
    placeholder={props.placeholder}
    values={props.values}
    group={props.group}
    classes={props.classes}
    disabled={props.disabled}
  />
)

const renderInputSearchField = props => (
  <InputSearchField 
    placeholder={props.placeholder}
    group={props.group}
    values={props.values}
  />
)

const renderSelectField = props => (
  <SelectField 
    placeholder={props.placeholder}
    group={props.group}
    values={props.values}
  />
)

const QuestionField = props => {
  if (props.type === 'radio') {
    return renderRadioField(props)
  } else if (props.type === 'checkbox') {
    return renderCheckboxField(props)
  } else if (props.type === 'input/select') {
    return renderInputSelectField(props)
  } else if (props.type === 'input/search') {
    return renderInputSearchField(props)
  } else if (props.type === 'select') {
    return renderSelectField(props)
  } else {
    return null
  }
}

QuestionField.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(QuestionField)
