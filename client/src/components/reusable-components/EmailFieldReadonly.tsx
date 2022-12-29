import { InputAdornment } from '@material-ui/core'
import TextField from '@mui/material/TextField'
import EmailIcon from '@mui/icons-material/Email';

type EmailFieldType = {
    handleChangeEmail: any
    value: string
}

const EmailFieldReadonly = (props: EmailFieldType) => {
  return (
    <TextField 
        type={'email'}
        value={props.value}
        required
        name='email'
        onChange={props.handleChangeEmail}
        placeholder={"Email"}
        InputProps={{
            readOnly: true,
            startAdornment: (
                <InputAdornment position="start">
                    <EmailIcon />
                </InputAdornment>
            )
        }}
    />
  )
}

export default EmailFieldReadonly