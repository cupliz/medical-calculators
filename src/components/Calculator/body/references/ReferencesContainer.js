import React from 'react'
import InfoCard from './InfoCard'

const ReferencesContainer = props => {
  const { notes, references, formula } = props

  return (
    <div>
      {notes && (
        <InfoCard title='Notes' type={notes.type} content={notes.content} />
      )}
      {references && (
        <InfoCard
          title='References'
          type={references.type}
          content={references.content}
        />
      )}
      {formula && (
        <InfoCard
          title='Formula'
          type={formula.type}
          content={formula.content}
        />
      )}
    </div>
  )
}

export default ReferencesContainer
