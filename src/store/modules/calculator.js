import axios from 'axios'

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

const initialState = {
  // points: 0,
  // isFetchingCalcData: false,
  // isPickingAnswer: false
}

// ------------------------------------
// Actions
// ------------------------------------

export const fetchCalcDataRequest = (isLoaded = false) => {
  return {
    type: FETCH_CALC_DATA_REQUEST,
    payload: {
      isLoaded
    }
  }
}

export const fetchCalcDataSuccess = (calculator = {}) => {
  return {
    type: FETCH_CALC_DATA_SUCCESS,
    payload: {
      calc,
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

export const pickAnswerRequest = (isLoaded = false) => {
  return {
    type: PICK_ANSWER_REQUEST,
    payload: {
      isLoaded
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

// TODO RENAME AND CHOOSE AXIOS VS FETCH

export const fetchCalcDataFetch = () => {
  return (dispatch, getState) => {
    dispatch(fetchCalcDataRequest())
    const url = `http://localhost:3001/calculators/`
    return fetch(url, {
      method: 'GET'
    })
      .then(response => {
        if (response.status >= 400) {
          dispatch(fetchCalcDataError(response.status + ' Error'))
          dispatch(fetchCalcDataRequest(false))
        }
        return response.json()
      })
      .then(json => {
        dispatch(fetchCalcDataSuccess(json))
      })
      .then(() => {
        dispatch(fetchCalcDataRequest(true))
      })
      .catch(error => {
        dispatch(fetchCalcDataError(error))
        dispatch(fetchCalcDataRequest(false))
      })
  }
}

export const fetchCalcDataErrorFetch = () => {
  return (dispatch, getState) => {
    dispatch(fetchCalcDataRequest())
    const url = `http://localhost:3001/calculators/2`
    return fetch(url, {
      method: 'GET'
    })
      .then(response => {
        if (response.status >= 400) {
          dispatch(fetchCalcDataError(response.status + ' Error'))
          dispatch(fetchCalcDataRequest(false))
        }
        return response.json()
      })
      .then(json => {
        dispatch(fetchCalcDataSuccess(json))
      })
      .then(() => {
        dispatch(fetchCalcDataRequest(true))
      })
      .catch(error => {
        dispatch(fetchCalcDataError(error))
        dispatch(fetchCalcDataRequest(false))
      })
  }
}

export const fetchCalcDataErrorAxios = () => {
  return (dispatch, getState) => {
    dispatch(fetchCalcDataRequest())
    const url = `http://localhost:3001/calculators/2`
    return axios
      .get(url)
      .then(response => {
        return response.data
      })
      .then(data => {
        dispatch(fetchCalcDataSuccess(data))
      })
      .then(() => {
        dispatch(fetchCalcDataRequest(true))
      })
      .catch(error => {
        dispatch(fetchCalcDataError(error))
        dispatch(fetchCalcDataRequest(false))
      })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CALC_DATA_REQUEST:
      return {
        ...state,
        ...action.payload
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
