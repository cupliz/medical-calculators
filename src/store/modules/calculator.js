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

export const increment = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    dispatch({
      type: INCREMENT
    })
  }
}

export const incrementAsync = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: INCREMENT
      })
    }, 3000)
  }
}

export const decrement = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    dispatch({
      type: DECREMENT
    })
  }
}

export const decrementAsync = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: DECREMENT
      })
    }, 3000)
  }
}
