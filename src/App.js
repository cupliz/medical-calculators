import React from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import Home from './components/Home/Home'
import Calculator from './components/Calculator/Calculator'
import FOF from './components/FOF/FOF'
import DocumentTitle from 'react-document-title'
import calculatorsList from './data/list'

const App = () => (
  <main className='app'>
    <DocumentTitle title='Doc Bot Calculators'>
      <Switch>
        <Route
          exact
          path='/'
          render={routeProps => <Home data={calculatorsList} {...routeProps} />}
        />
        {calculatorsList.map(calculator => (
          <Route
            exact
            key={calculator.id}
            path={`/${calculator.id}`}
            render={routeProps => (
              <Calculator data={calculatorsList} calculatorId={calculator.id} {...routeProps} />
            )}
          />
        ))}
        <Route render={() => <FOF />} />
      </Switch>
    </DocumentTitle>
  </main>
)

export default withRouter(App)
