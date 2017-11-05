import React, { Component } from 'react'
import ResultCard from './ResultCard'
import { connect } from 'react-redux'
import { pickAnswer } from '../../../../store/modules/calculator'
import QuestionGroup from './QuestionGroup'

class CalculateContainer extends Component {
  state = {
    points: 0
  }

  handleChange = (value, points) => {
    const answerPoints = points.split('/')
    if (value === answerPoints[0]) {
      this.setState(prevState => {
        const maxValue = parseInt(answerPoints[1], 10)
        this.props.pickAnswer(prevState.points - maxValue)
        return { points: prevState.points - maxValue }
      })
    } else {
      this.setState(prevState => {
        this.props.pickAnswer(prevState.points + parseInt(value, 10))
        return { points: prevState.points + parseInt(value, 10) }
      })
    }
  }

  renderGroups = questions => {
    return questions.map(questionGroup => {
      return (
        <QuestionGroup
          key={questionGroup.group}
          {...questionGroup}
        />
      )
    })
  }

  render () {
    const { questions, results, points } = this.props

    return (
      <div className='calculate'>
        {this.renderGroups(questions)}
        <ResultCard points={points} data={results[points]} />
      </div>
    )
  }
}

export default connect(null, { pickAnswer })(CalculateContainer)
