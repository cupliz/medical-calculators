import React from 'react'
import { Link, Route } from 'react-router-dom'
import Calculator from './calculator/Calculator'
import { connect } from 'react-redux'
import {
  fetchCalcDataAxios, fetchCalcDataErrorAxios, fetchCalcDataErrorFetch,
  fetchCalcDataFetch
} from '../store/modules/calculator'

const App = props => (
  <div>
    <header>
      <Link to='/'>Home</Link> {}
      <Link to='/chad2-calc'>Calculator</Link>
    </header>

    <div>
      <button onClick={props.fetchCalcDataFetch}>Fetch using Fetch</button>
      <button onClick={props.fetchCalcDataAxios}>Fetch using Axios</button>
    </div>

    <div>
      <button onClick={props.fetchCalcDataErrorFetch}>Fetch Error using Fetch</button>
      <button onClick={props.fetchCalcDataErrorAxios}>Fetch Error using Axios</button>
    </div>

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
  fetchCalcDataAxios,
  fetchCalcDataErrorFetch,
  fetchCalcDataErrorAxios
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
