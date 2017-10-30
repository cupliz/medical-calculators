import React from 'react'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'


const Home = props => (
  <div>
    <button onClick={() => props.changePage()}>
      Go to about page via redux
    </button>
  </div>
)

const mapStateToProps = state => ({
  calculator: state.calculator
})

const mapDispatchToProps = {
  changePage: path => push(`/chad2-calc`)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
