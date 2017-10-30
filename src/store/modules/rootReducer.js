import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import calculator from './calculator'

export default combineReducers({
  router: routerReducer,
  calculator
})
