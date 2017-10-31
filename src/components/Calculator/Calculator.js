import React, { Component } from 'react'
import CalculatorHeader from './header/CalculatorHeader'
import CalculatorBody from './body/CalculatorBody'
import { connect } from 'react-redux'
import { fetchCalcData } from '../../store/modules/calculator'

class Calculator extends Component {
  componentDidMount () {
    this.props.fetchCalcData()
  }

  render () {
    return (
      <div className='calculator'>
        <CalculatorHeader title={this.props.calculator} />
        <CalculatorBody />
      </div>
    )
  }
}

const getCalculator = (state) => {
  if (state.calculator.data) {
    return state.calculator.data[0]
  } else {
    return null
  }
}

const mapStateToProps = state => ({
  calculator: getCalculator(state)
})

const mapDispatchToProps = {
  fetchCalcData
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator)
