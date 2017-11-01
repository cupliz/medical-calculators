export const deleteProperty = (state, id) => {
  let newState = Object.assign({}, state)
  delete newState[id]
  return newState
}
