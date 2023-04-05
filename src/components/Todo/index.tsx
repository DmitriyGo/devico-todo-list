import './TodoStyles'

import TodoForm from './TodoForm/TodoForm'
import TodoList from './TodoList/TodoList'
import { StyledTodoApp } from './TodoStyles'

const TodoApp = () => {
  return (
    <StyledTodoApp>
      <TodoForm />
      <TodoList />
    </StyledTodoApp>
  )
}

export default TodoApp
