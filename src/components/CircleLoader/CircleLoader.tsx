import { Box } from '@mui/material'
import React from 'react'
import { CircleLoader as CircleSpinnerLoader } from 'react-spinners'

import { theme } from '@/helpers'

const CircleLoader = ({}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircleSpinnerLoader size={128} color={theme.palette.primary.main} />
    </Box>
  )
}

export default CircleLoader
