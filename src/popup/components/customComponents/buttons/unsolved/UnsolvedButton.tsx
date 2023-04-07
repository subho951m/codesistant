import React from 'react'
import '@fontsource/roboto'
import { Button } from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

type UnsolvedButtonProps = {
  problemLink: string
}

const UnsolvedButton = (props: UnsolvedButtonProps) => {
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
        onClick={() => {
          chrome.tabs.create({
            url: props.problemLink,
            active: false,
          })
        }}
      >
        <ArrowCircleRightIcon />
      </Button>
    </>
  )
}

export default UnsolvedButton
