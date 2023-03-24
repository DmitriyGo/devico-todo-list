import { store, clearCompleted } from '../../store'
import createElement from '../../helpers/createElement'
import './todo-footer.scss'

class TodoFooter {
  constructor() {
    this.todoItemsFooter = createElement('div', 'todo-app__footer')

    this._todoStore = store
    this._todoStore.subscribe(() => this.render())

    this.handleClearButtonClick = this.handleClearButtonClick.bind(this)
  }

  handleClearButtonClick(e) {
    e.preventDefault()
    this._todoStore.dispatch(clearCompleted.request())
  }

  render() {
    this.todoItemsFooter.innerHTML = ''

    this.totalTodosCounter = createElement('div')
    this.totalTodosCounter.textContent = `Total: ${this._todoStore.state.total}`

    this.activeTodosCounter = createElement('div')
    this.activeTodosCounter.textContent = `Active: ${this._todoStore.state.active}`

    this.completedTodosCounter = createElement('div')
    this.completedTodosCounter.textContent = `Completed: ${this._todoStore.state.completed}`

    this.clearButton = createElement('button', 'todo-app__button-clear')
    this.clearButton.textContent = 'Clear completed'
    this.clearButton.addEventListener('click', this.handleClearButtonClick)

    this.todoItemsFooter.append(this.totalTodosCounter)
    this.todoItemsFooter.append(this.activeTodosCounter)
    this.todoItemsFooter.append(this.completedTodosCounter)
    this.todoItemsFooter.append(this.clearButton)

    return this.todoItemsFooter
  }
}

export default TodoFooter
