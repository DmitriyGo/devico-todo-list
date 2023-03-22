import { v4 } from 'uuid'
import {
  addTodoRequest,
  addTodoFailure,
  addTodoSuccess,
  clearCompletedTodosRequest,
  clearCompletedTodosFailure,
  clearCompletedTodosSuccess,
  deleteTodoRequest,
  deleteTodoFailure,
  deleteTodoSuccess,
  fetchTodosRequest,
  fetchTodosFailure,
  fetchTodosSuccess,
  updateTodoRequest,
  updateTodoFailure,
  updateTodoSuccess,
} from './actions'

export const fetchTodos = () => {
  return async (dispatch) => {
    dispatch(fetchTodosRequest())
    try {
      const todos = JSON.parse(localStorage.getItem('todos'))

      if (!todos) {
        localStorage.setItem('todos', JSON.stringify([]))
      }

      dispatch(fetchTodosSuccess(todos || []))
    } catch (error) {
      dispatch(fetchTodosFailure(error))
    }
  }
}

export const addTodo = (todo) => {
  return async (dispatch) => {
    dispatch(addTodoRequest())
    try {
      todo._id = v4()
      const todos = JSON.parse(localStorage.getItem('todos')) || []
      const newTodos = JSON.stringify([...todos, todo])

      localStorage.setItem('todos', newTodos)

      dispatch(addTodoSuccess(todo))
    } catch (error) {
      dispatch(addTodoFailure(error))
    }
  }
}

export const updateTodo = (todo) => {
  return async (dispatch) => {
    dispatch(updateTodoRequest())
    try {
      const todos = JSON.parse(localStorage.getItem('todos')) || []
      const newTodos = JSON.stringify(todos.map((t) => (t._id === todo._id ? todo : t)))

      localStorage.setItem('todos', newTodos)

      dispatch(updateTodoSuccess(todo))
    } catch (error) {
      dispatch(updateTodoFailure(error))
    }
  }
}

export const removeTodo = (todo) => {
  return async (dispatch) => {
    dispatch(deleteTodoRequest())
    try {
      const todos = JSON.parse(localStorage.getItem('todos')) || []
      const newTodos = JSON.stringify(todos.filter((t) => t._id !== todo._id))

      localStorage.setItem('todos', newTodos)

      dispatch(deleteTodoSuccess(todo))
    } catch (error) {
      dispatch(deleteTodoFailure(error))
    }
  }
}

export const clearCompleted = () => {
  return async (dispatch) => {
    dispatch(clearCompletedTodosRequest())
    try {
      const todos = JSON.parse(localStorage.getItem('todos')) || []
      const newTodos = JSON.stringify(todos.filter((t) => !t.completed))

      localStorage.setItem('todos', newTodos)

      dispatch(clearCompletedTodosSuccess())
    } catch (error) {
      dispatch(clearCompletedTodosFailure(error))
    }
  }
}
