import React from 'react'
import '@fontsource/roboto'
import './Everyday.css'
import Chart from '../../../customComponents/chart/Chart'
import Tables from '../../../customComponents/tables/Tables'
import data from '../../../../data'

const EveryDay = () => {
  return (
    <div className="everyday">
      <div className="codeforces-everyday-tasks">
        <Tables
          tableSize={3}
          data={data}
          showData={['name', 'tag', 'isSolved', 'isFavourite']}
          heading="Problems of the Day"
        />
      </div>
      <div className="codeforces-chart">
        <Chart />
      </div>
    </div>
  )
}

export default EveryDay
