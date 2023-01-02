import Box from '@mui/material/Box';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Typography } from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const NoBlogsComponent = () => {
  return (
    <Box sx={{ width: "100%", display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "8%", marginBottom: "15%" }}>
        <Typography variant='h5' style={{ marginTop: "2%" }}>No Blogs Found <SentimentVeryDissatisfiedIcon /> </Typography>
        <Box sx={{ width: "100%", display: 'flex', justifyContent: "center" }}>
            <SearchOffIcon fontSize='large' />
        </Box>
    </Box>
  )
}

export default NoBlogsComponent