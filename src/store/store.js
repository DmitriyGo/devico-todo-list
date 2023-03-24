import Sagas from './sagas'
import { addTodo, clearCompleted, deleteTodo, fetchTodos, updateTodo } from './actions'

class Store extends Sagas {
  constructor() {
    super()
    this._subscribeReducers()
  }

  getState() {
    return this.state
  }

  dispatch({ type, payload }) {
    this.emit(type, payload)
  }

  subscribe(callback) {
    this.on('update', callback)
  }

  fetchTodos(payload) {
    this.state = { ...this.state, ...payload, loading: false }

    this.emit('update')
  }

  addTodo(payload) {
    this.state = {
      ...this.state,
      items: [...this.state.items, payload],
      loading: false,
      active: this.state.active + 1,
      total: this.state.total + 1,
    }

    this.emit('update')
  }

  updateTodo(payload) {
    let activeCount = this.state.active
    let completedCount = this.state.completed

    if (payload.completed) {
      activeCount -= 1
      completedCount += 1
    } else if (!payload.completed && activeCount !== this.state.items.length) {
      activeCount += 1
      completedCount -= 1
    }

    this.state = {
      ...this.state,
      items: this.state.items.map((todo) => (todo._id === payload._id ? payload : todo)),
      loading: false,
      active: activeCount,
      completed: completedCount,
    }

    this.emit('update')
  }

  deleteTodo(payload) {
    this.state = {
      ...this.state,
      items: this.state.items.filter((todo) => todo._id !== payload._id),
      loading: false,
      total: this.state.total - 1,
      active: this.state.active + (payload.completed ? 0 : -1),
      completed: this.state.completed + (payload.completed ? -1 : 0),
    }

    this.emit('update')
  }

  clearCompletedTodos() {
    const newItems = this.state.items.filter((todo) => !todo.completed)
    this.state = {
      ...this.state,
      items: newItems,
      loading: false,
      total: newItems.length,
      completed: 0,
    }

    this.emit('update')
  }

  _subscribeReducers() {
    this.on(fetchTodos.success().type, (e) => this.fetchTodos(e))
    this.on(addTodo.success().type, (e) => this.addTodo(e))
    this.on(updateTodo.success().type, (e) => this.updateTodo(e))
    this.on(deleteTodo.success().type, (e) => this.deleteTodo(e))
    this.on(clearCompleted.success().type, () => this.clearCompletedTodos())
  }
}

export const store = new Store()
