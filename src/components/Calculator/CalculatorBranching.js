import React, { Component } from 'react'
import CalculatorHeader from './header/CalculatorHeader'
import CalculatorBody from './body/CalculatorBody'
import { connect } from 'react-redux'
import { fetchCalcData } from '../../store/modules/calculator'

const LoadingView = () => <div>Loading...</div>

const ErrorView = errorMessage => <div>I'm sorry! Please try again. Error: {errorMessage}</div>

const ComponentView = data => <div>Inside ComponentView</div>

const CalculatorBranch = props => {
  if (props.loading) {
    return <LoadingView />
  } else if (props.data) {
    return <ComponentView data={props.data[0]} />
  } else {
    // return <ErrorView errorMessage={props.errorMessage} />
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
