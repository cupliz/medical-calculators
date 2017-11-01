import React from 'react'
import { Link } from 'react-router-dom'

const renderList = list => {
  return list.map(listItem => (
    <li key={listItem}>
      <Link to={`/${listItem}`}>{listItem}</Link>
    </li>
  ))
}

const Home = props => <ul>{renderList(props.list)}</ul>

export default Home
