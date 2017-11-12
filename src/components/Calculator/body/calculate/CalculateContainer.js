import React from 'react'
import QuestionGroup from './QuestionGroup'
import InfoGroup from './InfoGroup'

const renderInfoGroup = info => {
  return <InfoGroup {...info} />
}

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
      {info && renderInfoGroup(info)}
      {renderQuestionGroups(questions)}
    </div>
  )
}

export default CalculateContainer
