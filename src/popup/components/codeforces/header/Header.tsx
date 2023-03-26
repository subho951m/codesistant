import React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import '@fontsource/roboto'
import './Header.css'
import IMAGE from '../assets/codeforces.svg'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontSize: 11,
}))

type HeaderProps = {
  solved: number
}

const Header = (props: HeaderProps) => {
  // const [isHover, setIsHover] = useState(false)
  // const handleClick = () => {
  //   console.log('Profile Clicked')
  // }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={0.5}
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid item xs={2}>
          <img src={IMAGE} alt="LOGO" />
        </Grid>
        <Grid item xs={6.5}>
          <div
          // onMouseEnter={() => setIsHover(true)}
          // onMouseLeave={() => setIsHover(false)}
          >
            <Item>ABCDEFGHIJKLMNOPQRSTUVWX</Item>
          </div>
        </Grid>
        <Grid item xs={3.5}>
          <Item>Solved: {props.solved}</Item>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Header
