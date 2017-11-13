import axios from 'axios'
import { deleteProperty } from '../../utils/immutable'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_CALC_DATA_REQUEST = 'calculator/FETCH_CALC_DATA_REQUEST'
export const FETCH_CALC_DATA_SUCCESS = 'calculator/FETCH_CALC_DATA_SUCCESS'
export const FETCH_CALC_DATA_ERROR = 'calculator/FETCH_CALC_DATA_ERROR'
export const PICK_RADIO_ANSWER = 'calculator/PICK_RADIO_ANSWER'
export const PICK_CHECKBOX_ANSWER = 'calculator/PICK_CHECKBOX_ANSWER'
export const TYPE_INPUT = 'calculator/TYPE_INPUT'
export const PICK_SELECT = 'calculator/PICK_SELECT'

// ------------------------------------
// Initial State
// ------------------------------------

const initialState = {}

// ------------------------------------
// Actions
// ------------------------------------

export const fetchCalcDataRequest = (loading = true) => {
  return {
    type: FETCH_CALC_DATA_REQUEST,
    payload: {
      loading
    }
  }
}

export const fetchCalcDataSuccess = (data = {}) => {
  return {
    type: FETCH_CALC_DATA_SUCCESS,
    payload: {
      data,
      receivedAt: new Date().toISOString()
    }
  }
}

export const fetchCalcDataError = (errorMessage = '') => {
  return {
    type: FETCH_CALC_DATA_ERROR,
    payload: {
      errorMessage,
      receivedAt: new Date().toISOString()
    }
  }
}

export const pickRadioAnswer = (
  group = '',
  answer = '',
  pointsTotal = 0,
  pointsChange = 0
) => {
  return {
    type: PICK_RADIO_ANSWER,
    payload: {
      group,
      answer,
      pointsTotal,
      pointsChange,
      receivedAt: new Date().toISOString()
    }
  }
}

export const pickCheckboxAnswer = (
  group = '',
  answer = '',
  pointsTotal = 0,
  pointsChange = 0
) => {
  return {
    type: PICK_CHECKBOX_ANSWER,
    payload: {
      group,
      answer,
      pointsTotal,
      pointsChange,
      receivedAt: new Date().toISOString()
    }
  }
}

export const typeInput = (group = '', field = '', value = '') => {
  return {
    type: TYPE_INPUT,
    payload: {
      group,
      field,
      value,
      receivedAt: new Date().toISOString()
    }
  }
}

export const pickSelect = (group = '', field = '', value = '') => {
  return {
    type: PICK_SELECT,
    payload: {
      group,
      field,
      value,
      receivedAt: new Date().toISOString()
    }
  }
}

// ------------------------------------
// Specialized Actions
// ------------------------------------

export const fetchCalcData = calculatorId => {
  return (dispatch, getState) => {
    dispatch(fetchCalcDataRequest(true))
    let url = `http://localhost:3001/calculators/${calculatorId}`
    if (process.env.NODE_ENV === 'production') {
      url = `https://medical-calc.now.sh/calculators/${calculatorId}`
    }
    return axios
      .get(url)
      .then(({ data }) => {
        dispatch(fetchCalcDataSuccess(data))
        dispatch(fetchCalcDataRequest(false))
        // return setTimeout(() => {
        //   dispatch(fetchCalcDataSuccess(data))
        //   dispatch(fetchCalcDataRequest(false))
        // }, 2000)
      })
      .catch(error => {
        dispatch(fetchCalcDataRequest(false))
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          dispatch(
            fetchCalcDataError(
              `${error.response.status} ${error.response.statusText}`
            )
          )
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // console.log(error.request)
          dispatch(
            fetchCalcDataError(
              'The request was made but no response was received'
            )
          )
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log('Error', error.message)
          dispatch(fetchCalcDataError(error.message))
        }
      })
  }
}

const updateObjectInArray = (array, action, fieldName) => {
  return array.map(item => {
    if (item[fieldName] !== action.payload[fieldName]) {
      // This isn't the item we care about - keep it as-is
      return item
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      calculate: {
        answer: action.payload.answer,
        points: action.payload.pointsChange
      }
    }
  })
}

const updateObjectInArrayExtended = (array, action, fieldName) => {
  return array.map(item => {
    if (item[fieldName] !== action.payload[fieldName]) {
      // This isn't the item we care about - keep it as-is
      return item
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      calculate: updateCalculate(item.calculate, action)
    }
  })
}

const updateCalculate = (calculateArray, action) => {
  if (!calculateArray) {
    // we don't have an array, create with one object
    return [
      {
        answer: action.payload.answer,
        points: action.payload.pointsChange
      }
    ]
    // array exists
    // if array has the answer - we update that answer and return new array with updated answer
  } else if (
    calculateArray.filter(item => item.answer === action.payload.answer)
      .length > 0
  ) {
    return calculateArray.map(item => {
      if (item.answer === action.payload.answer) {
        // this is the item we care about, so update it
        return {
          answer: action.payload.answer,
          points: action.payload.pointsChange
        }
      } else {
        // this is not the item we care about so we return it
        return item
      }
    })
  } else {
    // if array doesn't have the answer - we copy arrays contentes, add new question it and return new array
    return [
      ...calculateArray,
      {
        answer: action.payload.answer,
        points: action.payload.pointsChange
      }
    ]
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CALC_DATA_REQUEST:
      if (!action.payload.loading) {
        return {
          ...deleteProperty(state, 'errorMessage'),
          ...action.payload
        }
      } else {
        return { ...state, ...action.payload }
      }

    case FETCH_CALC_DATA_SUCCESS:
      return { ...state, ...action.payload }

    case FETCH_CALC_DATA_ERROR:
      return { ...state, ...action.payload }

    case PICK_RADIO_ANSWER:
      return {
        ...state,
        data: {
          ...state.data,
          points: action.payload.pointsTotal,
          questions: updateObjectInArray(state.data.questions, action, 'group')
        }
      }

    case PICK_CHECKBOX_ANSWER:
      return {
        ...state,
        data: {
          ...state.data,
          points: action.payload.pointsTotal,
          questions: updateObjectInArrayExtended(
            state.data.questions,
            action,
            'group'
          )
        }
      }

    default:
      return state
  }
}
