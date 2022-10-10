import { Typography } from "@material-ui/core"
import { Grid } from "@mui/material"
import StoreIcon from '@mui/icons-material/Store';

const Logo = () => {
  return (
    <Grid item xs={1}>
        <Typography>
          <StoreIcon /> 
        </Typography>
    </Grid>
  )
}

export default Logo