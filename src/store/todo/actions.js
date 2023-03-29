export const fetchTodos = (payload) => {
  return {
    type: 'FETCH_TODOS',
    payload,
  }
}

export const addTodo = (payload) => {
  return {
    type: 'ADD_TODO',
    payload,
  }
}

export const updateTodo = (payload) => {
  return {
    type: 'UPDATE_TODO',
    payload,
  }
}

export const removeTodo = (payload) => {
  return {
    type: 'REMOVE_TODO',
    payload,
  }
}

export const clearCompleted = (payload) => {
  return {
    type: 'CLEAR_COMPLETED',
    payload,
  }
}
