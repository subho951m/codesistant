import React, { useState, useEffect } from 'react'
import '@fontsource/roboto'
import './Codeforces.css'
// import Header from './header/Header'
// import Everyday from './body/everyday/Everyday'
// import PageNavigate from './navigate/PageNavigate'
// import Archive from './body/archive/Archive'
import Signin from './signin/Signin'
// import problemDataExtractor from '../../problemDataExtractor'
// import statusDataExtractor from '../../statusDataExtractor'
// import axios from 'axios'
// import shouldFetchProblems from '../../shouldFetchProblems'
// import problemDataExtractor from '../../dataCF/problemDataExtractor'
import handleProblemsCF from '../../dataCF/handleProblemCF'
// import fetchData from '../../fetchDataCF'
// import { element } from 'prop-types'

const defaultProblemsCF = {
  methodCF: [],
  weekCF: [],
  favouriteCF: [],
  dailyCF: [],
  solvedCF: [],
}

const defaultStatusCF = {
  totalSolved: 0,
  userStatus: [],
}

export const ProblemsetContext = React.createContext(defaultProblemsCF)
export const UserStatusContext = React.createContext(defaultStatusCF)
export const TotalProblemSolved = React.createContext(0)

const Codeforces = () => {
  // const [pageNumber, setPageNumber] = useState(1)
  // const handlePageChange = (page) => {
  //   setPageNumber(page)
  // }

  const [isLoggedInCodeforces, setIsLoggedInCodeforces] = useState(false)
  const [isGettingStorageAPI, setIsGettingStorageAPI] = useState(true)
  const [problemsCF, setProblemsCF] = useState({
    isLoading: false,
    data: [],
    error: '',
  })
  const [userStatusCF, setUserStatusCF] = useState({
    isLoading: false,
    data: [],
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
    console.log('Should fetch problem')
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

  if (isGettingStorageAPI) {
    return <div className="loading">Loading...Storage...</div>
  } else {
    if (!isLoggedInCodeforces) {
      return (
        <div className="codeforces">
          <Signin />
        </div>
      )
    } else {
      if (shouldDisplayData.problems && shouldDisplayData.userStatus) {
        console.log('Display data')
        console.log('contextproblem', contextProblemsCF)
        console.log('status context', contextStatusCF)
        console.log('Just for fun', userStatusCF, problemsCF)
      }
    }
  }
}

// fetch user data and update graph every time CF is rendered and store it in storage api

// if (isGettingStorageAPI || problemsCF.isLoading || userStatusCF.isLoading) {
//   return <div className="loading">Loading...</div>
// }

// return <div className="content">Codeforces</div>
// }

export default Codeforces

// const [problemsCF, setProblemsCF] = useState([])
// const [errorProblemsCF, setErrorProblemsCF] = useState('')
// const [userStatusCF, setUserStatusCF] = useState([])
// const [errorUserStatusCF, setErrorUserStatusCF] = useState('')

// if (isLoadingProblems || isLoadingStatus) {
//   return <div className="loading">Loading...</div>
// }

// const problemList = problemDataExtractor(dataProblems)
// const { userStatus, totalSolved } = statusDataExtractor(dataStatus)

// let codeforcesBodyContent

// if (pageNumber === 1) {
//   codeforcesBodyContent = (
//     <>
//       <div className="codeforces-everyday">
//         <Everyday />
//       </div>
//     </>
//   )
// } else if (pageNumber === 2) {
//   codeforcesBodyContent = (
//     <>
//       <div className="codeforces-archive">
//         <Archive />
//       </div>
//     </>
//   )
// }

// return (
//   <div className="codeforces">
//     <div className="codeforces-header">
//       <Header solved={totalSolved} />
//     </div>
//     <div className="codeforces-navigate">
//       <PageNavigate
//         handlePageChange={handlePageChange}
//         pageNumber={pageNumber}
//       />
//     </div>
//     <ProblemsetContext.Provider value={}>
//       <UserStatusContext.Provider value={}>
//         <div className="codeforces-body">{codeforcesBodyContent}</div>
//       </UserStatusContext.Provider>
//     </ProblemsetContext.Provider>
//   </div>
// )

// const fetchCF = () => {
//   axios
//     .get('https://codeforces.com/api/problemset.problems')
//     .then((response) => {
//       setProblemsCF(response.data)
//       console.log('Problems data fetched')
//     })
//     .catch((error) => {
//       setProblemsCF({})
//       setErrorProblemsCF('Something went wrong')
//       console.log(error)
//     })
//   axios
//     .get('https://codeforces.com/api/user.status?handle=lonewolf154')
//     .then((response) => {
//       setUserStatusCF(response.data)
//       console.log('Status data fetched')
//     })
//     .catch((error) => {
//       setUserStatusCF({})
//       setErrorUserStatusCF('Something went wrong')
//       console.log(error)
//     })
// }

// const [isLoadingProblems, setIsLoadingProblems] = useState(true)
// const [dataProblems, setDataProblems] = useState({})
// const [errorProblems, setErrorProblems] = useState('')
// const [isLoadingStatus, setIsLoadingStatus] = useState(true)
// const [dataStatus, setDataStatus] = useState({})
// const [errorStatus, setErrorStatus] = useState('')

// useEffect(() => {
//   // should fetch new data

// axios
//   .get('https://codeforces.com/api/problemset.problems')
//   .then((response) => {
//     setIsLoadingProblems(false)
//     setDataProblems(response.data)
//     console.log('Problems data fetched')
//   })
//   .catch((error) => {
//     setIsLoadingProblems(false)
//     setDataProblems({})
//     console.log(error)
//     setErrorProblems('Something went wrong')
//   })
// axios
//   .get('https://codeforces.com/api/user.status?handle=lonewolf154')
//   .then((response) => {
//     setIsLoadingStatus(false)
//     setDataStatus(response.data)
//     console.log('Status data fetched')
//   })
//   .catch((error) => {
//     setIsLoadingStatus(false)
//     setDataStatus({})
//     console.log(error)
//     setErrorStatus('Something went wrong')
//   })
// }, [])

// function createData(
//   name: string,
//   tag: string,
//   isSolved: boolean,
//   isFavourite: boolean,
//   id: number
// ) {
//   return { name, tag, isSolved, isFavourite, id }
// }
