import './TodoFormStyles'
import { Box, Button, TextField, Typography } from '@mui/material'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'

import {
  LogoutBoxStyles,
  LogoutButtonStyles,
  StyledTodoForm,
  StyledTodoFormWrapper,
  TextFieldStyles,
  UserLoginStyles,
} from './TodoFormStyles'

import { logout } from '@/store/auth'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addTodo } from '@/store/todo'

const TodoForm = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const [value, setValue] = useState<string>('')

  const onFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (value.trim().length) {
        dispatch(addTodo(value))
        setValue('')
      }
    },
    [dispatch, value],
  )

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <StyledTodoFormWrapper>
      <Box sx={LogoutBoxStyles}>
        <Typography sx={UserLoginStyles}>{user?.login}</Typography>
        <Button sx={LogoutButtonStyles} onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <StyledTodoForm onSubmit={onFormSubmit}>
        <TextField
          sx={TextFieldStyles}
          variant="outlined"
          placeholder="Add new todo..."
          value={value}
          onChange={handleInputChange}
        />
        <Button variant="outlined" color="secondary" type="submit">
          SUBMIT
        </Button>
      </StyledTodoForm>
    </StyledTodoFormWrapper>
  )
}

export default TodoForm
