import React from 'react'
import InfoCard from './InfoCard'

const ReferencesContainer = props => (
  <div>
    <InfoCard
      title='Notes'
      type={props.notes.type}
      content={props.notes.content}
    />
    <InfoCard
      title='References'
      type={props.references.type}
      content={props.references.content}
    />
  </div>
)

export default ReferencesContainer
