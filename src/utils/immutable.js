export const updateState = (state, item, id) => {
  return {
    ...state,
    [item[id]]: item
  }
}

export const deleteProperty = (state, id) => {
  let newState = Object.assign({}, state)
  delete newState[id]
  return newState
}
