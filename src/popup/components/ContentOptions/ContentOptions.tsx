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
              props.activeButton === 'codeforces'
                ? '#973c5e'
                : 'rgba(224, 224, 224, 1)',
            color:
              props.activeButton === 'codeforces'
                ? 'white'
                : 'rgba(0, 0, 0, 0.87)',
            borderRadius: 0,
            ':hover': {
              bgcolor:
                props.activeButton === 'codeforces'
                  ? '#bd6d8b'
                  : 'rgb(233 201 201)',
              color: 'black',
            },
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
              props.activeButton === 'leetcode'
                ? '#973c5e'
                : 'rgba(224, 224, 224, 1)',
            color:
              props.activeButton === 'leetcode'
                ? 'white'
                : 'rgba(0, 0, 0, 0.87)',
            borderRadius: 0,
            ':hover': {
              bgcolor:
                props.activeButton === 'leetcode'
                  ? '#bd6d8b'
                  : 'rgb(233 201 201)',
              color: 'black',
            },
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
            backgroundColor:
              props.activeButton === 'gfg'
                ? '#973c5e'
                : 'rgba(224, 224, 224, 1)',
            color:
              props.activeButton === 'gfg' ? 'white' : 'rgba(0, 0, 0, 0.87)',
            borderRadius: 0,
            ':hover': {
              bgcolor:
                props.activeButton === 'gfg' ? '#bd6d8b' : 'rgb(233 201 201)',
              color: 'black',
            },
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
