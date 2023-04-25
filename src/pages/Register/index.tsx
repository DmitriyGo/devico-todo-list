import { yupResolver } from '@hookform/resolvers/yup'
import { LockOutlined } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Container,
  debounce,
  Link as MuiLink,
  TextField,
  Typography,
} from '@mui/material'
import { KeyboardEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { StyledInputSpinner } from './styles'

import { checkIfServiceKey, httpClient } from '@/helpers'
import { register } from '@/store/auth/actions'
import { IRegisterFormDTO, registerFormToRegisterDto } from '@/store/auth/types'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

const schema = yup.object().shape({
  login: yup.string().required('Login is required'),
  password: yup
    .string()
    .min(6, 'Min length 6 characters')
    .required('Password is required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
})

const RegisterPage = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()

  const [loginTaken, setLoginTaken] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) navigate('/')
  }, [navigate, user])

  const {
    register: formRegister,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IRegisterFormDTO>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<IRegisterFormDTO> = (data) => {
    dispatch(register(registerFormToRegisterDto(data)))

    setValue('login', '')
    setValue('password', '')
    setValue('confirm_password', '')
  }

  const onTextFieldKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    setLoading(checkIfServiceKey(event))
  }

  const onTextFieldKeyUp = debounce(async () => {
    const response = await httpClient.post('/auth/check-login', {
      login: getValues().login,
    })

    setLoginTaken(response.data)
    setLoading(false)
  }, 300)

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          sx={{ position: 'relative' }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            fullWidth
            id="login"
            label="Login"
            {...formRegister('login')}
            error={loginTaken || !!errors.login}
            helperText={
              loginTaken ? 'This login is already taken' : errors.login?.message
            }
            autoComplete="login"
            autoFocus
            onKeyDown={onTextFieldKeyDown}
            onKeyUp={onTextFieldKeyUp}
            sx={{ position: 'relative' }}
          />
          {loading && <StyledInputSpinner />}
          <TextField
            fullWidth
            sx={{ mt: '0.75rem' }}
            label="Password"
            type="password"
            {...formRegister('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            autoComplete="new-password"
            id="password"
          />
          <TextField
            fullWidth
            sx={{ mt: '0.75rem' }}
            label="Confirm Password"
            type="password"
            {...formRegister('confirm_password')}
            error={!!errors.confirm_password}
            helperText={errors.confirm_password?.message}
            autoComplete="new-password"
            id="confirm"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loginTaken}
            sx={{ mt: 3, mb: 2, p: '0.5rem 0' }}
          >
            Sign Up
          </Button>
        </Box>
        <MuiLink
          sx={{ alignSelf: 'flex-start' }}
          component="button"
          variant="body2"
        >
          <Link to="/login">{'Already have an account? Sign In'}</Link>
        </MuiLink>
      </Box>
    </Container>
  )
}

export default RegisterPage
