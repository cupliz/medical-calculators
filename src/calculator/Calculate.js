import React, { Component } from 'react'
import Field from '../components/Field'
import Result from '../components/Result'

const data = {
  0: [
    'Low risk of thromboembolic event. 1.9% risk of event per year if no coumadin.',
    'The adjusted stroke rate was the expected stroke rate per 100 person-years derived from the multivariable model assuming that aspirin was not taken.'
  ],
  1: [
    'Intermediate risk of thromboembolic event. 2.8% risk of event per year if no coumadin.',
    'The adjusted stroke rate was the expected stroke rate per 100 person-years derived from the multivariable model assuming that aspirin was not taken.'
  ],
  2: [
    'Intermediate risk of thromboembolic event. 4.0% risk of event per year if no coumadin.',
    'The adjusted stroke rate was the expected stroke rate per 100 person-years derived from the multivariable model assuming that aspirin was not taken.'
  ],
  3: [
    'High risk of thromboembolic event. 5.9% risk of event per year if no coumadin.',
    'The adjusted stroke rate was the expected stroke rate per 100 person-years derived from the multivariable model assuming that aspirin was not taken.'
  ],
  4: [
    'High risk of thromboembolic event. 8.5% risk of event per year if no coumadin.',
    'The adjusted stroke rate was the expected stroke rate per 100 person-years derived from the multivariable model assuming that aspirin was not taken.'
  ],
  5: [
    'Note: While history of stroke provides 2 points, most physicians would move these patients directly to the high risk group (>8.5% risk of event per year if no coumadin.)',
    'By points directly: High risk of thromboembolic event. 12.5% risk of event per year if no coumadin.',
    'The adjusted stroke rate was the expected stroke rate per 100 person-years derived from the multivariable model assuming that aspirin was not taken.'
  ],
  6: [
    'Note: While history of stroke provides 2 points, most physicians would move these patients directly to the high risk group (>8.5% risk of event per year if no coumadin.)',
    'By points directly: High risk of thromboembolic event. 18.2% risk of event per year if no coumadin.',
    'The adjusted stroke rate was the expected stroke rate per 100 person-years derived from the multivariable model assuming that aspirin was not taken.'
  ]
}

class Calculate extends Component {
  state = {
    points: 0
  }

  handleChange = (e, value) => {
    if (value === '0') {
      const maxValue = parseInt(e.target.name, 10)
      this.setState(prevState => {
        return { points: prevState.points - maxValue }
      })
    } else {
      this.setState(prevState => {
        return { points: prevState.points + parseInt(value, 10) }
      })
    }
  }

  render () {
    return (
      <div className='calculate'>
        <Field
          label='Congestive Heart Failure History'
          yesPoints={1}
          onChange={this.handleChange}
        />
        <Field
          label='Hypertension history'
          yesPoints={1}
          onChange={this.handleChange}
        />
        <Field
          label='Age ≥ 75 years'
          yesPoints={1}
          onChange={this.handleChange}
        />
        <Field
          label='Diabetes melitus history'
          yesPoints={1}
          onChange={this.handleChange}
        />
        <Field
          label='Stroke or TIA symptoms previously'
          yesPoints={2}
          onChange={this.handleChange}
        />
        <Result points={this.state.points} data={data[this.state.points]} />
      </div>
    )
  }
}

export default Calculate
