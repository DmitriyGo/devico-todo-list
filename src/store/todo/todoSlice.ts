import { GridSortModel } from '@mui/x-data-grid'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Todo, TodoState } from './types'

const initialState: TodoState = {
  items: [],
  total: 0,
  active: 0,
  completed: 0,
  totalPages: 0,
  currentPage: 0,
  paginationModel: {
    page: 0,
    pageSize: 8,
  },
  sorting: [{ field: 'createdAt', sort: 'desc' }],
  isOutdated: false,
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
    setOutdated: (state, action: PayloadAction<boolean>) => {
      state.isOutdated = action.payload
    },
    setPaginationModel: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>,
    ) => {
      state.paginationModel = action.payload
    },
    setSorting: (state, action: PayloadAction<GridSortModel>) => {
      state.sorting = action.payload
    },
    setTodos: (state, action: PayloadAction<TodoState>) => {
      return { ...state, ...action.payload }
    },
    editTodo: (
      state,
      action: PayloadAction<{
        item: Todo
        active: number
        completed: number
        total: number
      }>,
    ) => {
      state.items = state.items.map((i) =>
        i._id === action.payload.item._id ? action.payload.item : i,
      )
      state.active = action.payload.active
      state.completed = action.payload.completed
      state.total = action.payload.total
    },
    resetState: () => {
      return initialState
    },
  },
})

export const {
  setLoading,
  setError,
  setOutdated,
  setPaginationModel,
  setSorting,
  setTodos,
  resetState,
  editTodo,
} = todoSlice.actions

export default todoSlice.reducer
