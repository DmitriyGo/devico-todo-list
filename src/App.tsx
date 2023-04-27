import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { TodoPage, RegisterPage, LoginPage } from './pages'

import { CircleLoader } from '@/components'
import { theme } from '@/helpers'
import { useAppSelector } from '@/store/hooks'

const App = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth)

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
