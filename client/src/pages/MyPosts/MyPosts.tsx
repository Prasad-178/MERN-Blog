import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../../components/navbar/Navbar"
import { Typography } from "@material-ui/core"
import BlogCard from "../../components/blogPreview/BlogCard"
import BlogLoading from "../../components/blogPreview/BlogLoading"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../components/app/hooks"
import NoBlogsComponent from "../../components/blogPreview/NoBlogsComponent"

const MyPosts = () => {

    const User = useAppSelector((state) => state.user)
    console.log("User is : ", User)
    const email = User.data.email
    console.log("logged in email is : ", email)

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

  const navigate = useNavigate()
  const [blogs, setBlogs] = useState<Array<BlogType>>([])
  const [noBlogs, setNoBlogs] = useState<number>(0)

  useEffect(() => {
    getMyBlogs().then((res) => {
    //   setBlogs(res.blogs)
      console.log("response data is : ", res)
      setBlogs(res)
      if (res.length === 0) {
        setNoBlogs(1)
      }
    })
  }, [])
  
  const getMyBlogs = async () => {
    console.log("email before axios is : ", email)
    const res = await axios.post("http://localhost:5000/api/blogs/myblogs", {
        email: email
    })

    return res.data
  }

  return (
    <>
        <Navbar />
        <div style={{ height: '10%' }}></div>
        {noBlogs === 1 ?
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <div style={{ height: "200px" }}></div>
          <NoBlogsComponent />
          <Button style={{ marginTop: "5%" }} variant="contained" color="success" onClick={() => navigate('/createblog')}>
              <Typography variant="h6">Create Your Own Blog</Typography>
          </Button>
        </div>
        :
        blogs.length > 0 ?
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "5%" }}>
            <Typography variant="h5" style={{ marginBottom: "0%", marginTop: "1%", fontWeight: 700 }}>Your Blogs</Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              flexWrap={"wrap"}
              spacing={2}
              padding="2%"
            >
              {blogs.map((item, id) => (
                  <BlogCard data={blogs[id]}></BlogCard>
              ))}
              {/* <BlogCard data={blogs[0]}></BlogCard>
              <BlogCard data={blogs[0]}></BlogCard>
              <BlogCard data={blogs[0]}></BlogCard>
              <BlogCard data={blogs[0]}></BlogCard>
              <BlogCard data={blogs[0]}></BlogCard>
              <BlogCard data={blogs[0]}></BlogCard>
              <BlogCard data={blogs[0]}></BlogCard>
              <BlogCard data={blogs[0]}></BlogCard> */}
            </Stack>
            <Button variant="contained" color="success" onClick={() => navigate('/createblog')}>
                <Typography variant="h6">Create Your Own Blog</Typography>
            </Button>
        </div>
        :
        <>
            <div style={{ marginTop: "15%" }}></div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <BlogLoading loadingMessage="Loading your Blogs..." />
                <Button style={{ marginTop: "5%" }} variant="contained" color="success" onClick={() => navigate('/createblog')}>
                    <Typography variant="h6">Create Your Own Blog</Typography>
                </Button>
            </div>
        </>
      }
    </>
  )
}

export default MyPosts