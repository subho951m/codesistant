import axios from 'axios'
import statusDataExtractor from './statusDataExtractor'
import contextUserStatus from './contextUserStatus'

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
        console.log('Point 1')
        if (error.response.data.comment === undefined) {
          errorMessage = 'Something went wrong'
          console.log('Something went wrong')
        } else {
          errorMessage = error.response.data.comment
          console.log(error.response.data.comment)
        }
      } else {
        errorMessage = 'Something went wrong'
        console.log('Point 3')
        console.log('Something went wrong')
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

// implement a check function at login page
// https://codeforces.com/api/user.info?handles=loneFck
// {"status":"FAILED","comment":"handles: User with handle lonefuck not found"}
// {"status":"OK","result":[{"contribution":0,"lastOnlineTimeSeconds":1680020297,"rating":945,"friendOfCount":8,"titlePhoto":"https://userpic.codeforces.org/no-title.jpg","rank":"newbie","handle":"lonewolf154","maxRating":1062,"avatar":"https://userpic.codeforces.org/no-avatar.jpg","registrationTimeSeconds":1644473852,"maxRank":"newbie"}]}

// implement a error handling at problem fetch page
// https://codeforces.com/api/problemset.problems?tags=dp

// implement error handling on user status fetch request
// https://codeforces.com/api/user.status?handle=loneFck
// {"status":"FAILED","comment":"handle: User with handle lonefuck not found"}

// different axios error handling
// no internet error, and stuff like that

// axios.get('/user/12345')
//   .catch(function (error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//       // http.ClientRequest in node.js
//       console.log(error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log('Error', error.message);
//     }
//     console.log(error.config);
//   });
