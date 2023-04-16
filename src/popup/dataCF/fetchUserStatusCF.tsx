import axios from 'axios'
import statusDataExtractor from './statusDataExtractor'
import contextUserStatus from './contextUserStatus'

const fetchUserStatusCF = (
  userHandleCF,
  setUserStatusCF,
  setContextStatusCF,
  setShouldDisplayData
) => {
  setUserStatusCF((userStatusCF) => ({ ...userStatusCF, isLoading: true }))
  axios
    .get(`https://codeforces.com/api/user.status?handle=${userHandleCF}`)
    .then((response) => {
      setUserStatusCF((userStatusCF) => ({
        ...userStatusCF,
        isLoading: false,
        data: response.data,
      }))
      statusDataExtractor(
        response.data.result,
        setContextStatusCF,
        setShouldDisplayData
      )
      // console.log('status data fetched')
    })
    .catch(function (error) {
      setUserStatusCF((userStatusCF) => ({
        ...userStatusCF,
        isLoading: false,
        isError: true,
      }))
      let errorMessage = ''
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //console.log('Point 1')
        if (error.response.data.comment === undefined) {
          errorMessage = 'Something went wrong'
          //console.log('Something went wrong')
        } else {
          errorMessage = error.response.data.comment
          //console.log(error.response.data.comment)
        }
      } else {
        errorMessage = 'Something went wrong'
        //console.log('Point 3')
        //console.log('Something went wrong')
      }
      setUserStatusCF((userStatusCF) => ({
        ...userStatusCF,
        error: errorMessage,
      }))
      // console.clear()
      contextUserStatus(setContextStatusCF, setShouldDisplayData)
    })
}

export default fetchUserStatusCF
