import React, { Component } from 'react'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import { pickCheckboxAnswer } from '../../../../../store/modules/calculator'
import { connect } from 'react-redux'

class CheckboxField extends Component {
  state = {
    checked: false,
    value: '0'
  }

  handleChange = () => {
    const {
      totalPoints,
      answerPoints,
      group,
      questionLabel,
      pickCheckboxAnswer
    } = this.props

    if (this.state.checked) {
      const decreasedValue = totalPoints - parseInt(answerPoints[1], 10)
      this.setState({ checked: false, value: answerPoints[0] })
      pickCheckboxAnswer(group, questionLabel, totalPoints, decreasedValue)
    } else {
      const increasedValue = totalPoints + parseInt(answerPoints[1], 10)
      this.setState({ checked: true, value: answerPoints[1] })
      pickCheckboxAnswer(group, questionLabel, totalPoints, increasedValue)
    }
  }

  render () {
    const { answerPoints, questionLabel, group, classes } = this.props
    return (
      <FormGroup row aria-label={group} className={classes.group}>
        <FormControlLabel
          className={classes.formControlLabel}
          control={
            <Checkbox
              value={this.state.value}
              onChange={this.handleChange}
              checked={this.state.checked}
            />
          }
          label={
            <span>
              {questionLabel}
              <small
                className={
                  this.state.checked
                    ? classes.checkedBadge
                    : classes.unCheckedBadge
                }
              >
                {`${answerPoints[1]} Point`}
              </small>
            </span>
          }
        />
      </FormGroup>
    )
  }
}

const mapStateToProps = state => ({
  totalPoints: state.calculator.data.points
})

export default connect(mapStateToProps, { pickCheckboxAnswer })(CheckboxField)
