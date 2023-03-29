import { Component } from 'react'

import TodoFooter from './todoFooter/todoFooter'
import TodoForm from './todoForm/todoForm'
import TodoList from './todoList/todoList'

import './TodoStyles.scss'

class TodoApp extends Component {
  render() {
    return (
      <div className="todo-app">
        <TodoForm />
        <TodoList />
        <TodoFooter />
      </div>
    )
  }
}

export default TodoApp
