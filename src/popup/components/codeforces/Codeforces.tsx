import React, { useState } from 'react'
import '@fontsource/roboto'
import './Codeforces.css'
import Header from './header/Header'
import Everyday from './body/everyday/Everyday'
import PageNavigate from './navigate/PageNavigate'
import Archive from './body/archive/Archive'

const Codeforces = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const handlePageChange = (page) => {
    setPageNumber(page)
  }

  let codeforcesBodyContent

  if (pageNumber === 1) {
    codeforcesBodyContent = (
      <>
        <div className="codeforces-everyday">
          <Everyday />
        </div>
      </>
    )
  } else if (pageNumber === 2) {
    codeforcesBodyContent = (
      <>
        <div className="codeforces-archive">
          <Archive />
        </div>
      </>
    )
  }

  return (
    <div className="codeforces">
      <div className="codeforces-header">
        <Header />
      </div>
      <div className="codeforces-navigate">
        <PageNavigate
          handlePageChange={handlePageChange}
          pageNumber={pageNumber}
        />
      </div>
      <div className="codeforces-body">{codeforcesBodyContent}</div>
    </div>
  )
}

export default Codeforces
