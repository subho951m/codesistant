import React from 'react'
import '@fontsource/roboto'
import './Codeforces.css'
import Header from './header/Header'
import Tasks from './body/Tasks'
import Chart from '../customComponents/chart/Chart'

const Codeforces = () => {
  return (
    <div className="codeforces">
      <div className="codeforces-header-content">
        <Header />
      </div>
      <div className="today-task">
        <Tasks />
      </div>
      <div className="solved-chart">
        <Chart />
      </div>
    </div>
  )
}

export default Codeforces
