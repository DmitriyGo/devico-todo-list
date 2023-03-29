import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  total: 0,
  active: 0,
  completed: 0,
  isLoading: false,
  error: null,
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    fetchTodosSuccess: (state, action) => {
      const items = [...state.items, ...action.payload.items]
      return { ...state, ...action.payload, items }
    },
    addTodoSuccess: (state, action) => {
      state.total += 1
      state.active += 1

      state.items.unshift(action.payload)
    },
    updateTodoSuccess: (state, action) => {
      const index = state.items.findIndex((todo) => todo._id === action.payload.item._id)

      state.completed = action.payload.completed
      state.active = action.payload.active
      state.total = action.payload.total

      state.items[index] = action.payload.item
    },
    removeTodoSuccess: (state, action) => {
      state.items = state.items.filter((todo) => todo._id !== action.payload._id)
    },
    clearCompletedSuccess: (state) => {
      state.items = state.items.filter((todo) => !todo.completed)

      state.total -= state.completed
      state.completed = 0
    },
  },
})

export const {
  fetchTodosSuccess,
  addTodoSuccess,
  updateTodoSuccess,
  removeTodoSuccess,
  clearCompletedSuccess,
  setIsLoading,
  setError,
} = todoSlice.actions

export default todoSlice.reducer
