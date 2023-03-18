import React from 'react'
import '@fontsource/roboto'
import { Button } from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

const UnsolvedButton = () => {
  return (
    <>
      <Button
        variant="contained"
        sx={{
          maxWidth: '50px',
          maxHeight: '30px',
          minWidth: '50px',
          minHeight: '30px',
        }}
      >
        <ArrowCircleRightIcon />
      </Button>
    </>
  )
}

export default UnsolvedButton
