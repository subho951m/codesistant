import React from 'react'
import '@fontsource/roboto'
import './Archive.css'
import Favourite from './favourite/Favourite'
import Pending from './pending/Pending'

const Archive = () => {
  return (
    <div className="archive">
      <div className="codeforces-problems-pending">
        <Pending />
      </div>
      <div className="codeforces-problems-favourite">
        <Favourite />
      </div>
    </div>
  )
}

export default Archive
