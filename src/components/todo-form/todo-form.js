import TodoItem from '../../helpers/todo-item'
import createElement from '../../helpers/createElement'
import { store, addTodo } from '../../store'
import './todo-form.scss'

class TodoForm {
  constructor() {
    this.todoFormWrapper = createElement('div', 'todo-form__wrapper')
    this.todoFormInput = createElement('input', 'todo-form__input')

    this._todoStore = store
    this._todoStore.subscribe(() => this.update())

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)

    this.inputValue = ''
  }

  handleInput(e) {
    this.inputValue = e.target.value
  }

  handleFormSubmit(e) {
    e.preventDefault()
    if (this.inputValue.trim().length) {
      const value = this.inputValue

      this.inputValue = ''

      this._todoStore.dispatch(addTodo.request(new TodoItem(value)))
    }
  }

  update() {
    this.todoFormInput.value = this.inputValue
  }

  render() {
    this.todoFormWrapper.innerHTML = ''

    this.todoFormTitle = createElement('h1', 'todo-form__title')
    this.todoFormTitle.textContent = 'TODO LIST'

    this.todoForm = createElement('form', 'todo-form__form')
    this.todoForm.addEventListener('submit', this.handleFormSubmit)

    this.todoFormInput.placeholder = 'Add new todo...'
    this.todoFormInput.value = this.inputValue
    this.todoFormInput.addEventListener('input', this.handleInput)

    this.todoFormButton = createElement('button', 'todo-form__button')
    this.todoFormButton.type = 'submit'
    this.todoFormButton.textContent = 'SUBMIT'

    this.todoForm.append(this.todoFormInput)
    this.todoForm.append(this.todoFormButton)

    this.todoFormWrapper.append(this.todoFormTitle, this.todoForm)

    return this.todoFormWrapper
  }
}

export default TodoForm
