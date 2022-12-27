import { InputAdornment } from '@material-ui/core'
import TextField from '@mui/material/TextField'
import EmailIcon from '@mui/icons-material/Email';

type BlogFieldType = {
    handleChangeBlogField: any
    placeholder: any
    icon: any
    nameOfField: any
    value: any
}

const BlogField = (props: BlogFieldType) => {
  return (
    <TextField 
        type={'text'}
        required
        value={props.value}
        name={props.nameOfField}
        onChange={props.handleChangeBlogField}
        placeholder={props.placeholder}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    {props.icon}
                </InputAdornment>
            )
        }}
    />
  )
}

export default BlogField