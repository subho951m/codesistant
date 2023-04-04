const contextUserStatus = (setContextStatusCF, setShouldDisplayData) => {
  chrome.storage.sync.get(['solvedCF'], function (dataCF) {
    if (dataCF.solvedCF) {
      const inf = 900000
      let heighestRatingSolved = -inf
      const solvedProblemsMap = new Map()
      for (let i = 0; i < dataCF.solvedCF.length; i++) {
        // const problem = JSON.parse(dataCF.solvedCF[i])
        const problem = dataCF.solvedCF[i]
        if ('rating' in problem) {
          heighestRatingSolved = Math.max(heighestRatingSolved, problem.rating)
          if (solvedProblemsMap.has(problem.rating)) {
            solvedProblemsMap.set(
              problem.rating,
              solvedProblemsMap.get(problem.rating) + 1
            )
          } else {
            solvedProblemsMap.set(problem.rating, 1)
          }
        }
      }
      const userStatusArray = []
      if (heighestRatingSolved !== -inf) {
        for (let i = 800; i <= heighestRatingSolved; i = i + 100) {
          userStatusArray.push({
            rating: i,
            solved: solvedProblemsMap.has(i) ? solvedProblemsMap.get(i) : 0,
          })
        }
      }

      setContextStatusCF((element) => ({
        ...element,
        totalSolved: dataCF.solvedCF.length,
        userStatus: userStatusArray,
      }))
      console.log('solvedCF', dataCF.solvedCF)
      console.log('userStatusArray', userStatusArray)
      console.log('totalSolved', dataCF.solvedCF.length)
      setShouldDisplayData((element) => ({ ...element, userStatus: true }))
      console.log('Now time to display data user status')
    }
  })
}

export default contextUserStatus
