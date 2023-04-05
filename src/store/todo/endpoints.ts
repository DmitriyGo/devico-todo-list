const API_URL = 'todos'

export const todoEndpoints = {
  getAllTodos: () => `/${API_URL}`,
  createTodo: () => `/${API_URL}/create`,
  updateTodo: (id: string) => `/${API_URL}/${id}`,
  deleteTodo: () => `/${API_URL}/delete`,
  clearCompleted: () => `/${API_URL}/clear-completed`,
}
