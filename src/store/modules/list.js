import axios from 'axios'
import { deleteProperty } from '../../utils/immutable'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_LIST_DATA_REQUEST = 'calculator/FETCH_LIST_DATA_REQUEST'
export const FETCH_LIST_DATA_SUCCESS = 'calculator/FETCH_LIST_DATA_SUCCESS'
export const FETCH_LIST_DATA_ERROR = 'calculator/FETCH_LIST_DATA_ERROR'

// ------------------------------------
// Initial State
// ------------------------------------

const initialState = []

// ------------------------------------
// Actions
// ------------------------------------

export const fetchListDataRequest = (loading = true) => {
  return {
    type: FETCH_LIST_DATA_REQUEST,
    payload: {
      loading
    }
  }
}

export const fetchListDataSuccess = (list = []) => {
  return {
    type: FETCH_LIST_DATA_SUCCESS,
    payload: {
      list,
      receivedAt: new Date().toISOString()
    }
  }
}

export const fetchListDataError = (errorMessage = '') => {
  return {
    type: FETCH_LIST_DATA_ERROR,
    payload: {
      errorMessage,
      receivedAt: new Date().toISOString()
    }
  }
}

// ------------------------------------
// Specialized Actions
// ------------------------------------

export const fetchListData = () => {
  return (dispatch, getState) => {
    dispatch(fetchListDataRequest(true))
    const url = `http://localhost:3001/list/`
    return axios
      .get(url)
      .then(({ data }) => {
        dispatch(fetchListDataSuccess(data))
        dispatch(fetchListDataRequest(false))
        // return setTimeout(() => {
        //   dispatch(fetchCalcDataSuccess(data))
        //   dispatch(fetchCalcDataRequest(false))
        // }, 2000)
      })
      .catch(error => {
        dispatch(fetchListDataRequest(false))
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          dispatch(
            fetchListDataError(
              `${error.response.status} ${error.response.statusText}`
            )
          )
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // console.log(error.request)
          dispatch(
            fetchListDataError(
              'The request was made but no response was received'
            )
          )
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log('Error', error.message)
          dispatch(fetchListDataError(error.message))
        }
      })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIST_DATA_REQUEST:
      if (!action.payload.loading) {
        return {
          ...deleteProperty(state, 'errorMessage'),
          ...action.payload
        }
      } else {
        return { ...state, ...action.payload }
      }

    case FETCH_LIST_DATA_SUCCESS:
      return { ...state, ...action.payload }

    case FETCH_LIST_DATA_ERROR:
      return { ...state, ...action.payload }

    case PICK_ANSWER:
      return {
        ...state,
        data: {
          ...state.data,
          points: action.payload.points
        }
      }

    default:
      return state
  }
}
