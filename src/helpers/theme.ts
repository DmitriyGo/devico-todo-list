import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#af7eeb',
    },
    secondary: {
      main: '#8f98b9',
    },
    background: {
      default: '#e3e9ff',
      paper: '#af7eeb',
    },
    grey: {
      '400': '#bdbdbd',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: '1rem',
          padding: '0.75rem 0.6rem',
          color: theme.palette.text.secondary,
          backgroundColor: '#ccf2f3',
        }),
        containedPrimary: ({ theme }) => ({
          fontSize: '1rem',
          color: theme.palette.text.secondary,
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: theme.palette.background.default,
          },
        }),
        containedSecondary: ({ theme }) => ({
          fontSize: '1rem',
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.default,
          '&:hover': {
            backgroundColor: theme.palette.background.paper,
          },
        }),

        outlined: ({ theme }) => ({
          padding: '0.5rem 0.75rem',
          fontSize: '1rem',
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: theme.palette.background.default,
          },
        }),
        outlinedSecondary: ({ theme }) => ({
          padding: '0.5315rem 1.5rem',
          borderRadius: '0 4px 4px 0',
          border: `1px solid ${theme.palette.grey['400']}`,
          borderLeft: 'none',
          boxShadow: 'none',
        }),

        text: ({ theme }) => ({
          background: 'transparent',
          color: theme.palette.primary.dark,
          '&:hover': {
            color: theme.palette.primary.main,
            background: 'transparent',
          },
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: () => ({
          '& .MuiInputBase-input': {
            backgroundColor: 'white',
            padding: '0.75rem 0.6rem',
            borderRadius: '4px 0 0 4px',
          },
          '& .MuiInputBase-root': {
            borderRadius: '4px 0 0 4px',
          },
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: () => ({
          backgroundColor: 'white',
        }),
      },
    },
  },
})

export default theme
