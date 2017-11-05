import React, { Component } from 'react'
import { FormLabel, FormControl } from 'material-ui/Form'
import { withStyles } from 'material-ui/styles'
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
      .spacing.unit * 2}px`
  },
  label: {
    fontSize: 14
  },
  focusedLabel: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
})

class QuestionGroup extends Component {
  renderQuestionFields = data => {
    if (Array.isArray(data)) {
      return data.map(question => (
        <QuestionField {...question} />
      ))
    } else return <QuestionField {...data} />
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.questionGroup}>
        <FormControl component='fieldset' className={classes.formControl}>
          <FormLabel
            component='legend'
            classes={{ root: classes.label, focused: classes.focusedLabel }}
          >
            {this.props.group}
          </FormLabel>
          {this.renderQuestionFields(this.props.data)}
        </FormControl>
      </div>
    )
  }
}

QuestionGroup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(QuestionGroup)
