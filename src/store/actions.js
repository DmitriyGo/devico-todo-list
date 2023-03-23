import { ActionType } from './action-types'

const createAsyncAction = (actionType) => ({
  request: (payload) => ({ type: `${actionType}_REQUEST`, payload }),
  success: (payload) => ({ type: `${actionType}_SUCCESS`, payload }),
  failure: (error) => ({ type: `${actionType}_FAILURE`, payload: error }),
})

export const fetchTodos = createAsyncAction(ActionType.FETCH_TODOS)
export const addTodo = createAsyncAction(ActionType.ADD_TODO)
export const updateTodo = createAsyncAction(ActionType.UPDATE_TODO)
export const deleteTodo = createAsyncAction(ActionType.DELETE_TODO)
export const clearCompleted = createAsyncAction(ActionType.CLEAR_COMPLETED)
