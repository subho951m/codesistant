import * as React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

type PageNavigateProps = {
  handlePageChange: (
    event: React.MouseEvent<HTMLElement>,
    newTitle: string | null
  ) => void
  pageTitle: string
}

const PageNavigate = (props: PageNavigateProps) => {
  return (
    <ToggleButtonGroup
      value={props.pageTitle}
      exclusive
      onChange={props.handlePageChange}
      aria-label="text alignment"
    >
      <ToggleButton
        value="Everyday"
        aria-label="left aligned"
        sx={{ backgroundColor: 'white', height: '35px' }}
      >
        Everyday
      </ToggleButton>
      <ToggleButton
        value="Pending"
        aria-label="centered"
        sx={{ backgroundColor: 'white', height: '35px' }}
      >
        Pending
      </ToggleButton>
      <ToggleButton
        value="Favourite"
        aria-label="right aligned"
        sx={{ backgroundColor: 'white', height: '35px' }}
      >
        Favourite
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default PageNavigate
