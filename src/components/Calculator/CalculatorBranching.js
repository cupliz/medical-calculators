import React, { Component } from 'react'
import CalculatorHeader from './header/CalculatorHeader'
import CalculatorBody from './body/CalculatorBody'
import { connect } from 'react-redux'
import { fetchCalcData } from '../../store/modules/calculator'

const LoadingView = () => <div>Loading...</div>

const ErrorView = props => (
  <div>I'm sorry! Error: {props.errorMessage}. Please try again.</div>
)

const ComponentView = props => (
  <div className='calculator'>
    <CalculatorHeader title={props.data.title} />
    <CalculatorBody />
  </div>
)

const CalculatorBranch = props => {
  if (props.loading) {
    return <LoadingView />
  } else if (props.data) {
    return <ComponentView data={props.data[0]} />
  } else if (props.errorMessage) {
    return <ErrorView errorMessage={props.errorMessage} />
  } else {
    return null
  }
}

class Calculator extends Component {
  componentDidMount () {
    this.props.fetchCalcData()
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
