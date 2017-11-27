import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { cleanCalculator } from '../../store/modules/calculator'
import CalculatorList from '../CalculatorList/CalculatorList'
import CalculatorSearch from '../CalculatorSearch/CalculatorSearch'

class Home extends Component {
  componentDidMount () {
    this.props.cleanCalculator()
  }

  render () {
    return (
      <div>
        <CalculatorSearch data={this.props.data} />
        <CalculatorList data={this.props.data} />
      </div>
    )
  }
}

const mapDispatchToProps = {
  cleanCalculator: cleanCalculator
}

export default connect(null, mapDispatchToProps)(Home)
