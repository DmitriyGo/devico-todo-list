import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { TodoPage, RegisterPage, LoginPage } from './pages'
import socket from './socket'

import { CircleLoader } from '@/components'
import { theme } from '@/helpers'
import { checkAuth } from '@/store/auth/actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

const App = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  if (isLoading) {
    return <CircleLoader />
  }

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            {user && <Route path="/" element={<TodoPage />} />}

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
