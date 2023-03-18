import React from 'react'
import './ContentOptions.css'
import '@fontsource/roboto'
import { Button } from '@mui/material'
import Grid from '@mui/material/Grid'

type ContentOptionsProps = {
  handleChangePlatform: (
    event: React.MouseEvent<HTMLButtonElement>,
    coding: string
  ) => void
  activeButton: string
}

const ContentOptions = (props: ContentOptionsProps) => {
  //   console.log(props.activeButton)
  return (
    <Grid container spacing={0}>
      <Grid item xs={4}>
        <Button
          key={1}
          onClick={(event) => props.handleChangePlatform(event, 'codeforces')}
          sx={{
            backgroundColor:
              props.activeButton === 'codeforces' ? 'red' : 'white',
            borderRadius: 0,
          }}
          fullWidth
        >
          Codeforces
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          key={2}
          onClick={(event) => props.handleChangePlatform(event, 'leetcode')}
          sx={{
            backgroundColor:
              props.activeButton === 'leetcode' ? 'red' : 'white',
            borderRadius: 0,
          }}
          fullWidth
        >
          Leetcode
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          key={3}
          onClick={(event) => props.handleChangePlatform(event, 'gfg')}
          sx={{
            backgroundColor: props.activeButton === 'gfg' ? 'red' : 'white',
            borderRadius: 0,
          }}
          fullWidth
        >
          GFG
        </Button>
      </Grid>
    </Grid>
  )
}

export default ContentOptions
