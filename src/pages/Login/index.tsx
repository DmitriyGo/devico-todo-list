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

import { login } from '@/store/auth/actions'
import { ILoginDTO } from '@/store/auth/types'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

const schema = yup.object().shape({
  login: yup.string().required('Login is required'),
  password: yup
    .string()
    .min(6, 'Min length 6 characters')
    .required('Password is required'),
})

const LoginPage = () => {
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
  } = useForm<ILoginDTO>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<ILoginDTO> = (data) => {
    dispatch(login(data))

    setValue('password', '')
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
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
            fullWidth
            label="Password"
            type="password"
            {...formRegister('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            autoComplete="current-password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, p: '0.5rem 0' }}
          >
            Sign In
          </Button>
        </Box>
        <MuiLink
          sx={{ alignSelf: 'flex-start' }}
          component="button"
          variant="body2"
        >
          <Link to="/register">{"Don't have an account? Sign Up"}</Link>
        </MuiLink>
      </Box>
    </Container>
  )
}

export default LoginPage
