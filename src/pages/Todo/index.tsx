import './styles'

import { useEffect } from 'react'

import { StyledTodoApp, StyledTodoTitle } from './styles'
import TodoForm from './TodoForm/TodoForm'
import TodoList from './TodoList/TodoList'

import { useAppDispatch } from '@/store/hooks'
import { fetchTodos } from '@/store/todo'
import { resetState } from '@/store/todo/todoSlice'

const TodoPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodos())

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
