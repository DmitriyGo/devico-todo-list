import { GridSortModel } from '@mui/x-data-grid'

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
  paginationModel: {
    page: number
    pageSize: number
  }
  sorting: GridSortModel
  isLoading: boolean
  error: Error | string | null
}
