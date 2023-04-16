import axios from 'axios'

const handleCFCheck = (CFHandle, setIsSuccess, setError) => {
  axios
    .get(`https://codeforces.com/api/user.info?handles=${CFHandle}`)
    .then(() => {
      // success
      setIsSuccess(true)
      chrome.storage.local.set({ codeforcesHandle: CFHandle })
      // apply a little delay
      setTimeout(() => {
        chrome.runtime.openOptionsPage()
      }, 2000)
    })
    .catch(function (error) {
      let errorMessageToDisplay = ''
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //console.log('Point 1')
        if (error.response.data.comment === undefined) {
          errorMessageToDisplay = 'Something went wrong'
          //console.log('Something went wrong')
        } else {
          errorMessageToDisplay = error.response.data.comment
          //console.log(error.response.data.comment)
        }
      } else {
        errorMessageToDisplay = 'Something went wrong'
        //console.log('Point 2')
        //console.log('Something went wrong')
      }
      setError((error) => ({
        ...error,
        isError: true,
        errorMessage: errorMessageToDisplay,
      }))
    })
}
export default handleCFCheck
