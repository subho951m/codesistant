import React from 'react'
import '@fontsource/roboto'
import './Pending.css'
import Tables from '../../../../customComponents/tables/Tables'
import data from '../../../../../data'

const Pending = () => {
  return (
    <div className="pending">
      <Tables
        tableSize={2}
        data={data}
        showData={['name', 'tag', 'isFavourite']}
        heading="Week's Pending"
      />
    </div>
  )
}

export default Pending
