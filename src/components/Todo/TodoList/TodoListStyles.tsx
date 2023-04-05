import { Box, styled } from '@mui/material'

export const TodoTableWrapper = styled(Box)(() => ({
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
  '& .MuiDataGrid-root': {
    border: 'none',
    width: '100%',
  },
  '& .MuiDataGrid-cell': {
    borderBottom: 'none',
    outline: 'none',
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
  '& .MuiCheckbox-root': {
    color: `red !important`,
  },
  '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
    color: `grey !important`,
  },
}))
