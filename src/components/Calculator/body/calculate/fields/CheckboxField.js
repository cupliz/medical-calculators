import React, { Component } from 'react'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import { pickCheckboxAnswer } from '../../../../../store/modules/calculator'
import { connect } from 'react-redux'
import { round } from '../../../../../utils/math'

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
      const decreasedValue = round(totalPoints - parseFloat(answerPoints[1]), 1)
      this.setState({ checked: false, value: answerPoints[0] })
      pickCheckboxAnswer(group, questionLabel, decreasedValue, answerPoints[0])
    } else {
      const increasedValue = round(totalPoints + parseFloat(answerPoints[1]), 1)
      this.setState({ checked: true, value: answerPoints[1] })
      pickCheckboxAnswer(group, questionLabel, increasedValue, answerPoints[1])
    }
  }

  renderLabel = (questionLabel, classes, answerPoints, showPoints) => {
    if (showPoints === false) {
      return <span>{questionLabel} </span>
    } else {
      return (
        <span>
          {questionLabel}
          <small
            className={
              this.state.checked ? classes.checkedBadge : classes.unCheckedBadge
            }
          >
            {`${answerPoints[1]} Point`}
          </small>
        </span>
      )
    }
  }

  render () {
    const {
      answerPoints,
      questionLabel,
      group,
      classes,
      showPoints
    } = this.props
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
          label={this.renderLabel(
            questionLabel,
            classes,
            answerPoints,
            showPoints
          )}
        />
      </FormGroup>
    )
  }
}

const mapStateToProps = state => ({
  totalPoints: state.calculator.data.points
})

export default connect(mapStateToProps, { pickCheckboxAnswer })(CheckboxField)
