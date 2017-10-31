import React, { Component } from 'react'

const LoadingView = () => <div>Loading...</div>

const ErrorView = errorMessage => <div>I'm sorry! Error: ${errorMessage}</div>

const ComponentView = props => <div>Inside ComponentView</div>

class Calculator extends Component {
  state = { loading: true }

  componentDidMount () {
    console.log(1)
  }

  render () {
    if (this.state.loading) {
      return this.props.renderLoading()
    } else if (this.state.planet) {
      return this.props.renderComponent(this.state.data)
    } else {
      return this.props.renderError(this.state.error)
    }
  }
}

export default () => (
  <Calculator
    renderLoading={() => <LoadingView />}
    renderError={errorMessage => <ErrorView />}
    renderComponent={data => <ComponentView {...data} />}
  />
)
