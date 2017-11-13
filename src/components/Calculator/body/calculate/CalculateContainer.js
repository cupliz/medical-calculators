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

const mapStateToProps = state => ({
  points: state.calculator.data.points,
  data: state.calculator.data.results[state.calculator.data.points]
})

export default connect(mapStateToProps)(CalculateContainer)
