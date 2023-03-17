import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TablePagination from '@mui/material/TablePagination'

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

function createData(name: string, tag: string, isSolved: string) {
  return { name, tag, isSolved }
}

const rows = [
  createData(
    'A - Dry String F#knl fwejwjfg wefjopwjfg wefjhfgjwwfg fwjhwefg wfnfwenf wsfnwfegnwe fwfnkiwf wfwnkewfn wfnwfkwf f bn',
    'Implementation svnlsvn svgnwerkgv wknvw  vksv evklnelgvn  svfnv ',
    'false'
  ),
  createData('A - N Queens', 'dp', 'true'),
  createData('C - Permutation Numbers', 'Combinatorics', 'false'),
  createData('C - Permutation Numbers', 'Combinatorics', 'false'),
  createData('C - Permutation Numbers', 'Combinatorics', 'false'),
  createData('C - Permutation Numbers', 'Combinatorics', 'false'),
  createData('C - Permutation Numbers', 'Combinatorics', 'false'),
  createData('C - Permutation Numbers', 'Combinatorics', 'false'),
  createData('C - Permutation Numbers', 'Combinatorics', 'false'),
  createData('C - Permutation Numbers', 'Combinatorics', 'false'),
  createData('C - Permutation Numbers', 'Combinatorics', 'false'),
  createData('C - Permutation Numbers', 'Combinatorics', 'false'),
  createData('C - Permutation Numbers', 'Combinatorics', 'false'),
  createData('C - Permutation Numbers', 'Combinatorics', 'false'),
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
                <StyledTableRow key={row.name}>
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
