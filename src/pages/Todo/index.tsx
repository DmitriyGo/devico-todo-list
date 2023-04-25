import './styles'

import { useEffect } from 'react'

import { StyledTodoApp, StyledTodoTitle } from './styles'
import TodoForm from './TodoForm/TodoForm'
import TodoList from './TodoList/TodoList'
import socket from '../../socket'

import { useAppDispatch } from '@/store/hooks'
import store from '@/store/store'
import { fetchTodos } from '@/store/todo'
import { resetState } from '@/store/todo/todoSlice'

const TodoPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    socket.auth = {
      token: store.getState().auth.accessToken || null,
    }
    socket.connect()
    dispatch(fetchTodos())

    return () => {
      dispatch(resetState())
      socket.disconnect()
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
