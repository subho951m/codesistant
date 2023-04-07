import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import LOGO from '../assets/codeforces.svg'
import '@fontsource/roboto'
import './Signin.css'
import handleCFCheck from './checks/handleCFCheck'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

const Signin = () => {
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [error, setError] = React.useState({
    isError: false,
    errorMessage: '',
  })
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const CFHandle = data.get('codeforcesHandle')
    //console.log(CFHandle)
    // implement a CFHandle check function
    handleCFCheck(CFHandle, setIsSuccess, setError)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={LOGO} alt="LOGO" width="100px" height="50px" />
        <Typography component="h1" variant="h5">
          Codeforces
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="codeforcesHandle"
            label="Handle/Email"
            name="codeforcesHandle"
            autoComplete="codeforcesHandle"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isSuccess ? <CircularProgress color="success" /> : 'Submit'}
          </Button>
          {error.isError ? (
            <Alert severity="error">{error.errorMessage}</Alert>
          ) : null}
        </Box>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 8, mb: 4 }}
      >
        {'Copyright © '}
        Codesistant 2023.
      </Typography>
    </Container>
  )
}

export default Signin
