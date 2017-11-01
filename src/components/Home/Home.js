import React from 'react'

const renderList = list => {
  return list.map(listItem => <li key={listItem}>{listItem}</li>)
}

const Home = props => <ul>{renderList(props.list)}</ul>

export default Home
