import React, { useState } from 'react'
import './options.css'
import { Table } from './components/Table'
import MyModal from './components/MyModal'
import Button from '@mui/material/Button'

function Options() {
  const [open, setOpen] = React.useState(false)
  const [rows, setRows] = useState([
    {
      ratingFrom: 1300,
      ratingTo: 1400,
      tags: [
        { value: 'dp', label: 'dp' },
        { value: 'implementation', label: 'implementation' },
      ],
    },
    {
      ratingFrom: 1500,
      ratingTo: 1600,
      tags: [
        { value: 'dp', label: 'dp' },
        { value: 'combinatorics', label: 'combinatorics' },
      ],
    },
    {
      ratingFrom: 1700,
      ratingTo: 1800,
      tags: [
        { value: 'maths', label: 'maths' },
        { value: 'implementation', label: 'implementation' },
      ],
    },
    { ratingFrom: 1900, ratingTo: 2000, tags: [] },
    { ratingFrom: 2100, ratingTo: 2200, tags: [] },
  ])
  const [rowToEdit, setRowToEdit] = useState(null)

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex))
  }

  const handleEditRow = (idx) => {
    setRowToEdit(idx)
    setOpen(true)
  }

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow

            return newRow
          })
        )
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setRowToEdit(null)
  }

  const handleOptionsSubmit = (e) => {
    e.preventDefault()
    const newMethodCF = []
    for (let i = 0; i < rows.length; i++) {
      const tagsArray = []
      for (let j = 0; j < rows[i].tags.length; j++) {
        tagsArray.push(rows[i].tags[j].value)
      }
      const obj = {
        ratingFrom: rows[i].ratingFrom,
        ratingTo: rows[i].ratingTo,
        tags: tagsArray,
      }
      newMethodCF.push(obj)
    }
    console.log(newMethodCF)
  }

  return (
    <div className="App">
      <form className="options-methodCF" onSubmit={handleOptionsSubmit}>
        <Table
          rows={rows}
          deleteRow={handleDeleteRow}
          editRow={handleEditRow}
        />

        <div className="options-button-grp">
          <Button onClick={handleOpen}>Add my Modal</Button>
          <Button type="submit">Save & Close</Button>
        </div>

        {open && (
          <MyModal
            open={open}
            handleClose={handleClose}
            onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null && rows[rowToEdit]}
          />
        )}
      </form>
    </div>
  )
}

export default Options
