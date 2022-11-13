import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const VerifyEmailButton = () => {
  return (
    <Button 
        variant='contained'
        color='success'
        type='submit'
        value='LoginButton'
    >
        <Typography variant='h6'>VERIFY EMAIL</Typography>
    </Button>
  )
}

export default VerifyEmailButton

