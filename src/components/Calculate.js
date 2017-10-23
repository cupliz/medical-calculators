import React, { Component } from 'react'
import Field from './Field'

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
        <div className='fields'>
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
        </div>
      </div>
    )
  }
}

export default Calculate
