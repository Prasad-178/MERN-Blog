import { Typography } from '@material-ui/core'
import PagesIcon from '@mui/icons-material/Pages';

const Footer = () => {
  return (
    <div style={{ height: "100px", width: "100%", display: "flex", flexDirection: "row", backgroundColor: "#3f51b5", left: 0, bottom: 0, right: 0, alignItems: "center", justifyContent: "space-evenly" }}>
        <Typography variant="h5" style={{ color: "white" }}>BLOGIFY <PagesIcon /> </Typography>
        <Typography variant="h5" style={{ color: "white" }}>BLOGIFY <PagesIcon /> </Typography>
    </div>
  )
}

export default Footer