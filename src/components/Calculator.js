import React from 'react'
import Header from './Header'
import Body from './Body'
import Result from './Result'
import resultData from './resultData.json'

const Calculator = () => (
  <div className='calculator'>
    <Header />
    <Body />
    <Result points={1} data={resultData[1]} />
  </div>
)

export default Calculator
