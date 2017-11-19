import axios from 'axios'
import {
  createCalculateArray,
  createCalculateObject,
  deleteProperty
} from '../../utils/immutable'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_CALC_DATA_REQUEST = 'calculator/FETCH_CALC_DATA_REQUEST'
export const FETCH_CALC_DATA_SUCCESS = 'calculator/FETCH_CALC_DATA_SUCCESS'
export const FETCH_CALC_DATA_ERROR = 'calculator/FETCH_CALC_DATA_ERROR'
export const PICK_RADIO_ANSWER = 'calculator/PICK_RADIO_ANSWER'
export const PICK_CHECKBOX_ANSWER = 'calculator/PICK_CHECKBOX_ANSWER'
export const TYPE_PICK_INPUT_SELECT = 'calculator/TYPE_PICK_INPUT_SELECT'

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

export const typePickInputSelect = (
  group = '',
  inputValue = '',
  selectValue = ''
) => {
  return {
    type: TYPE_PICK_INPUT_SELECT,
    payload: {
      group,
      inputValue,
      selectValue,
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
          questions: createCalculateObject(
            state.data.questions,
            action,
            'group',
            {
              answer: action.payload.answer,
              points: action.payload.pointsChange
            }
          )
        }
      }

    case PICK_CHECKBOX_ANSWER:
      return {
        ...state,
        data: {
          ...state.data,
          points: action.payload.pointsTotal,
          questions: createCalculateArray(state.data.questions, action, 'group')
        }
      }

    case TYPE_PICK_INPUT_SELECT:
      return {
        ...state,
        data: {
          ...state.data,
          questions: createCalculateObject(
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
