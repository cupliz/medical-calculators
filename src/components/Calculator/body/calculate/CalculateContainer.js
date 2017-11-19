import React from 'react'
import QuestionGroup from './questions/QuestionGroup'
import InfoGroup from './InfoGroup'
import ResultCard from './results/ResultCard'

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
      <ResultCard />
    </div>
  )
}

export default CalculateContainer
