import createElement from '../../helpers/create-element'
import { store, fetchTodos } from '../../store'
import TodoListItem from '../todo-list-item/todo-list-item'
import './todo-list.scss'

class TodoList {
  constructor() {
    this.todoItemsList = createElement('ul', 'todo-app__list')

    this._todoStore = store
    this._todoStore.subscribe(() => this.update())
    this._todoStore.dispatch(fetchTodos.request())

    this.setSelectedItem = this.setSelectedItem.bind(this)

    this.items = this._todoStore.getState().items || []
    this.selectedTodo = null
  }

  setSelectedItem = (item) => {
    this.selectedTodo = item
  }

  update() {
    this.items = this._todoStore.getState().items
    this.loading = this._todoStore.getState().loading

    this.render()
  }

  render() {
    this.todoItemsList.innerHTML = ''

    this.items.forEach((item) => {
      this.todoItemsList.append(
        new TodoListItem(item, item === this.selectedTodo, this.setSelectedItem).render(),
      )
    })

    return this.todoItemsList
  }
}

export default TodoList
