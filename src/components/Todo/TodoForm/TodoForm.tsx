import './TodoFormStyles'
import { Button, TextField } from '@mui/material'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'

import {
  StyledTodoForm,
  StyledTodoFormWrapper,
  TextFieldStyles,
} from './TodoFormStyles'

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

  return (
    <StyledTodoFormWrapper>
      <StyledTodoForm onSubmit={onFormSubmit}>
        <TextField
          sx={TextFieldStyles}
          variant={'outlined'}
          placeholder="Add new todo..."
          value={value}
          onChange={handleInputChange}
        />
        <Button variant={'outlined'} color={'secondary'} type="submit">
          SUBMIT
        </Button>
      </StyledTodoForm>
    </StyledTodoFormWrapper>
  )
}

export default TodoForm
