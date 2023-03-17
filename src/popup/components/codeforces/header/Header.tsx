import React from 'react'
import '@fontsource/roboto'
import './Header.css'

const Header = () => {
  return (
    <div className="codeforces-header">
      <span className="codeforces-logo">Codeforces</span>
      <span className="codeforces-username">lonewolf154</span>
      <span className="codeforces-total-solved">Solved: 50</span>
    </div>
  )
}

export default Header
