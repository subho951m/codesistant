import axios from 'axios'
import problemDataExtractor from './problemDataExtractor'

const fetchDataCF = (
  isWeekContinuedFetch,
  toBeFetchedProblemSetCount,
  currentDate,
  setProblemsCF,
  setUserStatusCF,
  setContextProblemsCF,
  setContextStatusCF,
  setShouldDisplayData
) => {
  setProblemsCF((problemsCF) => ({ ...problemsCF, isLoading: true }))
  setUserStatusCF((userStatusCF) => ({ ...userStatusCF, isLoading: true }))
  axios
    .get('https://codeforces.com/api/problemset.problems')
    .then((response) => {
      setProblemsCF((problemsCF) => ({
        ...problemsCF,
        isLoading: false,
        data: response.data,
      }))
      problemDataExtractor(
        response.data,
        isWeekContinuedFetch,
        toBeFetchedProblemSetCount,
        currentDate,
        setContextProblemsCF,
        setContextStatusCF,
        setShouldDisplayData
      )
      console.log('Problems data fetched')
    })
    .catch((error) => {
      setProblemsCF((problemsCF) => ({
        ...problemsCF,
        isLoading: false,
        data: [],
        error: 'Something went wrong',
      }))
      console.log(error)
    })
  axios
    .get('https://codeforces.com/api/user.status?handle=lonewolf154')
    .then((response) => {
      setUserStatusCF((userStatusCF) => ({
        ...userStatusCF,
        isLoading: false,
        data: response.data,
      }))
      console.log('status data fetched')
    })
    .catch((error) => {
      setUserStatusCF((userStatusCF) => ({
        ...userStatusCF,
        isLoading: false,
        data: [],
        error: 'Something went wrong',
      }))
      console.log(error)
    })

  chrome.storage.sync.set({
    lastFetchedProblemsDate: currentDate.toString(),
  })
}

export default fetchDataCF
