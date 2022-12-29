import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type ButtonPropsType = {
  buttonName: string
  value: string
}

const ReusableSubmitButton = (props: ButtonPropsType) => {
  return (
    <Button 
        variant='contained'
        color='success'
        type='submit'
        value={props.value}
    >
        <Typography variant='h6'>{props.buttonName}</Typography>
    </Button>
  )
}

export default ReusableSubmitButton