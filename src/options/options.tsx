import React, { useState, useEffect } from 'react'
import './options.css'
import { Table } from './components/table/Table'
import MyModal from './components/modal/MyModal'
import Button from '@mui/material/Button'
import getTableDataFromStorage from './components/data/getTableDataFromStorage'
import handleDataSubmit from './components/data/handleDataSubmit'

function Options() {
  const [isGettingStorage, setIsGettingStorage] = useState(true)
  const [closeThisTab, setCloseThisTab] = useState(false)
  const [open, setOpen] = React.useState(false)
  const [rows, setRows] = useState([])
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
    handleDataSubmit(rows, setCloseThisTab)
  }

  useEffect(() => {
    chrome.storage.sync.get('methodCF', function (CF) {
      if (CF.methodCF) {
        getTableDataFromStorage(setRows, CF.methodCF, setIsGettingStorage)
      }
    })
  }, [])

  return (
    <div className="App">
      {isGettingStorage ? (
        <div className="loading">Loading...Storage...</div>
      ) : closeThisTab ? (
        <div className="Loading">Loading...Closing..</div>
      ) : (
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
      )}
    </div>
  )
}

export default Options
