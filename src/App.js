import React from 'react'
import { Link, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Calculator from './components/Calculator/Calculator'

const App = props => (
  <main>
    <header>
      <Link to='/'>Home</Link> {}
      <Link to='/chad2-calc'>CHADS2 Score for Atrial Fibrillation</Link>
    </header>

    <Route exact path='/' component={Home} />
    <Route exact path='/chad2-calc' component={Calculator} />
  </main>
)

export default App
