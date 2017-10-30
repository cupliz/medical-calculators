import React from 'react'
import { Link, Route } from 'react-router-dom'
import Calculator from './calculator/Calculator'

const App = () => (
  <div>
    <header>
      <Link to='/'>Home</Link> {}
      <Link to='/chad2-calc'>Calculator</Link>
    </header>

    <main>
      <Route exact path='/chad2-calc' component={Calculator} />
    </main>
  </div>
)

export default App
