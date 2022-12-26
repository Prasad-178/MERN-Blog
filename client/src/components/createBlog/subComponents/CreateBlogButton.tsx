import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CreateBlogButton = () => {
  return (
    <Button 
        variant='contained'
        color='success'
        type='submit'
        value='CreateBlog'
        sx={{
          marginBottom: "5%"
        }}
    >
        <Typography variant='h6'>CREATE BLOG</Typography>
    </Button>
  )
}

export default CreateBlogButton

