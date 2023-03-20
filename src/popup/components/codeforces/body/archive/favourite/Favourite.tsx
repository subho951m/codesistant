import React from 'react'
import '@fontsource/roboto'
import './Favourite.css'
import Tables from '../../../../customComponents/tables/Tables'
import data from '../../../../../data'

const Favourite = () => {
  return (
    <div className="favourite">
      <Tables
        tableSize={2}
        data={data}
        showData={['name', 'tag']}
        heading="Favourite Problems"
      />
    </div>
  )
}

export default Favourite
