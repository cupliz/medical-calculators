import React from 'react'
import QuestionGroup from './QuestionGroup'
import InfoGroup from './InfoGroup'
import ResultCard from './ResultCard'
import { connect } from 'react-redux'

const renderQuestionGroups = questions => {
  return questions.map(questionGroup => {
    return <QuestionGroup key={questionGroup.group} {...questionGroup} />
  })
}

const CalculateContainer = props => {
  const { info, questions, points, data } = props
  return (
    <div className='calculateContainer'>
      {info && <InfoGroup {...info} />}
      {renderQuestionGroups(questions)}
      <ResultCard points={points} data={data} />
    </div>
  )
}

const mapStateToProps = state => {
  const { points, results } = state.calculator.data
  return {
    points,
    data: results[points]
  }
}

export default connect(mapStateToProps)(CalculateContainer)
