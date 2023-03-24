import TodoForm from '../todo-form/todo-form'
import TodoList from '../todo-list/todo-list'
import TodoFooter from '../todo-footer/todo-footer'
import createElement from '../../helpers/createElement'

class App {
  render() {
    this.app = createElement('div', 'todo-app')

    const todoForm = new TodoForm()
    const todoList = new TodoList()
    const todoFooter = new TodoFooter()

    this.app.append(todoForm.render())
    this.app.append(todoList.render())
    this.app.append(todoFooter.render())

    return this.app
  }
}

export default App
