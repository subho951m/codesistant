import contextUserStatus from './contextUserStatus'

const statusDataExtractor = (
  data,
  setContextStatusCF,
  setShouldDisplayData
) => {
  // set of distinct solved problems
  const solvedProblemsCF = new Set()
  for (let i = 0; i < data.length; i++) {
    if (data[i].verdict === 'OK') {
      const obj = {
        name: data[i].problem.name,
        contestId: data[i].problem.contestId,
        index: data[i].problem.index,
      }
      if ('rating' in data[i].problem) {
        obj['rating'] = data[i].problem.rating
      }
      solvedProblemsCF.add(JSON.stringify(obj))
    }
  }

  chrome.storage.sync.set(
    { solvedCF: Array.from(solvedProblemsCF) },
    function () {
      contextUserStatus(setContextStatusCF, setShouldDisplayData)
      console.log('Status Data Extractor solvedProblemsCF', solvedProblemsCF)
    }
  )
}

export default statusDataExtractor
