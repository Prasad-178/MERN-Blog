import { useState } from "react"
import { Typography } from "@material-ui/core"
import { Grid } from "@mui/material"
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate } from "react-router-dom";

const logoStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}

const Logo = () => {
  
  const [hover, sethover] = useState(false)
  const navigate = useNavigate()

  return (
    <Grid item xs={1} sx={logoStyle} style={hover ? {cursor: 'pointer'} : {cursor: 'none'} } onClick={() => navigate('/')} onMouseEnter={() => sethover(true)}>
        <Typography>
          <StoreIcon /> 
        </Typography>
    </Grid>
  )
}

export default Logo