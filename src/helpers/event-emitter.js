class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(callback)
  }

  emit(eventName, ...args) {
    const callbacks = this.events[eventName]
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback(...args)
      })
    }
  }

  off(eventName, callback) {
    const callbacks = this.events[eventName]
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index !== -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  removeAllListeners(eventName) {
    delete this.events[eventName]
  }
}

export default EventEmitter
