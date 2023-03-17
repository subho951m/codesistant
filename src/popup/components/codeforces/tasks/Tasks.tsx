import React from 'react'
import '@fontsource/roboto'
import './Tasks.css'
import { Button } from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Tables from '../../tables/Tables'

const Tasks = () => {
  return (
    <div className="codeforces-tasks">
      <div className="codeforces-tasks-header">Problems of the day</div>
      <div className="codeforces-problems">
        <table>
          <tbody>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>
                <Button variant="contained">
                  <ArrowCircleRightIcon />
                </Button>
              </td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
              <td>
                <Button
                  variant="contained"
                  disabled
                  sx={{
                    '&.Mui-disabled': {
                      background: 'green',
                      color: 'white',
                    },
                  }}
                >
                  <CheckCircleIcon />
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
        <Tables />
      </div>
    </div>
  )
}

export default Tasks
