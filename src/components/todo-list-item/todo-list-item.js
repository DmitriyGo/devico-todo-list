import { store, removeTodo, updateTodo } from '../../store'
import createElement from '../../helpers/create-element'
import './todo-list-item.scss'

class TodoListItem {
  constructor(item, itemIsSelected, setSelectedItem) {
    this.todoItem = createElement('li', 'todo-app__item')

    this.item = item
    this.itemIsSelected = itemIsSelected
    this.setSelectedItem = setSelectedItem
    this.inputValue = item.name

    this._todoStore = store

    this.handleInputKeyUp = this.handleInputKeyUp.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this)
    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this)
  }

  handleInputKeyUp = (e) => {
    if (e.key === 'Enter') {
      this.item.name = this.inputValue
      this.setSelectedItem(null)
      this._todoStore.dispatch(updateTodo(this.item))
    }
  }

  handleInputBlur = () => {
    this.item.name = this.inputValue
    this.setSelectedItem(null)
    this._todoStore.dispatch(updateTodo(this.item))
  }

  handleItemClick = (e) => {
    e.stopPropagation()
    this.item.completed = !this.item.completed
    this._todoStore.dispatch(updateTodo(this.item))
  }

  handleEditButtonClick = (e) => {
    e.stopPropagation()
    if (this.itemIsSelected) {
      this.setSelectedItem(null)
    } else {
      this.setSelectedItem(!this.itemIsSelected ? this.item : null)
    }
    this._todoStore.dispatch(updateTodo(this.item))
  }

  handleRemoveButtonClick = (e) => {
    e.stopPropagation()
    this._todoStore.dispatch(removeTodo(this.item))
  }

  render() {
    this.todoItem.addEventListener('click', this.handleItemClick)

    this.todoItemText = createElement(
      'span',
      `todo-app__item-text ${this.item.completed ? 'todo-app__item-completed' : ''}`,
    )
    this.todoItemText.textContent = this.item.name

    this.checkbox = createElement('input', 'todo-app__item-checkbox')
    this.checkbox.type = 'checkbox'
    this.checkbox.checked = this.item.completed

    this.todoItemInput = createElement('input', 'todo-app__item-change__input')
    this.todoItemInput.value = this.item.name
    this.todoItemInput.addEventListener('click', (e) => e.stopPropagation())
    this.todoItemInput.addEventListener('input', (e) => (this.inputValue = e.target.value))
    this.todoItemInput.addEventListener('keyup', this.handleInputKeyUp)
    this.todoItemInput.addEventListener('blur', this.handleInputBlur)

    this.editButton = createElement('span', 'todo-app__item-edit')
    this.editButton.addEventListener('click', this.handleEditButtonClick)
    this.editButton.innerHTML = !this.itemIsSelected ? '&#x270E;' : '&#x2714;'

    this.removeButton = createElement('span', 'todo-app__item-remove')
    this.removeButton.addEventListener('click', this.handleRemoveButtonClick)
    this.removeButton.innerHTML = '&#x2716;'

    this.todoItem.append(this.checkbox)
    this.todoItem.append(this.itemIsSelected ? this.todoItemInput : this.todoItemText)
    this.todoItem.append(this.editButton)
    this.todoItem.append(this.removeButton)

    return this.todoItem
  }
}

export default TodoListItem
