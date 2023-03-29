import { Component } from 'react'
import { connect } from 'react-redux'

import { addTodo } from '@/store/todo/actions'
import './todoForm.scss'

class TodoForm extends Component {
  state = {
    input: '',
  }

  handleInputChange(e) {
    this.setState({
      input: e.target.value,
    })
  }

  handleFormSubmit(e) {
    e.preventDefault()
    if (this.state.input.trim().length) {
      this.props.addTodo(this.state.input)
      this.setState({ input: '' })
    }
  }

  render() {
    return (
      <div className="todo-form__wrapper">
        <h1 className="todo-form__title">TODO LIST</h1>
        <form className="todo-form__form" onSubmit={(e) => this.handleFormSubmit(e)}>
          <input
            className="todo-form__input"
            placeholder="Add new todo..."
            value={this.state.input}
            onChange={(e) => this.handleInputChange(e)}
          />
          <button className="todo-form__button" type="submit">
            SUBMIT
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  addTodo,
}

export default connect(null, mapDispatchToProps)(TodoForm)
