import React from 'react'
import CalculatorHeader from './header/CalculatorHeader'
import CalculatorBody from './body/CalculatorBody'
import { connect } from 'react-redux'

const Calculator = () => (
  <div className='calculator'>
    <CalculatorHeader />
    <CalculatorBody />
  </div>
)

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator)
