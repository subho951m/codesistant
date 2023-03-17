import React from 'react'
import '@fontsource/roboto'
import './Codeforces.css'
import Header from './header/Header'
import Tasks from './tasks/Tasks'

const Codeforces = () => {
  return (
    <div className="codeforces">
      <div className="codeforces-header-content">
        <Header />
      </div>
      <div className="today-task">
        <Tasks />
      </div>
    </div>
  )
}

export default Codeforces
