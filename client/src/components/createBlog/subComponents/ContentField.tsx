import { InputAdornment } from '@material-ui/core'
import TextField from '@mui/material/TextField'
import ArticleIcon from '@mui/icons-material/Article';

type ContentFieldType = {
    handleChangeContentField: any
}

const ContentField = (props: ContentFieldType) => {
  return (
    <TextField 
        type={'text'}
        required
        multiline
        name={"content"}
        onChange={props.handleChangeContentField}
        placeholder="Content"
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <ArticleIcon />
                </InputAdornment>
            )
        }}
    />
  )
}

export default ContentField