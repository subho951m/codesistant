import React from 'react'
// import '@fontsource/roboto'
import Button from '@mui/material/Button'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const SolvedButton = () => {
  return (
    <>
      <Button
        variant="contained"
        disabled
        sx={{
          '&.Mui-disabled': {
            backgroundColor: 'rgb(154 191 151 / 72%)',
            color: '#2db563',
            maxWidth: '50px',
            maxHeight: '30px',
            minWidth: '50px',
            minHeight: '30px',
          },
        }}
      >
        <CheckCircleIcon />
      </Button>
    </>
  )
}

export default SolvedButton
