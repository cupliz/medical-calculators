import React from 'react'
import QuestionGroup from './QuestionGroup'
import InfoGroup from './InfoGroup'

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
