import { Box, styled } from '@mui/material'

export const TodoTableWrapper = styled(Box)(({ theme }) => ({
  '& .active': {
    backgroundColor: '#d47483',
    color: '#1a3e72',
    fontWeight: '600',
  },
  '& .completed': {
    backgroundColor: 'rgba(157, 255, 118, 0.49)',
    color: '#1a3e72',
    fontWeight: '600',
  },
  '& .MuiDataGrid-columnHeaderTitleContainer': {
    justifyContent: 'space-between',
  },
  '& .MuiDataGrid-root': {
    border: 'none',
    width: '100%',
  },
  '& .MuiDataGrid-iconButtonContainer': {
    visibility: 'visible !important',
    width: 'auto !important',
    display: 'flex',
  },
  '& .MuiDataGrid-columnSeparator': {
    display: 'none !important',
  },
  '& .MuiCheckbox-root': {
    color: `${theme.palette.primary.light} !important`,
  },
  '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
    outline: 'none !important',
  },
  '& .MuiDataGrid-cell': {
    borderBottom: 'none',
  },
  '& .name-column--cell': {
    color: 'black',
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'white',
  },
  '& .MuiDataGrid-virtualScroller': {
    backgroundColor: 'white',
  },
  '& .MuiDataGrid-footerContainer': {
    backgroundColor: 'white',
  },
  '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
    color: `grey !important`,
  },
}))

export const FooterStyles = {
  display: 'flex',
  alignItems: 'center',
  m: '0 1rem 1rem',
  justifyContent: 'space-between',
}

export const WrapperBoxStyles = {
  bgcolor: 'white',
  width: '100%',
}

export const NoItemsStyles = {
  bgcolor: 'white',
  width: '100%',
  p: '1rem 0',
  textAlign: 'center',
}

export const ButtonBoxStyles = {
  display: 'flex',
}

export const SettingsIconStyles = {
  cursor: 'pointer',
  color: '#1976d2',
  zIndex: '20',
  '&:hover': {
    color: '#1988ff',
  },
}

export const FooterButtonStyles = { mr: '1.5rem', fontSize: '0.8rem' }
