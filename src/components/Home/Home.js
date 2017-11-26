import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  renderList = list => {
    return list.map(listItem => (
      <li key={listItem.id}>
        <Link to={`/${listItem.id}`}>{listItem.title}</Link>
      </li>
    ))
  }

  render () {
    return <ul>{this.renderList(this.props.data)}</ul>
  }
}

export default Home
