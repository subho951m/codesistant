import React from 'react'
import '@fontsource/roboto'
import './Tasks.css'
import Tables from '../../tables/Tables'

const Tasks = () => {
  return (
    <div className="codeforces-tasks">
      <div className="codeforces-tasks-header">Problems of the day</div>
      <div className="codeforces-problems">
        <Tables />
      </div>
    </div>
  )
}

export default Tasks
