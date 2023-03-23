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
    this.state = { ...this.state, items: payload, loading: false }

    this.emit('update')
  }

  addTodo(payload) {
    this.state = { ...this.state, items: [...this.state.items, payload], loading: false }

    this.emit('update')
  }

  updateTodo(payload) {
    this.state = {
      ...this.state,
      items: this.state.items.map((todo) => (todo._id === payload._id ? payload : todo)),
      loading: false,
    }

    this.emit('update')
  }

  deleteTodo(payload) {
    this.state = {
      ...this.state,
      items: this.state.items.filter((todo) => todo._id !== payload._id),
      loading: false,
    }

    this.emit('update')
  }

  clearCompletedTodos() {
    this.state = {
      ...this.state,
      items: this.state.items.filter((todo) => !todo.completed),
      loading: false,
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
