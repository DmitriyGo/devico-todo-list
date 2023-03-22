import { ActionType } from './action-types'

export const fetchTodosRequest = () => ({ type: ActionType.FETCH_TODOS_REQUEST })
export const fetchTodosSuccess = (todos) => ({
  type: ActionType.FETCH_TODOS_SUCCESS,
  payload: todos,
})
export const fetchTodosFailure = (error) => ({
  type: ActionType.FETCH_TODOS_FAILURE,
  payload: error,
})

export const addTodoRequest = () => ({ type: ActionType.ADD_TODO_REQUEST })
export const addTodoSuccess = (todo) => ({ type: ActionType.ADD_TODO_SUCCESS, payload: todo })
export const addTodoFailure = (error) => ({ type: ActionType.ADD_TODO_FAILURE, payload: error })

export const updateTodoRequest = () => ({ type: ActionType.UPDATE_TODO_REQUEST })
export const updateTodoSuccess = (todo) => ({ type: ActionType.UPDATE_TODO_SUCCESS, payload: todo })
export const updateTodoFailure = (error) => ({
  type: ActionType.UPDATE_TODO_FAILURE,
  payload: error,
})

export const deleteTodoRequest = () => ({ type: ActionType.DELETE_TODO_REQUEST })
export const deleteTodoSuccess = (todo) => ({ type: ActionType.DELETE_TODO_SUCCESS, payload: todo })
export const deleteTodoFailure = (error) => ({
  type: ActionType.DELETE_TODO_FAILURE,
  payload: error,
})

export const clearCompletedTodosRequest = () => ({ type: ActionType.CLEAR_COMPLETED_TODOS_REQUEST })
export const clearCompletedTodosSuccess = () => ({
  type: ActionType.CLEAR_COMPLETED_TODOS_SUCCESS,
})
export const clearCompletedTodosFailure = (error) => ({
  type: ActionType.CLEAR_COMPLETED_TODOS_FAILURE,
  payload: error,
})
