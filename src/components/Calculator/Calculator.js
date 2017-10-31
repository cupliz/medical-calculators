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
        <CalculatorHeader />
        <CalculatorBody />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  calculators: state.data
})

const mapDispatchToProps = {
  fetchCalcData
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator)
