import { GridSortModel } from '@mui/x-data-grid'

const API_URL = 'todos'

export const todoEndpoints = {
  getAllTodos: () => `/${API_URL}`,
  createTodo: () => `/${API_URL}/create`,
  updateTodo: (id: string) => `/${API_URL}/${id}`,
  deleteTodo: () => `/${API_URL}/delete`,
  clearCompleted: () => `/${API_URL}/clear-completed`,
}

export interface FetchTodoResponse {
  data: TodoState
}

export interface CreateTodoResponse {
  data: Todo
}

export interface UpdateTodoResponse {
  data: {
    item: Todo
    completed: number
    active: number
    total: number
  }
}

export interface DeleteTodoResponse {
  data: Todo
}

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
  isOutdated: boolean
  isLoading: boolean
  error: Error | string | null
}
