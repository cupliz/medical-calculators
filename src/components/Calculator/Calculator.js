import React, { Component } from 'react'
import CalculatorHeader from './header/CalculatorHeader'
import CalculatorBody from './body/CalculatorBody'
import { connect } from 'react-redux'
import { fetchCalcData } from '../../store/modules/calculator'
import Loader from '../Loader/Loader'

const LoadingView = () => <Loader />

const ErrorView = props => (
  <div>I'm sorry! Error: {props.errorMessage}. Please try again.</div>
)

class ComponentView extends Component {
  componentDidMount () {
    if (this.props.data.type === 'formula') {
      import(`${this.props.calculatorId}.js`)
        .then(module => {
          console.log(module)
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  render () {
    return (
      <div className='calculator'>
        <CalculatorHeader title={this.props.data.title} />
        <CalculatorBody data={this.props.data} />
      </div>
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
