import { isFunction } from "lodash"

export const makeReducer = (actionHandlers: any = {}, initialState: any = {}) => (state: any = initialState, action: any = {}) => {
  if (isFunction(actionHandlers[action.type])) {
    return actionHandlers[action.type](state, action)
  }
  return state
}

// export const reduceSetFull = (state, action) => action.payload
//
// export const reducePushPayload = (state, action) => ([...state, action.payload])
//
// export const reduceSetKey = (key) => (state, action) => ({
//   ...state,
//   [key]: action.payload,
// })
//
// export const updateInArray = (arr, index, update) => [
//   ...arr.slice(0, index),
//   { ...arr[index], ...(_.isFunction(update) ? update(arr[index]) : update) },
//   ...arr.slice(index + 1)
// ]
//
// export const updateInArrayWhere = (arr, predicate, update) => {
//   const index = _.findIndex(arr, predicate)
//   return updateInArray(arr, index, update)
// }
//
// export const reduceUpdateInArrayById = (state, itemId, update = {}) => updateInArrayWhere(state, { id: itemId }, update)
//
// export const replaceInArray = (arr, index, newItem) => _.map(arr, (o, i) => (i === index ? newItem : o))
//
// export const removeIndex = (arr, index) => [
//   ...arr.slice(0, index),
//   ...arr.slice(index + 1)
// ]
