import { store, clearCompleted } from '../../store'
import createElement from '../../helpers/create-element'
import './todo-footer.scss'

class TodoFooter {
  constructor() {
    this.todoItemsFooter = createElement('div', 'todo-app__footer')

    this._todoStore = store
    this._todoStore.subscribe(() => this.render())

    this.handleClearButtonClick = this.handleClearButtonClick.bind(this)
  }

  get activeTodosCount() {
    return this._todoStore.getState()?.items?.filter((i) => !i.completed).length
  }

  get completedTodosCount() {
    return this._todoStore.getState()?.items?.filter((i) => i.completed).length
  }

  handleClearButtonClick(e) {
    e.preventDefault()
    this._todoStore.dispatch(clearCompleted())
  }

  render() {
    this.todoItemsFooter.innerHTML = ''

    this.activeTodosCounter = createElement('div')
    this.activeTodosCounter.textContent = `Active: ${this.activeTodosCount}`

    this.completedTodosCounter = createElement('div')
    this.completedTodosCounter.textContent = `Completed: ${this.completedTodosCount}`

    this.clearButton = createElement('button', 'todo-app__button-clear')
    this.clearButton.textContent = 'Clear completed'
    this.clearButton.addEventListener('click', this.handleClearButtonClick)

    this.todoItemsFooter.append(this.activeTodosCounter)
    this.todoItemsFooter.append(this.completedTodosCounter)
    this.todoItemsFooter.append(this.clearButton)

    return this.todoItemsFooter
  }
}

export default TodoFooter
