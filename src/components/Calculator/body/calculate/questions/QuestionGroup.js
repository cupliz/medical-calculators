import React from 'react'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import QuestionField from './QuestionField'

const styles = theme => ({
  questionGroup: {
    display: 'flex',
    borderBottom: `1px solid ${theme.brand.colors.separatorGrey}`,
    borderTop: `1px solid ${theme.brand.colors.separatorGrey}`,
    backgroundColor: theme.brand.colors.greyBg
  },
  formControl: {
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 0 ${theme
      .spacing.unit * 2}px`,
    display: 'flex',
    width: '100%',
    maxWidth: 800
  },
  label: {
    fontSize: 14,
    marginBottom: `${theme.spacing.unit}px`
  },
  focusedLabel: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
})

const renderQuestionFields = (data, group, showPoints) => {
  if (Array.isArray(data)) {
    return data.map(question => {
      if (question.points) {
        return <QuestionField key={question.label || question.options} group={group} showPoints={showPoints} {...question} />
      } else if (question.values) {
        return <QuestionField key={question.placeholder} group={group} showPoints={showPoints} {...question} />
      } else {
        return <p>Please check the data</p>
      }
    })
  } else return <QuestionField group={group} showPoints={showPoints} {...data} />
}

const QuestionGroup = props => (
  <div className={props.classes.questionGroup}>
    <FormControl component='fieldset' className={props.classes.formControl}>
      <FormLabel
        component='legend'
        classes={{
          root: props.classes.label,
          focused: props.classes.focusedLabel
        }}
      >
        {props.group}
      </FormLabel>
      {renderQuestionFields(props.data, props.group, props.showPoints)}
    </FormControl>
  </div>
)

QuestionGroup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(QuestionGroup)
