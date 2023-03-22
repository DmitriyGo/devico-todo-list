import reducer from './reducer'
import { initialState } from './reducer'

class Store {
  constructor(reducer, middleware) {
    this.state = initialState
    this.reducer = reducer
    this.middleware = middleware
    this.listeners = []
  }

  getState() {
    return this.state
  }

  dispatch = (action) => {
    this.middleware(this)(this._dispatch)(action)
  }

  _dispatch = (action) => {
    this.state = this.reducer(this.state, action)
    for (const listener of this.listeners) {
      listener(this.state)
    }
  }

  subscribe(listener) {
    this.listeners.push(listener)
  }

  unsubscribe(listener) {
    const index = this.listeners.indexOf(listener)
    if (index !== -1) {
      this.listeners.splice(index, 1)
    }
  }
}

function asyncMiddleware(store) {
  return function (next) {
    return async function (action) {
      if (typeof action === 'function') {
        return action(store.dispatch, store.getState)
      }
      return next(action)
    }
  }
}

export const store = new Store(reducer, asyncMiddleware)
