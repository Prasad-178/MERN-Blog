import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@material-ui/core';

type LoadingPropsType = {
    loadingMessage: string
}

const BlogLoading = (props: LoadingPropsType) => {
  return (
    <Box sx={{ width: "100%", display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "7%" }}>
        <Typography variant={"h5"} style={{ marginBottom: "4%" }}>{props.loadingMessage}</Typography>
        <Box sx={{ width: "100%", display: 'flex', justifyContent: "center" }}>
            <CircularProgress />
        </Box>
    </Box>
  )
}

export default BlogLoading