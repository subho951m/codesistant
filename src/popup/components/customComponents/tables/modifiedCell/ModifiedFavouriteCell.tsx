/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import { v4 as uuid } from 'uuid'
import DeleteIcon from '@mui/icons-material/Delete'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#973c5e',
    color: theme.palette.common.white,
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
  },
}))

const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ selected }) => ({
  backgroundColor: selected ? 'rgb(190 237 200)' : '#fff',
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const ModifiedFavouriteCell = ({
  problem,
  tags,
  contextProblemsCF,
  setContextProblemsCF,
  setPage,
  rowsPerPage,
  dataLength,
}) => {
  const handleChange = React.useCallback(() => {
    //console.log('Handle change', problem)
    let newFavouriteCFArray = []
    //console.log('COntextCF favouriteCF ', contextProblemsCF.favouriteCF)
    // remove from favourite list
    newFavouriteCFArray = contextProblemsCF.favouriteCF.filter(
      (element) =>
        !(
          element.problem.name === problem.name &&
          element.problem.contestId === problem.contestId &&
          element.problem.index === problem.index
        )
    )

    chrome.storage.sync.set({ favouriteCF: newFavouriteCFArray }, function () {
      setContextProblemsCF((element) => ({
        ...element,
        favouriteCF: newFavouriteCFArray,
      }))
      //console.log('Problem deleted', problem)
      //console.log('Favourite list', contextProblemsCF.favouriteCF)
    })

    setPage((page) =>
      page * rowsPerPage + 1 == dataLength && page > 0 ? page - 1 : page
    )
  }, [])

  const getTags = (element) => {
    const arr = []
    arr.push(`${element.ratingFrom}-${element.ratingTo}`)
    if (element.tags.length === 0) {
      arr.push('ANY-TAGS')
    } else {
      for (let i = 0; i < element.tags.length; i++) {
        arr.push(element.tags[i])
      }
    }
    return arr.toString()
  }

  const getProblemLink = (problem) => {
    return `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`
  }

  //console.log('Modified Table data called')

  return (
    <StyledTableRow key={uuid()}>
      <StyledTableCell component="th" scope="row">
        <Button
          sx={{ fontSize: '11px', padding: 0, margin: 0 }}
          onClick={() => {
            chrome.tabs.create({
              url: getProblemLink(problem),
              active: false,
            })
          }}
        >
          {problem.name}
        </Button>
      </StyledTableCell>
      <StyledTableCell align="center">{getTags(tags)}</StyledTableCell>
      <StyledTableCell align="right">
        <Button onClick={handleChange}>
          <DeleteIcon />
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default React.memo(ModifiedFavouriteCell)
