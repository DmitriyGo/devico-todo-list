import { GridSortModel } from '@mui/x-data-grid'

import { Todo } from './todoSlice'

export const TodoActionTypes = {
  fetchTodos: 'FETCH_TODOS',
  addTodo: 'ADD_TODO',
  updateTodo: 'UPDATE_TODO',
  removeTodo: 'REMOVE_TODO',
  clearCompleted: 'CLEAR_COMPLETED',
}

export const fetchTodos = (payload: {
  page: number
  pageSize: number
  sorting: GridSortModel
}) => {
  return {
    type: TodoActionTypes.fetchTodos,
    payload,
  }
}

export const addTodo = (payload: Partial<string>) => {
  return {
    type: TodoActionTypes.addTodo,
    payload: { name: payload, completed: false },
  }
}

export const updateTodo = (payload: Todo) => {
  return {
    type: TodoActionTypes.updateTodo,
    payload,
  }
}

export const removeTodo = (payload: string[] | string) => {
  return {
    type: TodoActionTypes.removeTodo,
    payload,
  }
}

export const clearCompleted = () => {
  return {
    type: TodoActionTypes.clearCompleted,
  }
}
