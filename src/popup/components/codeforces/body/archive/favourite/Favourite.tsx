import React from 'react'
import '@fontsource/roboto'
import './Favourite.css'
import Tables from '../../../../customComponents/tables/Tables'
import data from '../../../../../data'

const Favourite = () => {
  return (
    <div className="archive">
      <Tables tableSize={2} data={data} showData={['name', 'tag']} />
    </div>
  )
}

export default Favourite
