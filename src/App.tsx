import { createTheme, ThemeProvider } from '@mui/material'

import TodoApp from '@/components/Todo'

const App = () => {
  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      <TodoApp />
    </ThemeProvider>
  )
}

export default App
