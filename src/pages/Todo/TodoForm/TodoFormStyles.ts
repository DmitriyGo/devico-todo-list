import { styled } from '@mui/material'

import { theme } from '@/helpers'

export const StyledTodoFormWrapper = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.background.paper};
  margin-bottom: 1rem;
  padding: 0.75rem 0;
`

export const StyledTodoForm = styled('form')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0;
`

export const TextFieldStyles = {
  width: '70%',
}

export const UserLoginStyles = {
  color: '#af7eeb',
  mr: '1rem',
  cursor: 'pointer',
}

export const LogoutButtonStyles = {
  color: 'white',
  bgcolor: theme.palette.primary.main,
  '&:hover': { bgcolor: theme.palette.primary.dark },
}

export const LogoutBoxStyles = {
  position: 'absolute',
  top: '2rem',
  right: '2rem',
  display: 'flex',
  alignItems: 'center',
}
