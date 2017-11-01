import React, { Component } from 'react'
import CalculatorHeader from './header/CalculatorHeader'
import CalculatorBody from './body/CalculatorBody'
import { connect } from 'react-redux'
import { fetchCalcData, pickAnswer } from '../../store/modules/calculator'
import Loader from '../Loader/Loader'

const LoadingView = () => <Loader />

const ErrorView = props => (
  <div>I'm sorry! Error: {props.errorMessage}. Please try again.</div>
)

const ComponentView = props => (
  <div className='calculator'>
    <CalculatorHeader title={props.data.title} />
    <CalculatorBody data={props.data} pickAnswer={props.pickAnswer} />
  </div>
)

const CalculatorBranch = props => {
  if (props.loading) {
    return <LoadingView />
  } else if (props.data) {
    return <ComponentView data={props.data} pickAnswer={props.pickAnswer} />
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
    return <CalculatorBranch {...this.props.calculator} pickAnswer={this.props.pickAnswer} />
  }
}

const mapStateToProps = state => ({
  calculator: state.calculator
})

const mapDispatchToProps = {
  fetchCalcData,
  pickAnswer
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator)
