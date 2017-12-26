import React, { Component } from 'react'
import CalculatorBody from './body/CalculatorBody'
import { connect } from 'react-redux'
import { fetchCalcData } from '../../store/modules/calculator'
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
          <ResultCard />
        </div>
      </DocumentTitle>
    )
  }
}

const CalculatorBranch = props => {
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

class Calculator extends Component {
  componentDidMount () {
    this.props.fetchCalcData(this.props.calculatorId)
  }

  render () {
    return <CalculatorBranch {...this.props.calculator} />
  }
}

const mapStateToProps = state => ({
  calculator: state.calculator
})

const mapDispatchToProps = {
  fetchCalcData
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator)
