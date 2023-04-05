import './TodoFormStyles'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'

import {
  StyledTodoForm,
  StyledTodoFormButton,
  StyledTodoFormInput,
  StyledTodoFormTitle,
  StyledTodoFormWrapper,
} from './TodoFormStyles'

import { useAppDispatch } from '@/store/hooks'
import { addTodo } from '@/store/todo/actions'

const TodoForm = () => {
  const [value, setValue] = useState<string>('')
  const dispatch = useAppDispatch()

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
      <StyledTodoFormTitle>TODO LIST</StyledTodoFormTitle>
      <StyledTodoForm onSubmit={onFormSubmit}>
        <StyledTodoFormInput
          placeholder="Add new todo..."
          value={value}
          onChange={handleInputChange}
        />
        <StyledTodoFormButton type="submit">SUBMIT</StyledTodoFormButton>
      </StyledTodoForm>
    </StyledTodoFormWrapper>
  )
}

export default TodoForm
