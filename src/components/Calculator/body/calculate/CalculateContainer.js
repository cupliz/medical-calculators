import React from 'react'
import QuestionGroup from './QuestionGroup'
import InfoGroup from './InfoGroup'
import ResultCard from './ResultCard'
import { connect } from 'react-redux'

const renderQuestionGroups = questions => {
  return questions.map(questionGroup => {
    return (
      <QuestionGroup
        key={questionGroup.group}
        {...questionGroup}
      />
    )
  })
}

const CalculateContainer = props => (
  <div className='calculateContainer'>
    {props.info && <InfoGroup {...props.info} />}
    {renderQuestionGroups(props.questions)}
    <ResultCard points={props.points} data={props.data} />
  </div>
)

const mapStateToProps = state => {
  const { points, results } = state.calculator.data
  return {
    points,
    data: results[points]
  }
}

export default connect(mapStateToProps)(CalculateContainer)
