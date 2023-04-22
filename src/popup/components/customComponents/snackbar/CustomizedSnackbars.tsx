import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

type CustomizedSnackbarsProps = {
  message: string
}

export default function CustomizedSnackbars(props: CustomizedSnackbarsProps) {
  const [open, setOpen] = React.useState(true)

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={props.message}
        action={action}
        sx={{
          width: 250,
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#e95f1d',
            color: 'white',
          },
        }}
      />
    </div>
  )
}
