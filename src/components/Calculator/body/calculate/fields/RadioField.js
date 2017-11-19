import React, { Component } from 'react'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormControlLabel } from 'material-ui/Form'
import { connect } from 'react-redux'
import { pickRadioAnswer } from '../../../../../store/modules/calculator'
import { round } from '../../../../../utils/math'

class RadioField extends Component {
  state = {
    value: '',
    checked: ''
  }

  handleChange = (e, value) => {
    const { totalPoints, group, pickRadioAnswer } = this.props

    const splitValueArray = value.split('/')
    const newOption = splitValueArray[0]
    const newPoints = round(parseFloat(splitValueArray[1]), 1)
    const lastPoints = this.state.value ? this.state.value.split('/')[1] : false

    if (!lastPoints || newPoints > lastPoints) {
      // increase
      const increasedPointsTotal = round(totalPoints + (newPoints - lastPoints), 1)
      pickRadioAnswer(group, newOption, increasedPointsTotal, newPoints)
    } else {
      // decrease
      const decreasedPointsTotal = round(totalPoints - (lastPoints - newPoints), 1)
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
              {answerPoints[index]} Point
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
