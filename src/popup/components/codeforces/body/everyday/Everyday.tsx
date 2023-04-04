import React, { useContext } from 'react'
import '@fontsource/roboto'
import './Everyday.css'
import Chart from '../../../customComponents/chart/Chart'
import { ProblemsetContext, UserStatusContext } from '../../Codeforces'
import Tables from '../../../customComponents/tables/Tables'

const EveryDay = () => {
  // everytime you add or delete item to favourite
  // set chrome storage but manage to pass props through react logic
  // It is so because if everytime you get chrome storage and display favouriteCF, it will be very costly

  console.log('EveryDay is rendered')
  const { contextProblemsCF, setContextProblemsCF } =
    useContext(ProblemsetContext)

  const daily = contextProblemsCF.dailyCF
  console.log('Daily .....', daily)
  const solved = contextProblemsCF.solvedCF
  const favourite = contextProblemsCF.favouriteCF
  console.log('Favourite after re-render', favourite)
  const data = []
  for (let i = 0; i < daily.length; i++) {
    let obj = {
      problem: {
        name: daily[i].problem.name,
        contestId: daily[i].problem.contestId,
        index: daily[i].problem.index,
      },
      tags: daily[i].fetchTag.tags,
      isSolved: false,
      isFavourite: false,
    }
    let solveFlag = false
    for (let j = 0; j < solved.length; j++) {
      if (
        solved[j].name === daily[i].problem.name &&
        solved[j].contestId === daily[i].problem.contestId &&
        solved[j].index === daily[i].problem.index
      ) {
        solveFlag = true
      }
    }
    let favouriteFlag = false
    for (let k = 0; k < favourite.length; k++) {
      if (
        favourite[k].problem.name === daily[i].problem.name &&
        favourite[k].problem.contestId === daily[i].problem.contestId &&
        favourite[k].problem.index === daily[i].problem.index
      ) {
        favouriteFlag = true
      }
    }
    obj = { ...obj, isSolved: solveFlag, isFavourite: favouriteFlag }
    data.push(obj)
  }

  const contextStatusCF = useContext(UserStatusContext)
  // const handleClick = useCallback(() => {}, [])
  return (
    <div className="everyday">
      <div className="codeforces-everyday-tasks">
        <Tables
          useFor="Everyday"
          tableSize={3}
          data={data}
          showData={['name', 'tag', 'isSolved', 'isFavourite']}
          heading="Problems of the Day"
          contextProblemsCF={contextProblemsCF}
          setContextProblemsCF={setContextProblemsCF}
        />
        {/* <button onClick={handleClick}>click</button> */}
        {contextProblemsCF.isError ? contextProblemsCF.errorMessage : null}
      </div>
      <div className="codeforces-chart">
        <Chart data={contextStatusCF.userStatus} />
      </div>
      {contextStatusCF.isError ? contextStatusCF.errorMessage : null}
    </div>
  )
}

export default React.memo(EveryDay)
