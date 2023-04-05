import { styled } from '@mui/material'

export const StyledTodoFormWrapper = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledTodoForm = styled('form')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledTodoFormButton = styled('button')`
  margin-bottom: 1.5rem;
  padding: 0.5rem 1.75rem;
  background-color: #a2ebf2;
  border: none;
  border-radius: 0 0.25rem 0.25rem 0;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
`

export const StyledTodoFormTitle = styled('h1')`
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: 600;
`

export const StyledTodoFormInput = styled('input')`
  margin-bottom: 1.5rem;
  width: 60%;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.25rem 0 0 0.25rem;
  font-size: 1rem;

  &:focus {
    outline: none;
  }
`
