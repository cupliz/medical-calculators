import React, { Component } from 'react'
import { FormLabel, FormControl } from 'material-ui/Form'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'

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

class QuestionGroup extends Component {
  render () {
    const { classes } = this.props

    return (
      <div className={classes.questionField}>
        <FormControl component='fieldset' className={classes.formControl}>
          <FormLabel
            component='legend'
            classes={{ root: classes.label, focused: classes.focusedLabel }}
          >
            {this.props.group}
          </FormLabel>
          Content
        </FormControl>
      </div>
    )
  }
}

QuestionGroup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(QuestionGroup)
