export const deleteProperty = (state, id) => {
  let newState = Object.assign({}, state)
  delete newState[id]
  return newState
}

export const createCalculateObject = (array, action, fieldName, calculateObject) => {
  return array.map(item => {
    if (item[fieldName] !== action.payload[fieldName]) {
      // This isn't the item we care about - keep it as-is
      return item
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      calculate: calculateObject
    }
  })
}

export const createCalculateArray = (array, action, fieldName) => {
  return array.map(item => {
    if (item[fieldName] !== action.payload[fieldName]) {
      // This isn't the item we care about - keep it as-is
      return item
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      calculate: createUpdateAddCalculate(item.calculate, action)
    }
  })
}

export const createUpdateAddCalculate = (calculateArray, action) => {
  if (!calculateArray) {
    // we don't have an array, create with one object
    return [
      {
        answer: action.payload.answer,
        points: action.payload.pointsChange
      }
    ]
    // array exists
    // if array has the answer - we update that answer and return new array with updated answer
  } else if (
    calculateArray.filter(item => item.answer === action.payload.answer)
      .length > 0
  ) {
    return calculateArray.map(item => {
      if (item.answer === action.payload.answer) {
        // this is the item we care about, so update it
        return {
          answer: action.payload.answer,
          points: action.payload.pointsChange
        }
      } else {
        // this is not the item we care about so we return it
        return item
      }
    })
  } else {
    // if array doesn't have the answer - we copy arrays contentes, add new question it and return new array
    return [
      ...calculateArray,
      {
        answer: action.payload.answer,
        points: action.payload.pointsChange
      }
    ]
  }
}
