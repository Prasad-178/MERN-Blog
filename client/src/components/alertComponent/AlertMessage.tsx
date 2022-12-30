import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

type AlertProps = {
    onClose: any
    booleanDisplay: boolean
    message: string
}

export default function ActionAlerts(props: AlertProps) {
  return (
    <Stack sx={props.booleanDisplay ? { width: '100%', backgroundColor: "#aebce6" } : {display: "none"}} spacing={2}>
      <Alert variant="outlined" severity="error" onClose={props.onClose} style={{ backgroundColor: "#aebce6" }}>
        <Typography variant='body2' style={{ backgroundColor: "#aebce6" }}>{props.message}</Typography>
      </Alert>
    </Stack>
  );
}