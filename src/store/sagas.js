import EventEmitter from '../helpers/event-emitter'
import { addTodo, clearCompleted, deleteTodo, fetchTodos, updateTodo } from './actions'
import httpClient from '../helpers/httpClient'
import { getTodoEndpoints } from '../helpers/getTodoEndpoints'

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
    this.todoEndpoints = getTodoEndpoints()

    this._subscribeRequests()
  }

  dispatch({ type, payload }) {
    this.emit(type, payload)
  }

  async onFetchTodos() {
    try {
      const { data } = await httpClient.get(this.todoEndpoints.getAllTodos())
      this.dispatch(fetchTodos.success(data || []))
    } catch (error) {
      this.dispatch(fetchTodos.failure(error))
    }
  }

  async onAddTodo(todo) {
    try {
      const { data } = await httpClient.post(this.todoEndpoints.createTodo(), todo)
      this.dispatch(addTodo.success(data))
    } catch (error) {
      this.dispatch(addTodo.failure(error))
    }
  }

  async onUpdateTodo(todo) {
    try {
      const { data } = await httpClient.put(this.todoEndpoints.updateTodo(todo._id), todo)
      this.dispatch(updateTodo.success(data))
    } catch (error) {
      this.dispatch(updateTodo.failure(error))
    }
  }

  async onDeleteTodo(todo) {
    try {
      const { data } = await httpClient.delete(this.todoEndpoints.deleteTodo(todo._id))
      this.dispatch(deleteTodo.success(data))
    } catch (error) {
      this.dispatch(deleteTodo.failure(error))
    }
  }

  async onClearCompletedTodos() {
    try {
      await httpClient.delete(this.todoEndpoints.clearCompleted())
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
    this.on(fetchTodos.request().type, () =>
      this._setLoading(async () => await this.onFetchTodos()),
    )
    this.on(addTodo.request().type, (e) => this._setLoading(async () => await this.onAddTodo(e)))
    this.on(updateTodo.request().type, (e) =>
      this._setLoading(async () => await this.onUpdateTodo(e)),
    )
    this.on(deleteTodo.request().type, (e) =>
      this._setLoading(async () => await this.onDeleteTodo(e)),
    )
    this.on(clearCompleted.request().type, () =>
      this._setLoading(async () => await this.onClearCompletedTodos()),
    )
  }
}

export default Sagas
