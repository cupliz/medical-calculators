import React from 'react'
import { Link, Route } from 'react-router-dom'
import Calculator from './components/Calculator/Calculator'
import Home from './components/Home/Home'
import CalculatorBranching from './components/Calculator/CalculatorBranching'

const App = props => (
  <main>
    <header>
      <Link to='/'>Home</Link> {}
      <Link to='/chad2-calc'>Calculator</Link>
    </header>

    <Route exact path='/' component={Home} />
    <Route exact path='/chad2-calc' component={CalculatorBranching} />
  </main>
)

export default App
