import React, { useState } from 'react'
import './popup.css'
import '@fontsource/roboto'
import Logo from './components/logo/Logo'
import Codeforces from './components/codeforces/Codeforces'
import Leetcode from './components/leetcode/Leetcode'
import Gfg from './components/gfg/Gfg'
import ContentOptions from './components/ContentOptions/ContentOptions'

const Popup = () => {
  const [platform, setPlatform] = useState('codeforces')

  let displayPlatform
  if (platform === 'codeforces') {
    displayPlatform = <Codeforces />
  } else if (platform === 'leetcode') {
    displayPlatform = <Leetcode />
  } else if (platform === 'gfg') {
    displayPlatform = <Gfg />
  }

  const handleChangePlatform = (event, coding) => {
    if (coding !== platform) {
      // console.log(event)
      setPlatform(coding)
    }
  }

  return (
    <div className="h-screen">
      <div className="header">
        <Logo />
      </div>
      <div className="content-option">
        <ContentOptions
          handleChangePlatform={handleChangePlatform}
          activeButton={platform}
        />
      </div>
      <div className="main-content">{displayPlatform}</div>
    </div>
  )
}

export default Popup
