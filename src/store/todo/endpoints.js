const API_URL = 'todos'

export const todoEndpoints = {
  getAllTodos: (page, pageSize) => `/${API_URL}?page=${page || 1}&pageSize=${pageSize || 10}`,
  createTodo: () => `/${API_URL}`,
  updateTodo: (id) => `/${API_URL}/${id}`,
  deleteTodo: (id) => `/${API_URL}/${id}`,
  clearCompleted: () => `/${API_URL}/clear-completed`,
}
