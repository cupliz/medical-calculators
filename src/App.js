import React, { Component } from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import Home from './components/Home/Home'
import Calculator from './components/Calculator/Calculator'
import { connect } from 'react-redux'
import { fetchListData } from './store/modules/list'

class App extends Component {
  render() {
    return (
      <main>
        <header>
          <Link to="/">Home</Link> {' - '}
          <Link to="/chad2-calc">CHADS2 Score for Atrial Fibrillation</Link>
        </header>

        <Route exact path="/" component={Home} />
        <Route exact path="/chad2-calc" component={Calculator} />
      </main>
    )
  }
}

const mapStateToProps = state => ({
  list: state.list
})

const mapDispatchToProps = {
  fetchListData
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
