import axios from 'axios'
import statusDataExtractor from './statusDataExtractor'

const fetchUserStatusCF = (
  setUserStatusCF,
  setContextStatusCF,
  setShouldDisplayData
) => {
  setUserStatusCF((userStatusCF) => ({ ...userStatusCF, isLoading: true }))
  axios
    .get('https://codeforces.com/api/user.status?handle=lonewolf154')
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
      // most important part
      // if there is an error process will previous saved data
      // constriction on storage set mechanism
    })
  console.log('status data fetched')
}

export default fetchUserStatusCF
