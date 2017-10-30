import { updateObjectInArray } from '../../../util/immutable'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_CONTRACTS = 'FETCH_CONTRACTS'
export const FETCH_CONTRACTS_SUCCESS = 'FETCH_CONTRACTS_SUCCESS'
export const FETCH_CONTRACTS_ERROR = 'FETCH_CONTRACTS_ERROR'
export const EDIT_CONTRACT = 'EDIT_CONTRACT'
export const EDIT_CONTRACT_SUCCESS = 'EDIT_CONTRACT_SUCCESS'
export const EDIT_CONTRACT_ERROR = 'EDIT_CONTRACT_ERROR'

// ------------------------------------
// Actions
// ------------------------------------

export const fetchContracts = (isLoaded = false) => {
  return {
    type: FETCH_CONTRACTS,
    payload: {
      isLoaded
    }
  }
}

export const fetchContractsSuccess = (contracts = []) => {
  return {
    type: FETCH_CONTRACTS_SUCCESS,
    payload: {
      contracts,
      receivedAt: new Date().toISOString()
    }
  }
}

export const fetchContractsError = (errormessage = '') => {
  return {
    type: FETCH_CONTRACTS_ERROR,
    payload: {
      errormessage,
      receivedAt: new Date().toISOString()
    }
  }
}

export const editContract = (contract = {}) => {
  return {
    type: EDIT_CONTRACT,
    payload: {
      contract,
      receivedAt: new Date().toISOString()
    }
  }
}

export const editContractSuccess = (isLoaded = false) => {
  return {
    type: EDIT_CONTRACT_SUCCESS,
    payload: {
      isLoaded
    }
  }
}

export const editContractError = (errormessage = {}) => {
  return {
    type: EDIT_CONTRACT_ERROR,
    payload: {
      errormessage,
      receivedAt: new Date().toISOString()
    }
  }
}

// ------------------------------------
// Specialized Action Creators
// ------------------------------------

export const getContracts = (lang = 'en') => {
  return (dispatch, getState) => {
    dispatch(fetchContracts())
    const url = `${__API__}contracts`
    const token = getState().auth.user.token
    return fetch(
      url, {
        method: 'GET',
        headers: {
          'x-auth-token': token
        }
      }).then((response) => {
      if (response.status >= 400) {
        dispatch(fetchContractsError(response.status + ' Error'))
        dispatch(fetchContracts(false))
      }
      return response.json()
    })
      .then(json => {
        dispatch(fetchContractsSuccess(json))
      })
      .then(json => dispatch(fetchContracts(true)))
      .catch(function (error) {
        dispatch(fetchContractsError(error))
        dispatch(fetchContracts(false))
      })
  }
}

export const putEditContract = (contract) => {
  return (dispatch, getState) => {
    const url = `${__API__}contracts/${contract.id}`
    const token = getState().auth.user.token
    return fetch(
      url, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(contract),
        credentials: 'include'
      }).then((response) => {
      if (response.status >= 400) {
        dispatch(editContractError(response.status + ' Error'))
      }
      return response.json()
    }).then(json => {
      dispatch(editContract(json))
      dispatch(editContractSuccess(true))
    })
      .catch(function (error) {
        dispatch(editContractError('Error: ' + error))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [FETCH_CONTRACTS]: (state, action) => {
    return Object.assign({}, state, action.payload)
  },
  [FETCH_CONTRACTS_SUCCESS]: (state, action) => {
    return Object.assign({}, state, action.payload)
  },
  [FETCH_CONTRACTS_ERROR]: (state, action) => {
    return Object.assign({}, state, action.payload)
  },
  [EDIT_CONTRACT]: (state, action) => {
    return {
      ...state,
      contracts: updateObjectInArray(state.contracts, action.payload.contract, 'id')
    }
  },
  [EDIT_CONTRACT_ERROR]: (state, action) => {
    return Object.assign({}, state, action.payload)
  },
  [EDIT_CONTRACT_SUCCESS]: (state, action) => {
    return Object.assign({}, state, action.payload)
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = []
export default function _Reducer (state = initialState, action) {
  // console.log('users', state, action)
  const handler = ACTION_HANDLERS[action.type]
  const res = handler ? handler(state, action) : state
  return res
}
