import React from 'react'
import QuestionGroup from './questions/QuestionGroup'
import InfoGroup from './InfoGroup'

const renderQuestionGroups = questions =>
  questions.map(questionGroup => (
    <QuestionGroup key={questionGroup.group} {...questionGroup} />
  ))

const CalculateContainer = props => {
  const { info, questions } = props
  return (
    <div className='calculateContainer'>
      {info && <InfoGroup {...info} />}
      {renderQuestionGroups(questions)}
    </div>
  )
}

export default CalculateContainer
