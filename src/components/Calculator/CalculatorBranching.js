import React, { Component } from 'react'
import CalculatorHeader from './header/CalculatorHeader'
import CalculatorBody from './body/CalculatorBody'
import { connect } from 'react-redux'
import { fetchCalcData } from '../../store/modules/calculator'

const LoadingView = () => <div>Loading...</div>

const ErrorView = () => <div>I'm sorry! Please try again.</div>

const PlanetView = ({ name, climate, terrain }) => (
  <div>
    <h2>{name}</h2>
    <div>Climate: {climate}</div>
    <div>Terrain: {terrain}</div>
  </div>
)

const PlanetBranch = ({ loading, planet }) => {
  if (loading) {
    return <LoadingView />
  } else if (planet) {
    return <PlanetView {...planet} />
  } else {
    return <ErrorView />
  }
}

class Calculator extends Component {
  state = { loading: true }

  componentDidMount () {
    fetch('https://swapi.co/api/planets/5')
      .then(res => res.json())
      .then(
        planet => this.setState({ loading: false, planet }),
        error => this.setState({ loading: false, error })
      )
  }

  render () {
    return <PlanetBranch {...this.state} />
  }
}

export default Calculator
