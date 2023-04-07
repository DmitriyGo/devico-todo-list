import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'

import TodoApp from '@/components/Todo'
import { theme } from '@/helpers'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <TodoApp />
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
