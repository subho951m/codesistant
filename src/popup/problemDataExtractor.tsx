function isValidProblem(problem, method) {
  if (method.ratingFrom !== 0 || method.ratingTo !== 9000) {
    if (
      !(
        'rating' in problem &&
        problem.rating >= method.ratingFrom &&
        problem.rating <= method.ratingTo
      )
    ) {
      return false
    }
  }
  let ans = true
  method.tags.forEach((element) => {
    ans = ans && problem.tags.include(element)
  })
  return ans
}

function generateUniqueRandomNumbers(num, min, max) {
  // random number belongs [min, max]
  const arr = []
  if (num > max - min + 1) return arr
  while (arr.length < num) {
    const r = Math.floor(Math.random() * (max - min + 1) + min)
    if (arr.indexOf(r) === -1) arr.push(r)
  }
  return arr
}

function isUnsolved(dailyProblem, solvedCF) {
  solvedCF.some((solvedProblem) => {
    if (
      solvedProblem.name === dailyProblem.name &&
      solvedProblem.contestId === dailyProblem.contestId &&
      solvedProblem.index === dailyProblem.index
    )
      return false
  })
  return true
}

const problemDataExtractor = (
  data,
  isWeekContinuedFetch,
  toBeFetchedProblemSetCount,
  currentDate
) => {
  chrome.storage.sync.get(
    ['methodCF', 'weekCF', 'favouriteCF', 'dailyCF', 'solvedCF'],
    function (settings) {
      if (settings.methodCF) {
        const problemSetArray = new Array(settings.methodCF.length)
        for (let i = 0; i < settings.methodCF.length; i++) {
          problemSetArray[i] = data.result.problems.filter((problem) =>
            isValidProblem(problem, settings.methodCF[i])
          )
        }
        // now make a batch of random
        const problemBatch = new Array(toBeFetchedProblemSetCount)
        for (let i = 0; i < problemSetArray.length; i++) {
          const arrayIndexs = generateUniqueRandomNumbers(
            toBeFetchedProblemSetCount,
            0,
            problemSetArray[i].length - 1
          )
          for (let j = 0; j < toBeFetchedProblemSetCount; j++) {
            problemBatch[j].push({
              problem: problemSetArray[i][arrayIndexs[j]],
              fetchTag: settings.methodCF[i],
            })
          }
        }
        // immplement logic for checking if a problem does not exist in any of storage -> daily, week, favourite, solved
        // if (settings.dailyCF.length > 0 || settings.weekCF.length > 0) {
        // }

        const newDailyCF = problemBatch[0]
        let unsolvedDaily = []
        if (settings.dailyCF && settings.solvedCF) {
          // find if problem not in solved problem list, then it is marked as unsolved
          unsolvedDaily = settings.dailyCF.filter((problem) =>
            isUnsolved(problem, settings.solvedCF)
          )
        }
        let unsolvedMergeWeekCF = []
        if (isWeekContinuedFetch) {
          if (settings.weekCF) {
            unsolvedMergeWeekCF = unsolvedMergeWeekCF.concat(settings.weekCF)
          }
          unsolvedMergeWeekCF = unsolvedMergeWeekCF.concat(unsolvedDaily)
          if (toBeFetchedProblemSetCount > 1) {
            const newWeekCF = problemBatch.slice(1)
            unsolvedMergeWeekCF = unsolvedMergeWeekCF.concat(newWeekCF)
          }
          chrome.storage.sync.set({ weekCF: unsolvedMergeWeekCF })
          chrome.storage.sync.set({ dailyCF: newDailyCF })
        } else {
          chrome.storage.sync.set({ dailyCF: newDailyCF })
          unsolvedMergeWeekCF = unsolvedMergeWeekCF.concat(unsolvedDaily)
          if (toBeFetchedProblemSetCount > 1) {
            const newWeekCF = problemBatch.slice(1)
            unsolvedMergeWeekCF = unsolvedMergeWeekCF.concat(newWeekCF)
          }
          chrome.storage.sync.set({ weekCF: unsolvedMergeWeekCF })
        }
      } else {
        // method is not set
        // make user go to setting page
        console.log('Not logged into Codeforces')
      }
    }
  )

  chrome.storage.sync.set({ lastFetchedProblemsDate: currentDate.toString() })
}

export default problemDataExtractor
