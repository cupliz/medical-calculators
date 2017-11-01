import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Home from './components/Home/Home'
import Calculator from './components/Calculator/Calculator'
import { connect } from 'react-redux'
import { fetchListData } from './store/modules/list'
import Loader from './components/Loader/Loader'

const LoadingView = () => <Loader />

const ErrorView = props => (
  <div>I'm sorry! Error: {props.errorMessage}. Please try again.</div>
)

const ComponentView = props => (
  <main className='app'>
    <Route
      exact
      path='/'
      render={routeProps => <Home data={props.data} {...routeProps} />}
    />
    <Route
      exact
      path='/chads2-score-for-atrial-fibrillation'
      render={routeProps => (
        <Calculator
          data={props.data}
          id={'chads2-score-for-atrial-fibrillation'}
          {...routeProps}
        />
      )}
    />
    <Route
      exact
      path='/curb-65-pneumonia-severity-score'
      render={routeProps => (
        <Calculator
          data={props.data}
          id={'curb-65-pneumonia-severity-score'}
          {...routeProps}
        />
      )}
    />
  </main>
)

const AppBranch = props => {
  if (props.loading) {
    return <LoadingView />
  } else if (props.data) {
    return <ComponentView data={props.data} />
  } else if (props.errorMessage) {
    return <ErrorView errorMessage={props.errorMessage} />
  } else {
    return null
  }
}

class App extends Component {
  componentDidMount () {
    this.props.fetchListData()
  }

  render () {
    return <AppBranch {...this.props.list} />
  }
}

const mapStateToProps = state => ({
  list: state.list
})

const mapDispatchToProps = {
  fetchListData
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
