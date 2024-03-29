import fetchProblemsCF from './fetchProblemsCF'
import contextProblems from './contextProblems'
import fetchUserStatusCF from './fetchUserStatusCF'

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

const handleProblemsCF = (
  currentDate,
  setIsLoggedInCodeforces,
  setIsGettingStorageAPI,
  setProblemsCF,
  setUserStatusCF,
  setContextProblemsCF,
  setContextStatusCF,
  setShouldDisplayData
) => {
  chrome.storage.local.get(['codeforcesHandle'], function (handle) {
    //console.log('Point 1')
    let makeProblemSetCount = 0
    let isWeekContinuedFetch = true
    if (handle.codeforcesHandle) {
      const userHandleCF = handle.codeforcesHandle
      setIsLoggedInCodeforces((element) => ({
        ...element,
        loggedIn: true,
        CFHandle: userHandleCF,
      }))
      // console.log('Logged into codeforces')
      // user status should get updated every time codeforces is rendered
      fetchUserStatusCF(
        userHandleCF,
        setUserStatusCF,
        setContextStatusCF,
        setShouldDisplayData
      )
      chrome.storage.local.get(
        ['lastFetchedProblemsDate'],
        function (problems) {
          if (problems.lastFetchedProblemsDate) {
            // lastFetched found
            const lastFetchedProblemsDate = new Date(
              problems.lastFetchedProblemsDate
            )
            //console.log('Point 2')
            //console.log('Current date', currentDate)
            //console.log('lastFetchedProblemsDate', lastFetchedProblemsDate)
            //console.log(
            //   'lastFetchedProblemsDate type',
            //   typeof lastFetchedProblemsDate
            // )

            if (lastFetchedProblemsDate.getTime() !== currentDate.getTime()) {
              chrome.storage.local.get(
                ['codesistantInstalledDate'],
                function (installed) {
                  //console.log('Point 3')
                  //console.log('lastFetchedProblemsDate', lastFetchedProblemsDate)
                  if (installed.codesistantInstalledDate) {
                    let weekStartDate = getFirstDayOfWeek(currentDate)
                    if (weekStartDate < installed.codesistantInstalledDate) {
                      weekStartDate = installed.codesistantInstalledDate
                      makeProblemSetCount = countDays(
                        currentDate,
                        weekStartDate
                      )

                      // isWeekContinuedFetch = true
                    } else {
                      if (lastFetchedProblemsDate < weekStartDate) {
                        makeProblemSetCount =
                          countDays(currentDate, weekStartDate) + 1

                        isWeekContinuedFetch = false
                        // it is a fresh fetch, week's pending should vanish first and then any action
                      } else {
                        makeProblemSetCount = countDays(
                          currentDate,
                          lastFetchedProblemsDate
                        )

                        // isWeekContinuedFetch = true
                      }
                    }
                    fetchProblemsCF(
                      isWeekContinuedFetch,
                      makeProblemSetCount,
                      currentDate,
                      false,
                      setProblemsCF,
                      setContextProblemsCF,
                      setShouldDisplayData
                    )
                    // chrome.storage.local.set({ isNewMethodCFSet: 'no' })
                  } else {
                    // run time error
                  }
                }
              )
            } else {
              // last fetch = cur date
              // no fetching BUT check if method CF is set today
              // then update daily CF
              chrome.storage.local.get('isNewMethodCFSet', function (CF) {
                if (CF.isNewMethodCFSet && CF.isNewMethodCFSet === 'yes') {
                  // just fetch and change dailyCF according to methodCF
                  fetchProblemsCF(
                    isWeekContinuedFetch,
                    1,
                    currentDate,
                    true,
                    setProblemsCF,
                    setContextProblemsCF,
                    setShouldDisplayData
                  )
                  // chrome.storage.local.set({ isNewMethodCFSet: 'no' })
                } else {
                  //console.log(
                  //   'No fetching so Setcontext called from handle Problem'
                  // )
                  contextProblems(setContextProblemsCF, setShouldDisplayData)
                }
              })
            }
          } else {
            // last fetched not
            chrome.storage.local.get(
              ['codesistantInstalledDate'],
              function (installed) {
                //console.log('Point 5')
                let weekStartDate = getFirstDayOfWeek(currentDate)
                //console.log('Week start date', weekStartDate)
                const dateXX = new Date(installed.codesistantInstalledDate)
                //console.log('Install date', dateXX)
                if (weekStartDate.getTime() < dateXX.getTime()) {
                  //console.log('Week start date inside', weekStartDate)
                  weekStartDate = dateXX
                }
                //console.log(weekStartDate)
                makeProblemSetCount = countDays(currentDate, weekStartDate) + 1

                isWeekContinuedFetch = false
                // it is a fresh fetch, week's pending should vanish first and then any action

                fetchProblemsCF(
                  isWeekContinuedFetch,
                  makeProblemSetCount,
                  currentDate,
                  false,
                  setProblemsCF,
                  setContextProblemsCF,
                  setShouldDisplayData
                )
                // chrome.storage.local.set({ isNewMethodCFSet: 'no' })
              }
            )
          }
        }
      )
    }

    setIsGettingStorageAPI(false)
  })
}

export default handleProblemsCF

// write logic for setIsWeekContinuedFetch
