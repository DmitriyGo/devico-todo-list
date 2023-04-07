import './TodoStyles'

import TodoForm from './TodoForm/TodoForm'
import TodoList from './TodoList/TodoList'
import { StyledTodoApp, StyledTodoTitle } from './TodoStyles'

const TodoApp = () => {
  return (
    <StyledTodoApp>
      <StyledTodoTitle>TODO LIST</StyledTodoTitle>
      <TodoForm />
      <TodoList />
    </StyledTodoApp>
  )
}

export default TodoApp
