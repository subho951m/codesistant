import React from 'react'
import './popup.css'
import '@fontsource/roboto'
import Logo from './components/logo/Logo'
import Codeforces from './components/codeforces/Codeforces'

const Popup = () => {
  return (
    <div className="h-screen">
      <div className="header">
        <Logo />
      </div>
      <div className="codeforces-content">
        <Codeforces />
      </div>
    </div>
  )
}

export default Popup
