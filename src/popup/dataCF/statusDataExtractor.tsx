import contextUserStatus from './contextUserStatus'

const statusDataExtractor = (
  data,
  setContextStatusCF,
  setShouldDisplayData
) => {
  // set of distinct solved problems
  const solvedProblemsCF = new Set()
  const solvedProblemsCFArray = []
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
      const problemJSON = JSON.stringify(obj)
      if (!solvedProblemsCF.has(problemJSON)) {
        solvedProblemsCF.add(JSON.stringify(obj))
        solvedProblemsCFArray.push(obj)
      }
    }
  }

  chrome.storage.local.set({ solvedCF: solvedProblemsCFArray }, function () {
    contextUserStatus(setContextStatusCF, setShouldDisplayData)
    // console.log('Status Data Extractor solvedProblemsCF', solvedProblemsCFArray)
  })
}

export default statusDataExtractor
