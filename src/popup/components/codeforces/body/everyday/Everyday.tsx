import React from 'react'
import '@fontsource/roboto'
import './Everyday.css'
import Tasks from './task/Tasks'
import Chart from '../../../customComponents/chart/Chart'

const EveryDay = () => {
  return (
    <div className="everyday">
      <div className="codeforces-everyday-tasks">
        <Tasks />
      </div>
      <div className="codeforces-chart">
        <Chart />
      </div>
    </div>
  )
}

export default EveryDay
