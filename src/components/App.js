import React from 'react'
import { Link, Route } from 'react-router-dom'
import Calculator from './calculator/Calculator'
import { connect } from 'react-redux'
import { fetchCalcDataAxios, fetchCalcDataFetch } from '../store/modules/calculator'

const App = props => (
  <div>
    <header>
      <Link to='/'>Home</Link> {}
      <Link to='/chad2-calc'>Calculator</Link>
    </header>

    <button onClick={props.fetchCalcDataFetch}>Fetch using Fetch</button>
    <button onClick={props.fetchCalcDataAxios}>Fetch using Axios</button>

    <main>
      <Route exact path='/chad2-calc' component={Calculator} />
    </main>
  </div>
)

const mapStateToProps = state => ({
  calculator: state.calculator
})

const mapDispatchToProps = {
  fetchCalcDataFetch,
  fetchCalcDataAxios
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
