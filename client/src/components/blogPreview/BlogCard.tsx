import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
    }
}

const convertDataUrlToBlob = (dataUrl: any) : Blob => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], {type: mime});
}

const BlogCard = (props: BlogType) => {
    const data = props.data

    const [author, content, date, image, instagram, tags, title, twitter, id] = [data.author, data.content, data.date, data.image, data.instagram, data.tags, data.title, data.twitter, data._id]

    const navigate = useNavigate()
    
  return (
    <div style={{ marginBottom: "2%", marginLeft: "0" }}>
        <Card sx={{ maxWidth: 600, minWidth: 320 }} onClick={() => navigate("/blog/" + id)}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                id='imageContainer'
                src={image}
                alt="image"
                />
                <div id='imageContainer'></div>
                <CardContent style={{ paddingBottom: "2%", paddingTop: "2%" }}>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {content.substring(0,50) + "..."}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ paddingTop: "1%" }}>
                    {"by " + author}
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </div>
  )
}

export default BlogCard