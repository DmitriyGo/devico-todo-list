import './styles'

import { useEffect } from 'react'

import { StyledTodoApp, StyledTodoTitle } from './styles'
import TodoForm from './TodoForm/TodoForm'
import TodoList from './TodoList/TodoList'

import { useAppDispatch } from '@/store/hooks'
import { resetState } from '@/store/todo'

const TodoPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(resetState())
    }
  }, [])

  return (
    <StyledTodoApp>
      <StyledTodoTitle>TODO LIST</StyledTodoTitle>
      <TodoForm />
      <TodoList />
    </StyledTodoApp>
  )
}

export default TodoPage
