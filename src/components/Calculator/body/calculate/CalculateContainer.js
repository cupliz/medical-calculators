import React, { Component } from 'react'
import ResultCard from './ResultCard'
import { connect } from 'react-redux'
import { pickAnswer } from '../../../../store/modules/calculator'
import QuestionGroup from './QuestionGroup'
import InfoGroup from './InfoGroup'

class CalculateContainer extends Component {
  state = {
    points: 0
  }

  handleChange = (value, points, type) => {
    if (type === 'radio') {
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
    } else if (type === 'checkbox') {
      if (value === '0') {
        this.setState(prevState => {
          const maxValue = parseInt(points, 10)
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
  }

  renderInfoGroup = info => {
    return <InfoGroup {...info} />
  }

  renderQuestionGroups = questions => {
    return questions.map(questionGroup => {
      return (
        <QuestionGroup
          key={questionGroup.group}
          onChange={this.handleChange}
          {...questionGroup}
        />
      )
    })
  }

  render () {
    const { questions, results, points, info } = this.props

    return (
      <div className='calculate'>
        {info && this.renderInfoGroup(info)}
        {this.renderQuestionGroups(questions)}
        <ResultCard points={points} data={results[points]} />
      </div>
    )
  }
}

export default connect(null, { pickAnswer })(CalculateContainer)
