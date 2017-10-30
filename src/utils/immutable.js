export const updateState = (state, item, value) => {
  return {
    ...state,
    [item]: value
  }
}

export const deleteProperty = (state, id) => {
  let newState = Object.assign({}, state)
  delete newState[id]
  return newState
}
