import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
    return (
        <TextField
            fullWidth
            id="input-with-icon-textfield"
            // maxlength
            style={{
                color: 'white',
                width: '100%',
                minWidth: '100%',
                cursor: "none",
                // hiding the search box, because it doesn't work yet :(
                visibility: 'hidden'
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon style={{ cursor: "pointer" }} />
                    </InputAdornment>
                ),
            }}
            variant="standard"
        />
    )
}

export default SearchBar