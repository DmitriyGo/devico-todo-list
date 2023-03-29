import { Component } from 'react'
import React from 'react'
import { connect } from 'react-redux'

import TodoListItem from '../todoListItem/todoListItem'

import { fetchTodos } from '@/store/todo/actions'

import './todoListStyles.scss'

class TodoList extends Component {
  state = {
    selectedTodo: null,
    page: 1,
    isLoading: this.props.isLoading,
  }

  observer = null

  rootRef = React.createRef()
  listEndRef = React.createRef()

  componentDidMount() {
    this.props.fetchTodos(this.state.page)
    this.observer = new IntersectionObserver(this.handleObserver.bind(this), {
      root: this.rootRef.current,
      threshold: 1.0,
      rootMargin: '30px',
    })
    this.observer.observe(this.listEndRef.current)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoading !== this.props.isLoading) {
      this.setState({ isLoading: this.props.isLoading })
    }
  }

  handleObserver(entries) {
    if (entries[0].isIntersecting && !this.state.isLoading) {
      this.setState({ page: this.state.page + 1 }, () => {
        this.props.fetchTodos(this.state.page)
      })
    }
  }

  handleSelectTodo(todo) {
    console.log(this)
    this.setState({
      selectedTodo: todo,
    })
  }

  render() {
    return (
      <ul ref={this.rootRef} className="todo-app__list">
        {this.props.todos?.map((todo) => (
          <TodoListItem
            key={todo._id}
            todo={todo}
            selectedTodo={this.state.selectedTodo}
            onSelect={(e) => this.handleSelectTodo(e)}
          />
        ))}
        <li ref={this.listEndRef}>{this.state.isLoading && <span>🔃 Loading...</span>}</li>
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return { todos: state.todo.items, isLoading: state.todo.isLoading }
}

const mapDispatchToProps = {
  fetchTodos,
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
