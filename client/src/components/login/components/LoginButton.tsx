import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const LoginButton = () => {
  return (
    <Button 
        variant='contained'
        color='success'
        type='submit'
        value='LoginButton'
    >
        <Typography variant='h6'>LOGIN</Typography>
    </Button>
  )
}

export default LoginButton

