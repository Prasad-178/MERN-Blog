import { InputAdornment } from '@material-ui/core'
import TextField from '@mui/material/TextField'
import EmailIcon from '@mui/icons-material/Email';

type EmailFieldType = {
    handleChangeEmail: any
}

const EmailField = (props: EmailFieldType) => {
  return (
    <TextField 
        type={'email'}
        required
        name='email'
        onChange={props.handleChangeEmail}
        placeholder={"Email"}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <EmailIcon />
                </InputAdornment>
            )
        }}
    />
  )
}

export default EmailField