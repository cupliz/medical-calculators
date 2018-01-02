import React, { Component } from 'react'
import CalculatorBody from './body/CalculatorBody'
import Loader from '../Loader/Loader'
import ResultCard from './results/ResultCard'
import DocumentTitle from 'react-document-title'

const LoadingView = () => <Loader />

const ErrorView = props => (
  <div>I'm sorry! Error: {props.errorMessage}. Please try again.</div>
)

class ComponentView extends Component {
  render () {
    return (
      <DocumentTitle title={this.props.data.title}>
        <div className='calculator'>
          <CalculatorBody data={this.props.data} />
          <ResultCard data={this.props.data} formula={this.props.formula} />
        </div>
      </DocumentTitle>
    )
  }
}

class Calculator extends Component {
  state = {
    loading: true,
    config: null,
    formula: null
  }

  componentDidMount () {
    import(`../../data/calculators/${this.props.calculatorId}.js`).then(module => {
      this.setState({ loading: false, formula: module.default, config: module.config })
    }).catch(err => {
      console.log(err.message)
    })
  }

  render () {
    if (this.state.loading) {
      return <LoadingView />
    } else if (this.state.config) {
      return <ComponentView data={this.state.config} formula={this.state.formula} />
    } else if (this.state.errorMessage) {
      return <ErrorView errorMessage={this.state.errorMessage} />
    } else {
      return null
    }
  }
}

export default Calculator
