const statusDataExtractor = (userStatusCF) => {
  //   const filteredProblems = data.result.filter(
  //     (problem) => problem.verdict === 'OK'
  //   )
  //   const totalSolved = filteredProblems.length
  //   const inf = 900000
  //   let heighestRatingSolved = -inf
  //   const solvedProblemsMap = new Map()
  //   for (let i = 0; i < filteredProblems.length; i++) {
  //     heighestRatingSolved = Math.max(
  //       heighestRatingSolved,
  //       filteredProblems[i].problem.rating
  //     )
  //     if (solvedProblemsMap.has(filteredProblems[i].problem.rating)) {
  //       solvedProblemsMap.set(
  //         filteredProblems[i].problem.rating,
  //         solvedProblemsMap.get(filteredProblems[i].problem.rating) + 1
  //       )
  //     } else {
  //       solvedProblemsMap.set(filteredProblems[i].problem.rating, 1)
  //     }
  //   }
  //   const userStatus = []
  //   if (heighestRatingSolved !== -inf) {
  //     for (let i = 800; i <= heighestRatingSolved; i = i + 100) {
  //       userStatus.push({
  //         rating: i,
  //         solved: solvedProblemsMap.has(i) ? solvedProblemsMap.get(i) : 0,
  //       })
  //     }
  //   }
  //   // The logic for finding total solved is wrong
  //   return { userStatus, totalSolved }
  console.log(userStatusCF)
}

export default statusDataExtractor
