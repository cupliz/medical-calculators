import axios from 'axios'
import { deleteProperty } from '../../utils/immutable'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_CALC_DATA_REQUEST = 'calculator/FETCH_CALC_DATA_REQUEST'
export const FETCH_CALC_DATA_SUCCESS = 'calculator/FETCH_CALC_DATA_SUCCESS'
export const FETCH_CALC_DATA_ERROR = 'calculator/FETCH_CALC_DATA_ERROR'
export const PICK_ANSWER_REQUEST = 'calculator/PICK_ANSWER_REQUEST'
export const PICK_ANSWER_SUCCESS = 'calculator/PICK_ANSWER_SUCCESS'
export const PICK_ANSWER_ERROR = 'calculator/PICK_ANSWER_ERROR'

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

export const pickAnswerRequest = (loading = true) => {
  return {
    type: PICK_ANSWER_REQUEST,
    payload: {
      loading
    }
  }
}

export const pickAnswerSuccess = (answer = {}) => {
  return {
    type: PICK_ANSWER_SUCCESS,
    payload: {
      answer,
      receivedAt: new Date().toISOString()
    }
  }
}

export const pickAnswerError = (errorMessage = '') => {
  return {
    type: PICK_ANSWER_ERROR,
    payload: {
      errorMessage,
      receivedAt: new Date().toISOString()
    }
  }
}

// ------------------------------------
// Specialized Actions
// ------------------------------------

export const fetchCalcData = () => {
  return (dispatch, getState) => {
    dispatch(fetchCalcDataRequest(true))
    const url = `http://localhost:3001/calculators/2`
    return axios
      .get(url)
      .then(({ data }) => {
        // TODO delete
        return setTimeout(() => {
          dispatch(fetchCalcDataSuccess(data))
          dispatch(fetchCalcDataRequest(false))
        }, 2000)
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
          dispatch(fetchCalcDataError(`Error: ${error.message}`))
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
        return {
          ...state,
          ...action.payload
        }
      }

    case FETCH_CALC_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload
      }

    case FETCH_CALC_DATA_ERROR:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}
