import React, { useState, useEffect } from 'react'
import '@fontsource/roboto'
import './Codeforces.css'
import Header from './header/Header'
import Everyday from './body/everyday/Everyday'
import PageNavigate from './navigate/PageNavigate'
import Pending from './body/pending/Pending'
import Favourite from './body/favourite/Favourite'
import Signin from './signin/Signin'
import handleProblemsCF from '../../dataCF/handleProblemCF'
import CircularProgress from '@mui/material/CircularProgress'
import CustomizedSnackbars from '../customComponents/snackbar/CustomizedSnackbars'

const defaultProblemsCF = {
  methodCF: [],
  weekCF: [],
  favouriteCF: [],
  dailyCF: [],
  solvedCF: [],
  isError: false,
  errorMessage: '',
}

const defaultStatusCF = {
  totalSolved: 0,
  userStatus: [],
  isError: false,
  errorMessage: '',
}

export const ProblemsetContext = React.createContext({
  contextProblemsCF: defaultProblemsCF,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setContextProblemsCF: ({}) => {},
})
export const UserStatusContext = React.createContext(defaultStatusCF)

const Codeforces = () => {
  const [pageTitle, setPageTitle] = useState('Everyday')
  // const handlePageChange = (title) => {
  //   setPageTitle(title)
  // }

  const handlePageChange = (
    event: React.MouseEvent<HTMLElement>,
    newTitle: string | null
  ) => {
    if (newTitle !== null) {
      setPageTitle(newTitle)
    }
  }

  let codeforcesBodyContent

  if (pageTitle === 'Everyday') {
    codeforcesBodyContent = (
      <>
        <div className="codeforces-everyday">
          <Everyday />
        </div>
      </>
    )
  } else if (pageTitle === 'Pending') {
    codeforcesBodyContent = (
      <>
        <div className="codeforces-pending">
          <Pending />
        </div>
      </>
    )
  } else if (pageTitle === 'Favourite') {
    codeforcesBodyContent = (
      <>
        <div className="codeforces-favourite">
          <Favourite />
        </div>
      </>
    )
  }

  const [isLoggedInCodeforces, setIsLoggedInCodeforces] = useState({
    loggedIn: false,
    CFHandle: '',
  })
  const [isGettingStorageAPI, setIsGettingStorageAPI] = useState(true)
  const [problemsCF, setProblemsCF] = useState({
    isLoading: false,
    data: [],
    isError: false,
    error: '',
  })
  const [userStatusCF, setUserStatusCF] = useState({
    isLoading: false,
    data: [],
    isError: false,
    error: '',
  })

  const [shouldDisplayData, setShouldDisplayData] = useState({
    problems: false,
    userStatus: false,
  })

  const [contextProblemsCF, setContextProblemsCF] = useState(defaultProblemsCF)
  const [contextStatusCF, setContextStatusCF] = useState(defaultStatusCF)

  const currentTimeStamp = new Date()
  const currentDate = new Date(
    currentTimeStamp.getFullYear(),
    currentTimeStamp.getMonth(),
    currentTimeStamp.getDate()
  )

  useEffect(() => {
    //console.log('Should fetch problem')
    handleProblemsCF(
      currentDate,
      setIsLoggedInCodeforces,
      setIsGettingStorageAPI,
      setProblemsCF,
      setUserStatusCF,
      setContextProblemsCF,
      setContextStatusCF,
      setShouldDisplayData
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (problemsCF.isError || userStatusCF.isError) {
    // thorw error
  }

  if (isGettingStorageAPI) {
    return (
      <div className="loading">
        <CircularProgress color="secondary" />
      </div>
    )
  } else {
    if (!isLoggedInCodeforces.loggedIn) {
      return (
        <div className="codeforces">
          <Signin />
        </div>
      )
    } else {
      if (shouldDisplayData.problems && shouldDisplayData.userStatus) {
        //console.log('Display Codeforces data')
        //console.log('contextproblem', contextProblemsCF)
        //console.log('status context', contextStatusCF)
        //console.log('Just for fun', userStatusCF, problemsCF)
        return (
          <div className="codeforces">
            <div className="codeforces-header">
              <Header
                solved={contextStatusCF.totalSolved}
                userHandleCF={isLoggedInCodeforces.CFHandle}
              />
            </div>
            <div className="codeforces-navigate">
              <PageNavigate
                handlePageChange={handlePageChange}
                pageTitle={pageTitle}
              />
            </div>
            <ProblemsetContext.Provider
              value={{ contextProblemsCF, setContextProblemsCF }}
            >
              <UserStatusContext.Provider value={contextStatusCF}>
                {codeforcesBodyContent}
              </UserStatusContext.Provider>
            </ProblemsetContext.Provider>
            {problemsCF.isError ? (
              <CustomizedSnackbars message={problemsCF.error} />
            ) : userStatusCF.isError ? (
              <CustomizedSnackbars message={userStatusCF.error} />
            ) : null}
          </div>
        )
      } else {
        return (
          <div className="loading">
            <CircularProgress color="secondary" />
          </div>
        )
      }
    }
  }
}

export default Codeforces
