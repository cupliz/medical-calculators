import React, { Component } from 'react'
import Header from './Header'
import Body from './Body'
import Result from './Result'
import resultData from './resultData.json'

class Calculator extends Component {
  render () {
    return (
      <div className='calculator'>
        <Header />
        <Body />
        <Result points={1} data={resultData[1]} />
      </div>
    )
  }
}

export default Calculator
