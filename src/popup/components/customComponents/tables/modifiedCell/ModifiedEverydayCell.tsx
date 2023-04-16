import * as React from 'react'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import SolvedButton from '../../buttons/solved/SolvedButton'
import UnsolvedButton from '../../buttons/unsolved/UnsolvedButton'
import Button from '@mui/material/Button'
import { v4 as uuid } from 'uuid'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ToggleButton from '@mui/material/ToggleButton'

const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ selected }) => ({
  backgroundColor: selected ? 'rgb(190 237 200)' : '#fff',
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

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

const TableDataWrapper = ({ condition, children }) => {
  return condition ? (
    <StyledTableRow selected>{children}</StyledTableRow>
  ) : (
    <StyledTableRow>{children}</StyledTableRow>
  )
}

const ModifiedEverydayCell = ({
  isSolved,
  problem,
  tags,
  isFavourite,
  contextProblemsCF,
  setContextProblemsCF,
}) => {
  const [toggle, setToggle] = React.useState(isFavourite)

  const handleChange = React.useCallback(() => {
    //console.log('Handle change from ModifiedEverydayCell', problem)
    let newFavouriteCFArray = []
    //console.log(
    //   'ContextCF favouriteCF from ModifiedEverydayCell',
    //   contextProblemsCF.favouriteCF
    // )
    if (toggle) {
      // remove from favourite list
      newFavouriteCFArray = contextProblemsCF.favouriteCF.filter(
        (element) =>
          !(
            element.problem.name === problem.name &&
            element.problem.contestId === problem.contestId &&
            element.problem.index === problem.index
          )
      )
    } else {
      // add in favourite list
      newFavouriteCFArray = newFavouriteCFArray.concat(
        contextProblemsCF.favouriteCF
      )
      const problemObj = {
        name: problem.name,
        contestId: problem.contestId,
        index: problem.index,
      }
      newFavouriteCFArray.push({
        problem: problemObj,
        tags: tags,
      })
    }
    chrome.storage.local.set({ favouriteCF: newFavouriteCFArray }, function () {
      setContextProblemsCF((element) => ({
        ...element,
        favouriteCF: newFavouriteCFArray,
      }))
      //console.log('Problem from ModifiedEverydayCell', problem)
      //console.log(
      //   'Favourite list from ModifiedEverydayCell',
      //   contextProblemsCF.favouriteCF
      // )
      setToggle((toggle) => !toggle)
    })
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

  //console.log('Modified Table data called from ModifiedEverydayCell')

  return (
    <TableDataWrapper condition={isSolved} key={uuid()}>
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
        {isSolved ? (
          <SolvedButton />
        ) : (
          <UnsolvedButton problemLink={getProblemLink(problem)} />
        )}
      </StyledTableCell>
      <StyledTableCell align="right">
        <ToggleButton value="check" selected={toggle} onChange={handleChange}>
          {toggle ? (
            <FavoriteIcon style={{ color: 'red' }} />
          ) : (
            <FavoriteBorderOutlinedIcon style={{ color: 'black' }} />
          )}
        </ToggleButton>
      </StyledTableCell>
    </TableDataWrapper>
  )
}

export default React.memo(ModifiedEverydayCell)
