import { InputAdornment } from '@material-ui/core'
import TextField from '@mui/material/TextField'
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

type PasswordFieldType = {
    handleChangePassword: any
    placeholder: string
}

const PasswordField = (props: PasswordFieldType) => {

    const [password, setShowPassword] = useState<boolean>(false)
    const handleClickShowPassword = () => setShowPassword(!password)
    const handleMouseDownPassword = () => setShowPassword(!password)

  return (
    <TextField 
        type={password ? "text" : "password"}
        required
        name='password'
        onChange={props.handleChangePassword}
        placeholder={props.placeholder}
        InputProps={{
            required: false,
            startAdornment: (
                <InputAdornment position="start">
                    <LockIcon />
                </InputAdornment>
            ),
            endAdornment: (
                <InputAdornment style={{ cursor: "pointer" }} position="end" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                    { password ? <Visibility /> : <VisibilityOffIcon /> }
                </InputAdornment>
            )
        }}
    />
  )
}

export default PasswordField