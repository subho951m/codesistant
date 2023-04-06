import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'

import './Table.css'

export const Table = ({ rows, deleteRow, editRow }) => {
  const problemTags = (tags) => {
    const tagsArray = []
    for (let i = 0; i < tags.length; i++) {
      tagsArray.push(tags[i].value)
    }
    return tagsArray.toString()
  }
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Difficulty From</th>
            <th>Difficulty To</th>
            <th className="expand" align="center">
              Problem Tags
            </th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{row.ratingFrom}</td>
                <td>{row.ratingTo}</td>
                <td className="expand" align="center">
                  {row.tags.length !== 0 ? problemTags(row.tags) : 'ANY-TAGS'}
                </td>
                <td className="fit">
                  <span className="actions">
                    <DeleteIcon
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    />
                    <ModeEditIcon
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
