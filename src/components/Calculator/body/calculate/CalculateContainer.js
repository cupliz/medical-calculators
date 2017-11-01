import React, { Component } from 'react'
import QuestionField from './QuestionField'
import ResultCard from './ResultCard'

class CalculateContainer extends Component {
  state = {
    points: 0
  }

  handleChange = (e, value) => {
    if (value === '0') {
      const maxValue = parseInt(e.target.name, 10)
      this.setState(prevState => {
        return { points: prevState.points - maxValue }
      })
    } else {
      this.setState(prevState => {
        return { points: prevState.points + parseInt(value, 10) }
      })
    }
  }

  renderQuestionFields = (questions, changeHandler) => {
    return questions.map(question => {
      return (
        <QuestionField
          key={question.label}
          label={question.label}
          points={question.points}
          onChange={changeHandler}
        />
      )
    })
  }

  render () {
    const { questions, results, points } = this.props

    return (
      <div className='calculate'>
        {this.renderQuestionFields(questions, this.handleChange)}
        <ResultCard points={points} data={results[points]} />
      </div>
    )
  }
}

export default CalculateContainer
