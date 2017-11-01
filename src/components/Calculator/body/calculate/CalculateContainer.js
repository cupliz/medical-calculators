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

  renderQuestionFields = questions => {
    return questions.map(question => {
      const { label } = question
      return (
        <QuestionField label />
      )
    })
  }

  render () {
    const { questions, results, points } = this.props

    return (
      <div className='calculate'>
        <QuestionField
          label='Congestive Heart Failure History'
          points='0/1'
          onChange={this.handleChange}
        />
        <QuestionField
          label='Hypertension history'
          points='0/1'
          onChange={this.handleChange}
        />
        <QuestionField
          label='Age ≥ 75 years'
          points='0/1'
          onChange={this.handleChange}
        />
        <QuestionField
          label='Diabetes melitus history'
          points='0/1'
          onChange={this.handleChange}
        />
        <QuestionField
          label='Stroke or TIA symptoms previously'
          points='0/2'
          onChange={this.handleChange}
        />
        {/*{this.renderQuestionFields(questions)}*/}
        <ResultCard points={points} data={results[points]} />
      </div>
    )
  }
}

export default CalculateContainer
