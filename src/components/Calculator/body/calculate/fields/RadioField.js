import React, { Component } from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormControlLabel } from 'material-ui/Form'
import { connect } from 'react-redux'
import { pickRadioAnswer } from '../../../../../store/modules/calculator'

class RadioField extends Component {
  state = {
    value: '',
    checked: ''
  }

  handleChange = (e, value) => {
    const {
      totalPoints,
      answerPoints,
      answerOptions,
      group,
      pickRadioAnswer
    } = this.props

    const splitValueArray = value.split('/')
    const newOption = splitValueArray[0]
    const newPoints = parseInt(splitValueArray[1], 10)
    const lastPoints = this.state.value ? this.state.value.split('/')[1] : false
    const maxValue = Math.max.apply(Math, answerPoints.map(item => parseInt(item, 10)))

    if (!lastPoints || newPoints > lastPoints) {
      // increase
      const increasedPointsTotal = totalPoints + (newPoints - lastPoints)
      pickRadioAnswer(group, newOption, increasedPointsTotal, newPoints)
    } else {
      // decrease
      const decreasedPointsTotal = totalPoints - (lastPoints - newPoints)
      pickRadioAnswer(group, newOption, decreasedPointsTotal, newPoints)
    }

    this.setState({
      checked: newOption,
      value,
      newPoints
    })
  }

  mapAnswerOptions = () => {
    const { answerOptions, answerPoints, classes } = this.props
    return answerOptions.map((option, index) => (
      <FormControlLabel
        key={option}
        value={`${option}/${answerPoints[index]}`}
        className={classes.formControlLabel}
        control={<Radio />}
        x={option}
        label={
          <span>
            {option}
            <small
              className={
                this.state.checked === option
                  ? classes.checkedBadge
                  : classes.unCheckedBadge
              }
            >
              {answerPoints[index]}
            </small>
          </span>
        }
      />
    ))
  }

  render () {
    const { answerOptions, group, classes } = this.props
    return (
      <RadioGroup
        row={answerOptions.length === 2}
        aria-label={group}
        className={classes.group}
        onChange={this.handleChange}
        value={this.state.value}
        name={group}
      >
        {this.mapAnswerOptions()}
      </RadioGroup>
    )
  }
}

const mapStateToProps = state => ({
  totalPoints: state.calculator.data.points
})

export default connect(mapStateToProps, { pickRadioAnswer })(RadioField)
