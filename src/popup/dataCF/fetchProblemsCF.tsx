import axios from 'axios'
import contextProblems from './contextProblems'
import problemDataExtractor from './problemDataExtractor'

const fetchProblemsCF = (
  isWeekContinuedFetch,
  toBeFetchedProblemSetCount,
  currentDate,
  isNewMethodCFSetFetch,
  setProblemsCF,
  setContextProblemsCF,
  setShouldDisplayData
) => {
  setProblemsCF((problemsCF) => ({ ...problemsCF, isLoading: true }))
  // console.log('Started fetching problems data')
  axios
    .get('https://codeforces.com/api/problemset.problems')
    .then((response) => {
      setProblemsCF((problemsCF) => ({
        ...problemsCF,
        isLoading: false,
        data: response.data,
      }))
      const contentType = response.headers['content-type']
      if (contentType && contentType.indexOf('application/json') !== -1) {
        // The response was a JSON object
        problemDataExtractor(
          response.data,
          isWeekContinuedFetch,
          toBeFetchedProblemSetCount,
          currentDate,
          isNewMethodCFSetFetch,
          setContextProblemsCF,
          setShouldDisplayData
        )
        // chrome.storage.local.set({
        //   lastFetchedProblemsDate: currentDate.toString(),
        // })
        // console.log('Problems data fetched')
      } else {
        // The response wasn't a JSON object
        setProblemsCF((problemsCF) => ({
          ...problemsCF,
          isError: true,
          error: 'Something went wrong. Please try again after sometime.',
        }))
        contextProblems(setContextProblemsCF, setShouldDisplayData)
      }
    })
    .catch(function (error) {
      setProblemsCF((problemsCF) => ({
        ...problemsCF,
        isLoading: false,
        isError: true,
      }))
      let errorMessage = ''
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //console.log('Point 1')
        if (error.response.status === 403) {
          errorMessage =
            'Something went wrong. Please visit codeforces.com and try again.'
        } else {
          if (error.response.data.comment === undefined) {
            errorMessage = 'Something went wrong'
            // console.log('Something went wrong')
          } else {
            errorMessage = error.response.data.comment
            //console.log(error.response.data.comment)
          }
        }
      } else {
        errorMessage = 'Something went wrong'
        //console.log('Point 2')
        //console.log('Something went wrong')
      }
      setProblemsCF((problemsCF) => ({
        ...problemsCF,
        error: errorMessage,
      }))
      contextProblems(setContextProblemsCF, setShouldDisplayData)
      // implement constriction on storage set mechanism
    })
}

export default fetchProblemsCF
