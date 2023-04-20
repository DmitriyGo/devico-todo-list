import { yupResolver } from '@hookform/resolvers/yup'
import { LockOutlined } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Container,
  Link as MuiLink,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { register } from '@/store/auth/actions'
import {
  IRegisterDTO,
  IRegisterFormDTO,
  registerFormToRegisterDto,
} from '@/store/auth/types'
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

  useEffect(() => {
    if (user) navigate('/')
  }, [navigate, user])

  const {
    register: formRegister,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormDTO>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<IRegisterFormDTO> = (data) => {
    dispatch(register(registerFormToRegisterDto(data)))

    setValue('login', '')
    setValue('password', '')
    setValue('confirm_password', '')
  }

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
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            id="login"
            label="Login"
            {...formRegister('login')}
            error={!!errors.login}
            helperText={errors.login?.message}
            autoComplete="login"
            autoFocus
          />
          <TextField
            sx={{ my: '0.5rem' }}
            fullWidth
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
