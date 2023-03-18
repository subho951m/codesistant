import React from 'react'
import './ContentOptions.css'
import '@fontsource/roboto'
import { Button } from '@mui/material'

type ContentOptionsProps = {
  handleChangePlatform: (
    event: React.MouseEvent<HTMLButtonElement>,
    coding: string
  ) => void
}

const ContentOptions = (props: ContentOptionsProps) => {
  return (
    <div className="content-options-container">
      <Button
        key={1}
        onClick={(event) => props.handleChangePlatform(event, 'codeforces')}
      >
        Codeforces
      </Button>
      <Button
        key={2}
        onClick={(event) => props.handleChangePlatform(event, 'leetcode')}
      >
        Leetcode
      </Button>
      <Button
        key={3}
        onClick={(event) => props.handleChangePlatform(event, 'gfg')}
      >
        GFG
      </Button>
    </div>
  )
}

export default ContentOptions
