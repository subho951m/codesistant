import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import './MyModal.css'
import Select from 'react-select'
import TextField from '@mui/material/TextField'
import tagsOptions from './data/TagsOptions'

const style = {
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const MyModal = ({ open, handleClose, onSubmit, defaultValue }) => {
  const [formState, setFormState] = React.useState(
    defaultValue || {
      ratingFrom: 800,
      ratingTo: 5000,
      tags: [],
    }
  )
  const [errors, setErrors] = React.useState('')

  const validateForm = () => {
    if (formState.ratingFrom && formState.ratingTo && formState.tags) {
      if (formState.ratingFrom > formState.ratingTo) {
        setErrors('Difficulty From should be less than Difficulty To')
        return false
      }
      if (formState.ratingFrom < 800) {
        setErrors('Minimum difficulty should be 800')
        return false
      }

      return true
    } else {
      const errorFields = []
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key)
        }
      }
      setErrors(errorFields.join(', '))
      return false
    }
  }

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value === '' ? '' : parseInt(e.target.value),
    })
  }

  const handleSelect = (element) => {
    setFormState({ ...formState, tags: element })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(formState)

    if (!validateForm()) return

    onSubmit(formState)

    handleClose()
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="modal">
              <form>
                <div className="form-group">
                  <label htmlFor="ratingFrom">Difficulty From :</label>
                  <TextField
                    required
                    name="ratingFrom"
                    id="ratingFrom"
                    label="Difficulty From"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    onChange={handleChange}
                    value={formState.ratingFrom}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ratingTo">Difficulty To :</label>
                  <TextField
                    required
                    name="ratingTo"
                    id="ratingTo"
                    label="Difficulty To"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    onChange={handleChange}
                    value={formState.ratingTo}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tags">Tags</label>
                  <Select
                    defaultValue={formState.tags}
                    isMulti
                    name="tags"
                    options={tagsOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleSelect}
                  />
                </div>
                {errors && (
                  <div className="error">{`Please include: ${errors}`}</div>
                )}
                <Button type="submit" className="btn" onClick={handleSubmit}>
                  Submit
                </Button>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default MyModal
