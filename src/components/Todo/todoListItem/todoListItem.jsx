import React from 'react'
import { connect } from 'react-redux'

import { removeTodo, updateTodo } from '@/store/todo/actions'
import './todoListItemStyles.scss'

class TodoListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: this.props.todo.name,
    }
  }

  handleInputKeyUp = (e) => {
    if (e.key === 'Enter') {
      const updatedTodo = { ...this.props.todo, name: this.state.inputValue }
      this.props.updateTodo(updatedTodo)
      this.props.onSelect(null)
    }
  }

  handleInputBlur = () => {
    const updatedTodo = { ...this.props.todo, name: this.state.inputValue }
    this.props.updateTodo(updatedTodo)
    this.props.onSelect(null)
  }

  handleItemClick = (e) => {
    e.stopPropagation()
    const updatedTodo = { ...this.props.todo, completed: !this.props.todo.completed }
    this.props.updateTodo(updatedTodo)
  }

  handleEditButtonClick = (e) => {
    e.stopPropagation()
    if (this.props.selectedTodo === this.props.todo) {
      this.props.updateTodo({ ...this.props.todo, name: this.state.inputValue })
      this.props.onSelect(null)
    } else if (!this.props.selectedTodo) {
      this.props.onSelect(this.props.todo)
    } else {
      this.props.onSelect(null)
    }
  }

  handleRemoveButtonClick = (e) => {
    e.stopPropagation()
    this.props.removeTodo(this.props.todo)
  }

  render() {
    const { todo } = this.props
    const { inputValue } = this.state
    const todoTodoTextClasses = `todo-app__item-text ${
      todo.completed ? 'todo-app__item-completed' : ''
    }`

    return (
      <li className="todo-app__item" onClick={(e) => this.handleItemClick(e)}>
        <input
          className="todo-app__item-checkbox"
          type="checkbox"
          checked={this.props.todo.completed}
          readOnly
        />
        {this.props.selectedTodo === this.props.todo ? (
          <input
            className="todo-app__item-change__input"
            value={inputValue}
            onClick={(e) => e.stopPropagation()}
            onInput={(e) => this.setState({ inputValue: e.target.value })}
            onKeyUp={(e) => this.handleInputKeyUp(e)}
            onBlur={(e) => this.handleInputBlur(e)}
            autoFocus
          />
        ) : (
          <span className={todoTodoTextClasses}>{this.state.inputValue}</span>
        )}
        <span
          className="todo-app__item-edit"
          onClick={(e) => this.handleEditButtonClick(e)}
          dangerouslySetInnerHTML={{
            __html: this.props.selectedTodo === this.props.todo ? '&#x2714;' : '&#x270E;',
          }}
        />
        <span
          className="todo-app__item-remove"
          onClick={(e) => this.handleRemoveButtonClick(e)}
          dangerouslySetInnerHTML={{ __html: '&#x2716;' }}
        />
      </li>
    )
  }
}

const mapDispatchToProps = {
  removeTodo,
  updateTodo,
}

export default connect(null, mapDispatchToProps)(TodoListItem)
