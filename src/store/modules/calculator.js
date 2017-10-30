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
  points: 0,
  isFetchingCalcData: false,
  isPickingAnswer: false
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

export const fetchCalcDataSuccess = (calc = {}) => {
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

// ------------------------------------
// Specialized Actions
// ------------------------------------

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CALC_DATA_REQUEST:
      return {
        ...state,
        isFetchingCalcData: true
      }

    case FETCH_CALC_DATA_SUCCESS:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing
      }

    case FETCH_CALC_DATA_ERROR:
      return {
        ...state,
        isDecrementing: true
      }

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing
      }

    default:
      return state
  }
}
