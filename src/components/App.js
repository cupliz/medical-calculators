import React from 'react'
import Header from './Header'
import Body from './Body'
import Result from './Result'
import data from './data.json'

const App = () => (
  <div className='app'>
    <Header />
    <Body />
    <Result points={1} data={data[1]} />
  </div>
)

export default App
