import { combineReducers } from 'redux'
import { todosConstants, visibilityFilterConstants } from '../constants'

const createList = (filter) => {
  const handleToggle = (state, action) => {
    const { result: toggledId, entities } = action.response
    const { completed } = entities.todos[toggledId]
    const shouldRemove = (
      (completed && filter === visibilityFilterConstants.SHOW_ACTIVE) ||
      (!completed && filter === visibilityFilterConstants.SHOW_COMPLETED)
    )

    return shouldRemove ?
      state.filter(id => id !== toggledId) :
      state
  }

  const ids = (state = [], action) => {
    switch(action.type) {
      case todosConstants.FETCH_SUCCESS:
        return action.filter === filter ?
          action.response.result :
          state
      case todosConstants.CREATE_SUCCESS:
        return filter !== visibilityFilterConstants.SHOW_COMPLETED ?
          [...state, action.response.result] :
          state
      case todosConstants.TOGGLE_SUCCESS:
        return handleToggle(state, action)
      default:
        return state
    }
  }

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state
    }

    switch (action.type) {
      case todosConstants.FETCH_REQUEST:
        return true
      case todosConstants.FETCH_SUCCESS:
        return false
      case todosConstants.FETCH_ERROR:
        return false
      default:
        return state
    }
  }

  const errorMessage = (state = null, action) => {
    if (action.filter !== filter) {
      return state
    }

    switch (action.type) {
      case todosConstants.FETCH_ERROR:
        return action.message
      case todosConstants.FETCH_REQUEST:
      case todosConstants.FETCH_SUCCESS:
        return null
      default:
        return state
    }
  }

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  })
}

export default createList

export const getIds = (state) => state.ids
export const getIsFetching = (state) => state.isFetching
export const getErrorMessage = (state) => state.errorMessage
