import axios from 'axios'

const getFirstDayOfWeek = (currentDate) => {
  const date = new Date(currentDate)
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(date.setDate(diff))
}

const countDays = (date1, date2) => {
  // date1 > date2
  const Difference_In_Time = date1.getTime() - date2.getTime()
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
  return Difference_In_Days
}

const shouldFetchProblems = (
  currentDate,
  setIsLoggedInCodeforces,
  setToBeFetchedProblemSetCount,
  setIsWeekContinuedFetch,
  setIsGettingStorageAPI,
  setProblemsCF,
  setUserStatusCF
) => {
  const fetching = () => {
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

  chrome.storage.sync.get(['codeforcesHandle'], function (handle) {
    console.log('Point 1')
    let haveHandle = false
    let toBeFetch = 0
    if (handle.codeforcesHandle) {
      setIsLoggedInCodeforces(true)
      haveHandle = true
      console.log('Logged into codeforces')
      chrome.storage.sync.get(['lastFetchedProblemsDate'], function (problems) {
        if (problems.lastFetchedProblemsDate) {
          const dateYYY = new Date(problems.lastFetchedProblemsDate)
          console.log('Point 2')
          console.log('Current date', currentDate)
          console.log('dateYYY', dateYYY)
          console.log('dateYYY type', typeof dateYYY)
          // lastFetched found 3

          if (dateYYY.getTime() !== currentDate.getTime()) {
            // point 5
            chrome.storage.sync.get(
              ['codesistantInstalledDate'],
              function (installed) {
                console.log('Point 3')
                console.log('DateYYY', dateYYY)
                if (installed.codesistantInstalledDate) {
                  let weekStartDate = getFirstDayOfWeek(currentDate)

                  if (weekStartDate < installed.codesistantInstalledDate) {
                    // point 7
                    weekStartDate = installed.codesistantInstalledDate
                    toBeFetch = countDays(currentDate, weekStartDate)

                    setToBeFetchedProblemSetCount(
                      countDays(currentDate, weekStartDate)
                    )
                  } else {
                    // point 8
                    if (dateYYY < weekStartDate) {
                      // point 9
                      toBeFetch = countDays(currentDate, weekStartDate) + 1

                      setToBeFetchedProblemSetCount(
                        countDays(currentDate, weekStartDate) + 1
                      )
                    } else {
                      // point 10
                      toBeFetch = countDays(currentDate, dateYYY)
                      setToBeFetchedProblemSetCount(
                        countDays(currentDate, dateYYY)
                      )
                    }
                  }
                  fetching()
                } else {
                  // run time error
                }
              }
            )
          } else {
            // last fetch = cur date 6
            // no fetching
          }
        } else {
          // last fetched not found 4
          chrome.storage.sync.get(
            ['codesistantInstalledDate'],
            function (installed) {
              console.log('Point 5')
              let weekStartDate = getFirstDayOfWeek(currentDate)
              console.log('Week start date', weekStartDate)
              const dateXX = new Date(installed.codesistantInstalledDate)
              console.log('Install date', dateXX)
              if (weekStartDate.getTime() < dateXX.getTime()) {
                // point 11
                console.log('Week start date inside', weekStartDate)
                weekStartDate = dateXX
              } else {
                // point 12
              }
              console.log(weekStartDate)
              toBeFetch = countDays(currentDate, weekStartDate) + 1
              setToBeFetchedProblemSetCount(
                countDays(currentDate, weekStartDate) + 1
              )
              fetching()
            }
          )
        }
      })
    }

    setIsLoggedInCodeforces(haveHandle)
    setToBeFetchedProblemSetCount(toBeFetch)
    setIsGettingStorageAPI(false)
  })
}

export default shouldFetchProblems

// write logic for setIsWeekContinuedFetch
