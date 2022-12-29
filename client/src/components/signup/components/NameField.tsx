import { InputAdornment } from '@material-ui/core'
import TextField from '@mui/material/TextField'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

type NameFieldType = {
    handleChangeName: any
    value: string
}

const NameField = (props: NameFieldType) => {
  return (
    <TextField 
        type={'text'}
        value={props.value}
        required
        name='name'
        onChange={props.handleChangeName}
        placeholder={"Name"}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <PersonRoundedIcon />
                </InputAdornment>
            )
        }}
    />
  )
}

export default NameField