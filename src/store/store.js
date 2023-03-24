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
    const newItems = [...this.state.items, payload]
    this.state = {
      ...this.state,
      items: newItems,
      loading: false,
      active: newItems.filter((i) => !i.completed).length,
      total: newItems.length,
    }

    this.emit('update')
  }

  updateTodo(payload) {
    this.state = {
      ...this.state,
      items: this.state.items.map((todo) => (todo._id === payload._id ? payload : todo)),
      loading: false,
      active: this.state.items.filter((i) => !i.completed).length,
      completed: this.state.items.filter((i) => i.completed).length,
    }

    this.emit('update')
  }

  deleteTodo(payload) {
    const newItems = this.state.items.filter((todo) => todo._id !== payload._id)
    this.state = {
      ...this.state,
      items: newItems,
      loading: false,
      total: newItems.length,
      active: newItems.filter((i) => !i.completed).length,
      completed: newItems.filter((i) => i.completed).length,
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
