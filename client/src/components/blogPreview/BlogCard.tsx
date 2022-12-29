import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type BlogType = {
    data: {
        author: string
        content: string
        date: Date
        image: string
        instagram: string
        tags: Array<string>
        title: string
        twitter: string
        __v: number
        _id: string
    },
    deleteBlog: any
}

const BlogCard = (props: BlogType) => {
    const data = props.data
    const currentLocation = useLocation().pathname

    const [author, content, date, image, instagram, tags, title, twitter, id] = [data.author, data.content, data.date, data.image, data.instagram, data.tags, data.title, data.twitter, data._id]
    const [location, setLocation] = useState<string>("")

    useEffect(() => {
        setLocation(currentLocation)
    }, [])

    const navigate = useNavigate()

    const capitalize = (str: string): string => {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
    }
    
  return (
    <div style={{ marginBottom: "2%", marginLeft: "0", display: "flex", flexDirection: "column", width: "320px", height: "290px" }}>
        <Card sx={{ width: 320 }} onClick={() => navigate("/blog/" + id)} raised>
            <CardActionArea>
                <CardMedia
                component="img"
                width="320"
                height="180"
                id='imageContainer'
                src={image}
                alt="image"
                sx={{ 
                    maxWidth: "320px",
                    maxHeight: "180px"
                }}
                />
                <div id='imageContainer'></div>
                <CardContent style={{ paddingBottom: "2%", paddingTop: "2%" }}>
                <Typography gutterBottom variant="h5" component="div">
                    {title.length < 18 ? capitalize(title).substring(0,18) : capitalize(title).substring(0,20) + "..."}
                </Typography>
                <Typography alignSelf={"flex-end"} gutterBottom variant="body2" color="text.secondary" style={{ paddingTop: "1%" }}>
                    {"by " + author}
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        {location === '/myposts' ? 
        <div style={{ display: "flex", alignSelf: "center", justifySelf: "center", flexDirection: "row" }}>
            <IconButton style={{ marginBottom: "3.75%", marginLeft: "0.5%" }} aria-label="delete" color='error' size='large' onClick={() => navigate('/editpost/' + props.data._id)}>
                <EditIcon style={{ color: "white", backgroundColor: "green", padding: "15%", borderRadius: "60%" }} />
            </IconButton>
            <IconButton style={{ marginBottom: "3.75%", marginLeft: "0.5%" }} aria-label="delete" color='error' size='large' onClick={() => props.deleteBlog(props.data._id)}>
                <DeleteIcon style={{ color: "white", backgroundColor: "blue", padding: "15%", borderRadius: "60%" }} />
            </IconButton>
        </div>
        :
        null
        }

    </div>
  )
}

export default BlogCard