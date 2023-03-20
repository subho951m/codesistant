import React from 'react'
import '@fontsource/roboto'
import './Tasks.css'
import Tables from '../../../../customComponents/tables/Tables'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import SettingsIcon from '@mui/icons-material/Settings'
import Button from '@mui/material/Button'
import data from '../../../../../data'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const Tasks = () => {
  return (
    <div className="codeforces-tasks">
      <div className="codeforces-tasks-header">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1} sx={{ alignItems: 'center' }}>
            <Grid item xs={9} sx={{ textAlign: 'center' }}>
              Problem of the day
            </Grid>
            <Grid item xs={3}>
              <Item sx={{ width: 'inherit' }}>
                <Button
                  sx={{
                    height: '30px',
                    width: 'inherit',
                    color: 'black',
                  }}
                >
                  <SettingsIcon />
                </Button>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
      <div className="codeforces-problems">
        <Tables
          tableSize={3}
          data={data}
          showData={['name', 'tag', 'isSolved', 'isFavourite']}
        />
      </div>
    </div>
  )
}

export default Tasks
