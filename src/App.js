import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import Home from './components/Home/Home'
import Calculator from './components/Calculator/Calculator'
import { connect } from 'react-redux'
import { fetchListData } from './store/modules/list'
import Loader from './components/Loader/Loader'
import FOF from './components/FOF/FOF'

const LoadingView = () => <Loader />

const ErrorView = props => (
  <div>I'm sorry! Error: {props.errorMessage}. Please try again.</div>
)

const ComponentView = props => (
  <main className='app'>
    <Switch>
      <Route
        exact
        path='/'
        render={routeProps => <Home data={props.data} {...routeProps} />}
      />
      {props.data.map(calculator => (
        <Route
          exact
          key={calculator.id}
          path={`/${calculator.id}`}
          render={routeProps => (
            <Calculator data={props.data} calculatorId={calculator.id} {...routeProps} />
          )}
        />
      ))}
      <Route render={() => <FOF />} />
    </Switch>
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