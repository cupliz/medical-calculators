import React from 'react'
import Header from './Header'
import Body from './Body'
import Result from './Result'

const App = () => (
  <div className='app'>
    <Header />
    <Body />
    <Result points={123} data={data[this.state.points]} />
  </div>
)

export default App
