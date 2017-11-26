import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { cleanCalculator } from '../../store/modules/calculator'

class Home extends Component {
  renderList = list => {
    return list.map(listItem => (
      <li key={listItem.id}>
        <Link to={`/${listItem.id}`}>{listItem.title}</Link>
      </li>
    ))
  }

  componentDidMount () {
    this.props.cleanCalculator()
  }

  render () {
    return <ul>{this.renderList(this.props.data)}</ul>
  }
}

const mapDispatchToProps = {
  cleanCalculator: cleanCalculator
}

export default connect(null, mapDispatchToProps)(Home)
