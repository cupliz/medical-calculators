import React, { Component } from 'react'
import CalculatorHeader from './header/CalculatorHeader'
import CalculatorBody from './body/CalculatorBody'
import { connect } from 'react-redux'
import { fetchCalcData } from '../../store/modules/calculator'

const LoadingView = () => <div>Loading...</div>

const ErrorView = errorMessage => <div>I'm sorry! Error: ${errorMessage}</div>

const ComponentView = props => <div>Inside ComponentView</div>

class Calculator extends Component {
  state = { loading: true }

  componentDidMount () {
    // do fetch there
  }

  render () {
    if (this.state.loading) {
      return this.props.renderLoading()
    } else if (this.state.planet) {
      return this.props.renderPlanet(this.state.planet)
    } else {
      return this.props.renderError(this.state.error)
    }
  }
}

export default () => (
  <Calculator
    renderLoading={() => <LoadingView />}
    renderError={errorMessage => <ErrorView />}
    renderPlanet={planet => <ComponentView {...planet} />}
  />
)
