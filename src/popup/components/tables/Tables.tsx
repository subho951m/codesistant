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
import SolvedButton from '../codeforces/buttons/solved/SolvedButton'
import UnsolvedButton from '../codeforces/buttons/unsolved/UnsolvedButton'

import Button from '@mui/material/Button'

const theme = createTheme({
  typography: {
    fontSize: 12,
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

function createData(name: string, tag: string, isSolved: boolean, id: number) {
  return { name, tag, isSolved, id }
}

const rows = [
  createData('A - Dry String', 'Implementation ', false, 1),
  createData('B - N Queens', 'dp', true, 2),
  createData('C - Permutation Numbers', 'Combinatorics', false, 3),
  createData('D - Permutation Numbers', 'Combinatorics', false, 4),
  createData('E - Permutation Numbers', 'Combinatorics', false, 5),
  createData('F - Permutation Numbers', 'Combinatorics', false, 6),
  createData('G - Permutation Numbers', 'Combinatorics', false, 7),
  createData('H - Permutation Numbers', 'Combinatorics', false, 8),
  createData('I - Permutation Numbers', 'Combinatorics', false, 9),
  createData('J - Permutation Numbers', 'Combinatorics', false, 10),
  createData('K - Permutation Numbers', 'Combinatorics', false, 11),
  createData('L - Permutation Numbers', 'Combinatorics', false, 12),
  createData('M - Permutation Numbers', 'Combinatorics', false, 13),
  createData('N - Permutation Numbers', 'Combinatorics', false, 14),
]

export default function CustomizedTables() {
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
  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer
        sx={{
          height: 170,
          '&::-webkit-scrollbar': {
            width: '5px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(224, 224, 224, 1)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgb(193 23 47 / 38%)',
            borderRadius: '3px',
          },
        }}
      >
        <Table size="small" aria-label="customized table">
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
              .map((row) =>
                row.isSolved ? (
                  <StyledTableRow key={row.id} selected>
                    <StyledTableCell component="th" scope="row">
                      <Button sx={{ fontSize: '11px', padding: 0, margin: 0 }}>
                        {row.name}
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell>{row.tag}</StyledTableCell>
                    <StyledTableCell align="right">
                      <SolvedButton />
                    </StyledTableCell>
                  </StyledTableRow>
                ) : (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      <Button sx={{ fontSize: '11px', padding: 0, margin: 0 }}>
                        {row.name}
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell>{row.tag}</StyledTableCell>
                    <StyledTableCell align="right">
                      <UnsolvedButton />
                    </StyledTableCell>
                  </StyledTableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <ThemeProvider theme={theme}>
        <TablePagination
          rowsPerPageOptions={[3, 6, 9]}
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
