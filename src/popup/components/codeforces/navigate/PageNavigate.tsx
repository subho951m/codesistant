import React from 'react'
import '@fontsource/roboto'
import './PageNavigate.css'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

type PageNavigateProps = {
  handlePageChange: (page: number) => void
  pageNumber: number
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  // padding: theme.spacing(0.4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const PageNavigate = (props: PageNavigateProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Item>
            <Button
              key={1}
              onClick={() => props.handlePageChange(1)}
              disabled={props.pageNumber === 1}
              sx={{
                color: '#973c5e',
                width: '70px',
                height: '25px',
              }}
            >
              <ArrowBackIcon />
            </Button>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item sx={{ padding: '3px' }}>
            {props.pageNumber === 1
              ? 'Current Problems'
              : props.pageNumber === 2
              ? 'Archived Problems'
              : ''}
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <Button
              key={2}
              onClick={() => props.handlePageChange(2)}
              disabled={props.pageNumber === 2}
              sx={{
                color: '#973c5e',
                width: '70px',
                height: '25px',
              }}
            >
              <ArrowForwardIcon />
            </Button>
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PageNavigate
