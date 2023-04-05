import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

export interface Todo {
  _id: string
  name: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export interface TodoState {
  items: Todo[]
  total: number
  active: number
  completed: number
  totalPages: number
  currentPage: number
  isLoading: boolean
  error: Error | string | null
}

const initialState: TodoState = {
  items: [],
  total: 0,
  active: 0,
  completed: 0,
  totalPages: 0,
  currentPage: 0,
  isLoading: false,
  error: null,
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<Error | string>) => {
      state.error = action.payload
    },
    setTodos: (state, action: PayloadAction<TodoState>) => {
      return action.payload
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.total += 1
      state.active += 1

      state.items.unshift(action.payload)
    },
    updateTodo: (
      state,
      action: PayloadAction<{
        item: Todo
        active: number
        completed: number
        total: number
      }>,
    ) => {
      const index = state.items.findIndex(
        (todo) => todo._id === action.payload.item._id,
      )

      state.completed = action.payload.completed
      state.active = action.payload.active
      state.total = action.payload.total

      state.items[index] = action.payload.item
    },
    removeTodo: (state, action: PayloadAction<string | string[]>) => {
      state.items = state.items.filter((todo) => {
        if (typeof action.payload === 'string') {
          return todo._id !== action.payload
        } else {
          return !action.payload.includes(todo._id)
        }
      })
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((todo) => !todo.completed)

      state.total -= state.completed
      state.completed = 0
    },
  },
})

export const {
  setLoading,
  setError,
  setTodos,
  addTodo,
  updateTodo,
  removeTodo,
  clearCompleted,
} = todoSlice.actions

export default todoSlice.reducer
