import './styles'

import { StyledTodoApp, StyledTodoTitle } from './styles'
import TodoForm from './TodoForm/TodoForm'
import TodoList from './TodoList/TodoList'

const TodoPage = () => {
  return (
    <StyledTodoApp>
      <StyledTodoTitle>TODO LIST</StyledTodoTitle>
      <TodoForm />
      <TodoList />
    </StyledTodoApp>
  )
}

export default TodoPage
