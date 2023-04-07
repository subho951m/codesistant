import React, { useContext } from 'react'
import '@fontsource/roboto'
import './Pending.css'
import Tables from '../../../customComponents/tables/Tables'
import { ProblemsetContext } from '../../Codeforces'

const Pending = () => {
  //console.log('Pending is rendered')
  const { contextProblemsCF, setContextProblemsCF } =
    useContext(ProblemsetContext)

  const week = contextProblemsCF.weekCF
  //console.log('Week .....', week)
  const favourite = contextProblemsCF.favouriteCF
  //console.log('Favourite after re-render in Pending component', favourite)
  const data = []
  for (let i = 0; i < week.length; i++) {
    let obj = {
      problem: {
        name: week[i].problem.name,
        contestId: week[i].problem.contestId,
        index: week[i].problem.index,
      },
      tags: week[i].fetchTag,
      isFavourite: false,
    }
    let favouriteFlag = false
    for (let k = 0; k < favourite.length; k++) {
      if (
        favourite[k].problem.name === week[i].problem.name &&
        favourite[k].problem.contestId === week[i].problem.contestId &&
        favourite[k].problem.index === week[i].problem.index
      ) {
        favouriteFlag = true
      }
    }
    obj = { ...obj, isFavourite: favouriteFlag }
    data.push(obj)
  }
  return (
    <div className="pending">
      <Tables
        useFor="Pending"
        tableSize={3}
        data={data}
        showData={['NAME', 'TAG', 'FAVOURITE']}
        heading="Week's Pending"
        contextProblemsCF={contextProblemsCF}
        setContextProblemsCF={setContextProblemsCF}
      />
    </div>
  )
}

export default React.memo(Pending)
