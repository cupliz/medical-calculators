import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import calculator from './calculator'
import list from './list'

export default combineReducers({
  router: routerReducer,
  calculator,
  list
})
