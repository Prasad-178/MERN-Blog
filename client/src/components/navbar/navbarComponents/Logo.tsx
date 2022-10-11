import { Typography } from "@material-ui/core"
import { Grid } from "@mui/material"
import StoreIcon from '@mui/icons-material/Store';

const logoStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}

const Logo = () => {
  return (
    <Grid item xs={1} sx={logoStyle}>
        <Typography>
          <StoreIcon /> 
        </Typography>
    </Grid>
  )
}

export default Logo