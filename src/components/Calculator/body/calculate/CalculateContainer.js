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

const CalculateContainer = props => (
  <div className='calculateContainer'>
    {props.info && <InfoGroup {...props.info} />}
    {renderQuestionGroups(props.questions)}
  </div>
)

export default CalculateContainer
