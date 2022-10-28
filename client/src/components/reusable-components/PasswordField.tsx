import { InputAdornment } from '@material-ui/core'
import TextField from '@mui/material/TextField'
import LockIcon from '@mui/icons-material/Lock';

type PasswordFieldType = {
    handleChangePassword: any
}

const PasswordField = (props: PasswordFieldType) => {
  return (
    <TextField 
        type={'password'}
        required
        name='password'
        onChange={props.handleChangePassword}
        placeholder={"Password"}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <LockIcon />
                </InputAdornment>
            )
        }}
    />
  )
}

export default PasswordField