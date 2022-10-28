import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const RegisterButton = () => {
  return (
    <Button 
        variant='contained'
        color='success'
        type='submit'
        value='RegisterButton'
        // onClick={(event) => event.preventDefault()}
    >
        <Typography variant='h6'>REGISTER</Typography>
    </Button>
  )
}

export default RegisterButton
