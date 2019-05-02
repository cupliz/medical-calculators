import {
  createCalculateArray,
  createCalculateObject,
  deleteProperty
} from '../../utils/immutable'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_CALC_DATA_SUCCESS = 'calculator/FETCH_CALC_DATA_SUCCESS'
export const FETCH_CALC_DATA_ERROR = 'calculator/FETCH_CALC_DATA_ERROR'
export const PICK_RADIO_ANSWER = 'calculator/PICK_RADIO_ANSWER'
export const PICK_CHECKBOX_ANSWER = 'calculator/PICK_CHECKBOX_ANSWER'
export const TYPE_PICK_INPUT_SELECT = 'calculator/TYPE_PICK_INPUT_SELECT'
export const TYPE_INPUT_SEARCH = 'calculator/TYPE_INPUT_SEARCH'
export const PICK_SELECT_OPTION = 'calculator/PICK_SELECT_OPTION'
export const FETCH_DATABASE = 'calculator/FETCH_DATABASE'
export const CLEAN_CALCULATOR = 'calculator/CLEAN_CALCULATOR'

// ------------------------------------
// Initial State
// ------------------------------------

const initialState = {}

// ------------------------------------
// Actions
// ------------------------------------

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

export const typeInputSearch = (
  group = '',
  inputValue = '',
) => {
  return {
    type: TYPE_INPUT_SEARCH,
    payload: {
      group,
      inputValue,
      receivedAt: new Date().toISOString()
    }
  }
}

export const pickSelectOption = (
  group = '',
  selectValue = '',
) => {
  return {
    type: PICK_SELECT_OPTION,
    payload: {
      group,
      selectValue,
      receivedAt: new Date().toISOString()
    }
  }
}

export const fetchDatabase = (
  payload = [],
) => {
  return {
    type: FETCH_DATABASE,
    payload
  }
}

export const cleanCalculator = () => {
  return {
    type: CLEAN_CALCULATOR,
    payload: {
      receivedAt: new Date().toISOString()
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CALC_DATA_SUCCESS:
      return { ...deleteProperty(state, 'errorMessage'), ...action.payload }

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
            'group',
            {
              input: action.payload.inputValue,
              select: action.payload.selectValue
            }
          )
        }
      }

    case TYPE_INPUT_SEARCH:
      return {
        ...state,
        data: {
          ...state.data,
          questions: createCalculateObject(
            state.data.questions,
            action,
            'group',
            {
              input: action.payload.inputValue
            }
          )
        }
      }

    case PICK_SELECT_OPTION:
      return {
        ...state,
        data: {
          ...state.data,
          questions: createCalculateObject(
            state.data.questions,
            action,
            'group',
            {
              select: action.payload.selectValue
            }
          )
        }
      }

    case FETCH_DATABASE:
      return {
        ...state,
        database: action.payload
      }
    

    case CLEAN_CALCULATOR:
      return {}

    default:
      return state
  }
}
