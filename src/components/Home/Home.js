import React, { Component } from 'react'
import { connect } from 'react-redux'
import { cleanCalculator } from '../../store/modules/calculator'
import CalculatorList from '../CalculatorList/CalculatorList'
import CalculatorSearch from '../CalculatorSearch/CalculatorSearch'

class Home extends Component {
  componentDidMount () {
    this.props.cleanCalculator()
  }

  sortList = list => {
    list.sort((a, b) => {
      const titleA = a.title.toLowerCase()
      const titleB = b.title.toLowerCase()
      if (titleA < titleB) {
        // sort string ascending
        return -1
      } else if (titleA > titleB) {
        return 1
      } else {
        return 0 // no sorting
      }
    })
    return list
  }

  render () {
    return (
      <div>
        <CalculatorSearch data={this.sortList(this.props.data)} />
        <CalculatorList data={this.sortList(this.props.data)} />
      </div>
    )
  }
}

const mapDispatchToProps = {
  cleanCalculator: cleanCalculator
}

export default connect(null, mapDispatchToProps)(Home)
