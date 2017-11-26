import React from 'react'
import { Link } from 'react-router-dom'

const renderList = list => {
  return list.map(listItem => (
    <li key={listItem.id}>
      <Link to={`/${listItem.id}`}>{listItem.title}</Link>
    </li>
  ))
}

const Home = props => <ul>{renderList(props.data)}</ul>

export default Home
