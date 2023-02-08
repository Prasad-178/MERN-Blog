import { Typography } from '@material-ui/core'
import PagesIcon from '@mui/icons-material/Pages';
import { useMediaQuery, useTheme } from "@mui/material"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from '@mui/material/Link'

const Footer = () => {

  const theme = useTheme()

  const FourteenTen = useMediaQuery(theme.breakpoints.down(1410))
  const Thousand = useMediaQuery(theme.breakpoints.down(1000))
  const FourEighty = useMediaQuery(theme.breakpoints.down(480))
  const SixTwenty = useMediaQuery(theme.breakpoints.down(620))
  const FiveTwenty = useMediaQuery(theme.breakpoints.down(520))
  const FiveForty = useMediaQuery(theme.breakpoints.down(540))

  return (
    // <div style={{ height: "100px", width: SixTwenty ? (FiveForty ? (FiveTwenty ? (FourEighty ? "160%" : "145%") : "135%") : "120%") : "100%", display: "flex", flexDirection: "row", backgroundColor: "#3f51b5", left: 0, bottom: 0, right: 0, alignItems: "center", justifyContent: "space-evenly" }}>
    <div style={{ height: "100px", width: "100%", display: "flex", flexDirection: "row", backgroundColor: "#3f51b5", left: 0, bottom: 0, right: 0, alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h5" style={{ color: "white" }}>BLOGIFY <PagesIcon /> </Typography>
        <div style={{ marginLeft: "5%", textAlign: "center" }}>
          <Typography variant='body1' style={{ color: "white" }}> SOCIALS </Typography>
          <div style={{ display: "flex", flexDirection: "row", marginLeft: "10%" }}>
            <Link href="https://github.com/Prasad-178" target={'_blank'}> <Typography variant="body2" style={{ color: "white" }}> <GitHubIcon /> </Typography> </Link>
            <Link href="https://www.linkedin.com/in/prasad-sankar-370362223/" target="_blank"> <Typography variant="body2" style={{ color: "white", marginLeft: "15%" }}> <LinkedInIcon /> </Typography> </Link>
          </div>
        </div>
    </div>
  )
}

export default Footer