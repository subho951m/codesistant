import axios from 'axios'
import problemDataExtractor from './problemDataExtractor'

const fetchProblemsCF = (
  isWeekContinuedFetch,
  toBeFetchedProblemSetCount,
  currentDate,
  setProblemsCF,
  setContextProblemsCF,
  setShouldDisplayData
) => {
  setProblemsCF((problemsCF) => ({ ...problemsCF, isLoading: true }))
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
      // most important part
      // if there is an error process with previous part
      // constriction on storage set mechanism
    })

  chrome.storage.sync.set({
    lastFetchedProblemsDate: currentDate.toString(),
  })
}

export default fetchProblemsCF
