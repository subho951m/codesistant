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

const theme = createTheme({
  typography: {
    fontSize: 12,
  },
})

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

function createData(name: string, tag: string, isSolved: string, id: number) {
  return { name, tag, isSolved, id }
}

const rows = [
  createData('A - Dry String', 'Implementation ', 'false', 1),
  createData('B - N Queens', 'dp', 'true', 2),
  createData('C - Permutation Numbers', 'Combinatorics', 'false', 3),
  createData('D - Permutation Numbers', 'Combinatorics', 'false', 4),
  createData('E - Permutation Numbers', 'Combinatorics', 'false', 5),
  createData('F - Permutation Numbers', 'Combinatorics', 'false', 6),
  createData('G - Permutation Numbers', 'Combinatorics', 'false', 7),
  createData('H - Permutation Numbers', 'Combinatorics', 'false', 8),
  createData('I - Permutation Numbers', 'Combinatorics', 'false', 9),
  createData('J - Permutation Numbers', 'Combinatorics', 'false', 10),
  createData('K - Permutation Numbers', 'Combinatorics', 'false', 11),
  createData('L - Permutation Numbers', 'Combinatorics', 'false', 12),
  createData('M - Permutation Numbers', 'Combinatorics', 'false', 13),
  createData('N - Permutation Numbers', 'Combinatorics', 'false', 14),
]

export default function CustomizedTables() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Problem</StyledTableCell>
              <StyledTableCell>Tag</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.tag}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.isSolved}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ThemeProvider theme={theme}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </ThemeProvider>
    </Paper>
  )
}
