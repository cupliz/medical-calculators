export const updateState = (state, item, id) => {
  return {
    ...state,
    [item[id]]: item
  }
}
