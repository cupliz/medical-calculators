import React from 'react'
import ClosableCard from './ClosableCard'

const data = [
  {
    title: 'Notes',
    list: [
      'Estimates stroke risk in patients with atrial fibrillation',
      'The CHADS2 score is one of several risk stratification schemes that can help determine the 1 year risk of an ischemic stroke in a non-anticoagulated patient with non-valvular atrial fibrillation and determine which antithrombotic therapy is most appropriate',
      'The CHA2-DS2-VASC score may be a better tool to assess stroke risk in patients with atrial fibrillation.  It risk stratifies these patients better than the CHADS2 score'
    ]
  },
  {
    title: 'References',
    content:
      'Gage BF, Waterman AD, Shannon W, et. al. Validation of clinical classification schemes for predicting stroke: results from the National Registry of Atrial Fibrillation, JAMA, 2001 Jun 13;285(22):2864-70'
  }
]

const renderCards = () => {
  return data.map(item => {
    return (
      <ClosableCard
        key={item.title}
        title={item.title}
        content={item.content}
      />
    )
  })
}

const References = () => <div>{renderCards()}</div>

export default References
