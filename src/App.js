import React from 'react'
import { Link, Route } from 'react-router-dom'
import Calculator from './components/Calculator/Calculator'
import { connect } from 'react-redux'
import Home from './components/Home/Home'

const App = props => (
  <div>
    <header>
      <Link to='/'>Home</Link> {}
      <Link to='/chad2-calc'>Calculator</Link>
    </header>

    <main>
      <Route exact path='/' component={Home} />
      <Route exact path='/chad2-calc' component={Calculator} />
    </main>
  </div>
)

const mapStateToProps = state => ({
  calculator: state.calculator
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
