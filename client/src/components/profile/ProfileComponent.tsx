import { Button, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BlogCard from '../blogPreview/BlogCard'
import BlogLoading from '../blogPreview/BlogLoading'
import NoBlogsComponent from '../blogPreview/NoBlogsComponent'

type BlogType = {
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

const ProfileComponent = () => {
    const author = useParams().id
    const navigate = useNavigate()

    const [blogs, setBlogs] = useState<Array<BlogType>>([])
    const [noBlogs, setNoBlogs] = useState<number>(0)

    const getBlogsOfUser = async () => {
        const res = await axios.get("http://localhost:5000/api/blogs/blogbyauthor/" + author)
        console.log(res.data)
        if (res.data.blogs.length === 0) {
            setNoBlogs(1)
        }
        else {
            setNoBlogs(0)
            setBlogs(res.data.blogs)
        }

    }

    useEffect(() => {
        getBlogsOfUser().then((res: any) => {
            console.log(res)
        })
    }, [])

  return (
    <>
        <div style={{ height: "60px" }}></div>
        {noBlogs === 1 ?
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "7%" }}>
          <div style={{ height: "200px" }}></div>
          <NoBlogsComponent />
        </div>
        :
        blogs.length > 0 ?
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "5%", marginBottom: "9%" }}>
            <Typography variant="h5" style={{ marginBottom: "0%", marginTop: "-2%", fontWeight: 700 }}>{author}</Typography>
            <Typography variant="h5" style={{ marginBottom: "0%", marginTop: "1%", fontWeight: 700 }}>Blogs Published:</Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"normal"}
              flexWrap={"wrap"}
              spacing={2}
              padding="2%"
              width={blogs.length === 1 ? "20%" : "45%"}
            >
              {blogs.map((item, id) => (
                  <BlogCard data={blogs[id]} deleteBlog={(id: string) => {}}></BlogCard>
              ))}
            </Stack>
        </div>
        :
        <>
            <div style={{ marginTop: "15%" }}></div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "5%" }}>
                <BlogLoading loadingMessage="Loading your Blogs..." />
                {/* <Button style={{ marginTop: "5%" }} variant="contained" color="success" onClick={() => navigate('/createblog')}>
                    <Typography variant="h6">Create Your Own Blog</Typography>
                </Button> */}
            </div>
        </>
        }
    </>
  )
}

export default ProfileComponent