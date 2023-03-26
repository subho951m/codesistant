import axios from 'axios'

const fetchData = (setProblemsCF, setUserStatusCF) => {
  const currentTimeStamp = new Date()
  const currentDate = new Date(
    currentTimeStamp.getFullYear(),
    currentTimeStamp.getMonth(),
    currentTimeStamp.getDate()
  )
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
      console.log('Problems data fetched')
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

  chrome.storage.sync.set({ lastFetchedProblemsDate: currentDate.toString() })
}
export default fetchData
