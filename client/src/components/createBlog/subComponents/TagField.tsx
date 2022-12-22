import { InputAdornment } from '@material-ui/core'
import TextField from '@mui/material/TextField'
import SellIcon from '@mui/icons-material/Sell';
import IconButton from '@mui/material/IconButton';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

type TagFieldType = {
    handleChangeTagField: any
    addTag: any
}

const TagField = (props: TagFieldType) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
        <TextField 
            type={'text'}
            required
            name="Tags"
            onChange={props.handleChangeTagField}
            placeholder="Tag"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SellIcon />
                    </InputAdornment>
                )
            }}
        />
        <IconButton aria-label="delete" color='success' size='large' onClick={props.addTag}>
            <AddCircleRoundedIcon />
        </IconButton>
    </div>
  )
}

export default TagField