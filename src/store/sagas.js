import { v4 } from 'uuid'
import EventEmitter from '../helpers/event-emitter'
import { addTodo, clearCompleted, deleteTodo, fetchTodos, updateTodo } from './actions'

const initialState = { items: [], loading: false, error: null }

class Sagas extends EventEmitter {
  constructor() {
    super()
    this.state = initialState

    this._subscribeRequests()
  }

  dispatch({ type, payload }) {
    this.emit(type, payload)
  }

  onFetchTodos() {
    try {
      const todos = JSON.parse(localStorage.getItem('todos'))
      if (!todos) {
        localStorage.setItem('todos', JSON.stringify([]))
      }

      this.dispatch(fetchTodos.success(todos || []))
    } catch (error) {
      this.dispatch(fetchTodos.failure(error))
    }
  }

  onAddTodo(todo) {
    try {
      todo._id = v4()
      const todos = JSON.parse(localStorage.getItem('todos')) || []
      const newTodos = JSON.stringify([...todos, todo])

      localStorage.setItem('todos', newTodos)

      this.dispatch(addTodo.success(todo))
    } catch (error) {
      this.dispatch(addTodo.failure(error))
    }
  }

  onUpdateTodo(todo) {
    try {
      const todos = JSON.parse(localStorage.getItem('todos')) || []
      const newTodos = JSON.stringify(todos.map((t) => (t._id === todo._id ? todo : t)))

      localStorage.setItem('todos', newTodos)

      this.dispatch(updateTodo.success(todo))
    } catch (error) {
      this.dispatch(updateTodo.failure(error))
    }
  }

  onDeleteTodo(todo) {
    try {
      const todos = JSON.parse(localStorage.getItem('todos')) || []
      const newTodos = JSON.stringify(todos.filter((t) => t._id !== todo._id))

      localStorage.setItem('todos', newTodos)

      this.dispatch(deleteTodo.success(todo))
    } catch (error) {
      this.dispatch(deleteTodo.failure(error))
    }
  }

  onClearCompletedTodos() {
    try {
      const todos = JSON.parse(localStorage.getItem('todos')) || []
      const newTodos = JSON.stringify(todos.filter((t) => !t.completed))

      localStorage.setItem('todos', newTodos)

      this.dispatch(clearCompleted.success())
    } catch (error) {
      this.dispatch(clearCompleted.failure(error))
    }
  }

  _setLoading(action) {
    this.state = { ...this.state, loading: true, error: null }
    action()
  }

  _subscribeRequests() {
    this.on(fetchTodos.request().type, () => this._setLoading(() => this.onFetchTodos()))
    this.on(addTodo.request().type, (e) => this._setLoading(() => this.onAddTodo(e)))
    this.on(updateTodo.request().type, (e) => this._setLoading(() => this.onUpdateTodo(e)))
    this.on(deleteTodo.request().type, (e) => this._setLoading(() => this.onDeleteTodo(e)))
    this.on(clearCompleted.request().type, () =>
      this._setLoading(() => this.onClearCompletedTodos()),
    )
  }
}

export default Sagas
