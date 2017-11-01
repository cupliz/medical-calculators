import React from 'react'
import InfoCard from './InfoCard'

const ReferencesContainer = props => {
  const { notes, references } = props
  return (
    <div>
      <InfoCard
        title='Notes'
        type={notes.type}
        content={notes.content}
      />
      <InfoCard
        title='References'
        type={references.type}
        content={references.content}
      />
    </div>
  )
}

export default ReferencesContainer
