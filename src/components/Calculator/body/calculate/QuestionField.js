import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import RadioField from './fields/RadioField'
import CheckboxField from './fields/CheckboxField'
import InputSelectField from './fields/InputSelectField'

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
    marginRight: `${theme.spacing.unit * 4}px`
  },
  inputWrapper: {
    display: 'flex',
    marginBottom: `${theme.spacing.unit}px`
  },
  select: { width: 'auto' }
})

const renderRadioField = props => {
  const answerPoints = props.points.split('/')
  const answerOptions = props.options.split('/')
  return (
    <RadioField
      answerOptions={answerOptions}
      answerPoints={answerPoints}
      group={props.group}
      classes={props.classes}
    />
  )
}

const renderCheckboxField = props => {
  const answerPoints = ['0', props.points]
  return (
    <CheckboxField
      answerPoints={answerPoints}
      group={props.group}
      questionLabel={props.label}
      classes={props.classes}
    />
  )
}

const renderInputSelectField = props => (
  <InputSelectField
    group={props.group}
    classes={props.classes}
    values={props.values}
    placeholder={props.placeholder}
  />
)

const QuestionField = props => {
  if (props.type === 'radio') {
    return renderRadioField(props)
  } else if (props.type === 'checkbox') {
    return renderCheckboxField(props)
  } else if (props.type === 'input/select') {
    return renderInputSelectField(props)
  } else {
    return <p>Please check type of question</p>
  }
}

QuestionField.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(QuestionField)
