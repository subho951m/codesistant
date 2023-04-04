import React, { useContext } from 'react'
import '@fontsource/roboto'
import './Favourite.css'
// import Tables from '../../../../customComponents/tables/Tables'
// import data from '../../../../../data'
import { ProblemsetContext } from '../../Codeforces'
import Tables from '../../../customComponents/tables/Tables'

const Favourite = () => {
  console.log('Favorite is rendered')
  const { contextProblemsCF, setContextProblemsCF } =
    useContext(ProblemsetContext)
  return (
    <div className="favourite">
      <Tables
        useFor="Favourite"
        tableSize={3}
        data={contextProblemsCF.favouriteCF}
        showData={['name', 'tag', 'delete']}
        heading="Favourite Problems"
        contextProblemsCF={contextProblemsCF}
        setContextProblemsCF={setContextProblemsCF}
      />
    </div>
  )
}

export default React.memo(Favourite)
