import { Box, styled } from '@mui/material'

export const StyledTodoApp = styled(Box)`
  min-width: 500px;
  width: 80%;
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledTodoTitle = styled('h1')`
  font-size: 2rem;
  font-weight: 600;
`
