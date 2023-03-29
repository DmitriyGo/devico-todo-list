import { Component } from 'react'
import { connect } from 'react-redux'

import { clearCompleted } from '@/store/todo/actions'
import './todoFooter.scss'

class TodoFooter extends Component {
  handleClearButtonClick(e) {
    e.preventDefault()
    this.props.clearCompleted()
  }

  render() {
    return (
      <div className="todo-app__footer">
        <div>Total: {this.props.total}</div>
        <div>Active: {this.props.active}</div>
        <div>Completed: {this.props.completed}</div>
        <button className="todo-app__button-clear" onClick={(e) => this.handleClearButtonClick(e)}>
          Clear completed
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    total: state.todo.total,
    completed: state.todo.completed,
    active: state.todo.active,
  }
}

export default connect(mapStateToProps, { clearCompleted })(TodoFooter)
