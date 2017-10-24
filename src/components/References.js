import React from 'react'
import Typography from 'material-ui/Typography'
import ClosableCard from './ClosableCard'

const data = [
  {
    title: 'Notes',
    content: <ul><li>Estimates stroke risk in patients with atrial fibrillation</li>

      <li>The CHADS2 score is one of several risk stratification schemes that can help determine the 1 year risk of an ischemic stroke in a non-anticoagulated patient with non-valvular atrial fibrillation and determine which antithrombotic therapy is most appropriate</li>

      <li>The CHA2-DS2-VASC score may be a better tool to assess stroke risk in patients with atrial fibrillation.  It risk stratifies these patients better than the CHADS2 score</li></ul>
  }
]

const renderCards = () => {
  return data.map(item => {
    return (
      <ClosableCard key={item.title} title={item.title} content={item.content} />
    )
  })
}

const References = () => (
  <div>
    {renderCards()}
  </div>
)

export default References
