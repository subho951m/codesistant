import * as React from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TablePagination from '@mui/material/TablePagination'
import SolvedButton from '../buttons/solved/SolvedButton'
import UnsolvedButton from '../buttons/unsolved/UnsolvedButton'
import Button from '@mui/material/Button'
import { v4 as uuid } from 'uuid'
import './Tables.css'

const theme = createTheme({
  typography: {
    fontSize: 10,
  },
})

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

type TablesProps = {
  tableSize: number
  heading: string
  data: {
    name: string
    tag: string
    isSolved: boolean
    isFavourite: boolean
    id: number
  }[]
  showData: string[]
}

const Tables = (props: TablesProps) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(3)
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const tableHeight = (scale) => {
    switch (scale) {
      case 4:
        return 200
      case 3:
        return 170
      case 2:
        return 110
      case 1:
        return 70
      default:
        return 40
    }
  }

  return (
    <div className="my-table-codesistant">
      <div className="my-table-codesistant-heading">{props.heading}</div>
      <div className="my-table-codesistant-content">
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer
            sx={{
              height: tableHeight(props.tableSize),
              '&::-webkit-scrollbar': {
                width: '5px',
                height: '7px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(224, 224, 224, 1)',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgb(193 23 47 / 38%)',
                borderRadius: '3px',
                '&:hover': {
                  backgroundColor: 'rgb(13 15 86 / 54%)',
                },
              },
            }}
          >
            <Table size="small" aria-label="customized table">
              <TableHead>
                <TableRow>
                  {props.showData.length === 1 ? (
                    <StyledTableCell key={uuid()} align="center">
                      {props.showData[0]}
                    </StyledTableCell>
                  ) : (
                    [
                      <StyledTableCell key={uuid()} align="left">
                        {props.showData[0]}
                      </StyledTableCell>,
                      ,
                      ...props.showData.slice(1).map((element) => (
                        <StyledTableCell key={uuid()} align="right">
                          {element}
                        </StyledTableCell>
                      )),
                    ]
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.showData.includes('isSolved')
                  ? props.data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) =>
                        row.isSolved ? (
                          <StyledTableRow key={uuid()} selected>
                            <StyledTableCell component="th" scope="row">
                              <Button
                                sx={{ fontSize: '11px', padding: 0, margin: 0 }}
                              >
                                {row.name}
                              </Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {row.tag}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              <SolvedButton />
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              isFavourite
                            </StyledTableCell>
                          </StyledTableRow>
                        ) : (
                          <StyledTableRow key={uuid()}>
                            <StyledTableCell component="th" scope="row">
                              <Button
                                sx={{ fontSize: '11px', padding: 0, margin: 0 }}
                              >
                                {row.name}
                              </Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {row.tag}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              <UnsolvedButton />
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              isFavourite
                            </StyledTableCell>
                          </StyledTableRow>
                        )
                      )
                  : props.data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <StyledTableRow key={uuid()}>
                          <StyledTableCell component="th" scope="row">
                            <Button
                              sx={{ fontSize: '11px', padding: 0, margin: 0 }}
                            >
                              {row.name}
                            </Button>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.tag}
                          </StyledTableCell>
                          {props.showData.includes('isFavourite') ? (
                            <StyledTableCell align="right">
                              isFavourite
                            </StyledTableCell>
                          ) : null}
                        </StyledTableRow>
                      ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ThemeProvider theme={theme}>
            <TablePagination
              rowsPerPageOptions={[3, 6, 9]}
              component="div"
              count={props.data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </ThemeProvider>
        </Paper>
      </div>
    </div>
  )
}

export default Tables
