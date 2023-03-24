export const getTodoEndpoints = () => {
  return {
    getAllTodos: () => `/todos`,
    createTodo: () => `/todos`,
    updateTodo: (id) => `/todos/${id}`,
    deleteTodo: (id) => `/todos/${id}`,
    clearCompleted: () => `/todos/clear-completed`,
  }
}
