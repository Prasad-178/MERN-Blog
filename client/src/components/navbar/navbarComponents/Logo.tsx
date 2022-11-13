import { useState } from "react"
import { Typography } from "@material-ui/core"
import { Grid } from "@mui/material"
import PagesIcon from '@mui/icons-material/Pages';
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
    <Grid item xs={1} sx={logoStyle} onMouseEnter={() => sethover(true)}>
        <Typography>
          <PagesIcon /> 
        </Typography>
    </Grid>
  )
}

export default Logo