import './TodoFormStyles'
import { Box, Button, TextField } from '@mui/material'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'

import {
  LogoutBoxStyles,
  LogoutButtonStyles,
  StyledTodoForm,
  StyledTodoFormWrapper,
  TextFieldStyles,
} from './TodoFormStyles'

import { logout } from '@/store/auth/actions'
import { useAppDispatch } from '@/store/hooks'
import { addTodo } from '@/store/todo/actions'

const TodoForm = () => {
  const dispatch = useAppDispatch()

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
