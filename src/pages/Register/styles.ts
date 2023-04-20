import { Icon, keyframes, styled } from '@mui/material'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const StyledInputSpinner = styled(Icon)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 3px solid #ccc9e1;
  border-top-color: #8f44fd;
  animation: ${spin} 1s infinite ease-in-out;
`
