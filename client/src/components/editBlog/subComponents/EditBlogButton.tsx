import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const EditBlogButton = () => {
  return (
    <Button 
        variant='contained'
        color='success'
        type='submit'
        value='EditBlog'
        sx={{
          marginBottom: "5%"
        }}
    >
        <Typography variant='h6'>EDIT BLOG</Typography>
    </Button>
  )
}

export default EditBlogButton

