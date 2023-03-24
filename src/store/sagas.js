import EventEmitter from '../helpers/event-emitter'
import { addTodo, clearCompleted, deleteTodo, fetchTodos, updateTodo } from './actions'
import axios from 'axios'

const baseUrl = 'http://localhost:8000/todos'

const initialState = {
  items: [],
  total: 0,
  active: 0,
  completed: 0,
  loading: false,
  error: null,
}

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
    axios
      .get(baseUrl)
      .then(({ data }) => this.dispatch(fetchTodos.success(data || [])))
      .catch((error) => this.dispatch(fetchTodos.failure(error)))
  }

  onAddTodo(todo) {
    axios
      .post(baseUrl, todo)
      .then(({ data }) => this.dispatch(addTodo.success(data)))
      .catch((error) => this.dispatch(addTodo.failure(error)))
  }

  onUpdateTodo(todo) {
    axios
      .put(`${baseUrl}/${todo._id}`, todo)
      .then(({ data }) => this.dispatch(updateTodo.success(data)))
      .catch((error) => this.dispatch(updateTodo.failure(error)))
  }

  onDeleteTodo(todo) {
    axios
      .delete(`${baseUrl}/${todo._id}`)
      .then(({ data }) => this.dispatch(deleteTodo.success(data)))
      .catch((error) => this.dispatch(deleteTodo.failure(error)))
  }

  onClearCompletedTodos() {
    axios
      .post(`${baseUrl}/clearCompleted`)
      .then(() => this.dispatch(clearCompleted.success()))
      .catch((error) => this.dispatch(clearCompleted.failure(error)))
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
