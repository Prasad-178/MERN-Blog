import Navbar from "../../components/navbar/Navbar"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import { Typography } from "@material-ui/core"
import background from "../../assets/images/homepage.jpg"
import BlogCard from "../../components/blogPreview/BlogCard"
import BlogLoading from "../../components/blogPreview/BlogLoading"
import Stack from '@mui/material/Stack';
import NoBlogsComponent from "../../components/blogPreview/NoBlogsComponent"

const Homepage = () => {

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

  const [blogs, setBlogs] = useState<Array<BlogType>>([])
  const [noBlogs, setNoBlogs] = useState<number>(0)

  useEffect(() => {
    getAllBlogs().then((res) => {
      setBlogs(res.blogs)
      if (res.blogs.length === 0) {
        setNoBlogs(1)
      }
    })
  }, [])

  
  const getAllBlogs = async () => {
    const res = await axios.get("http://localhost:5000/api/blogs/allblogs")

    return res.data
  }
  
  return (
    <div style={{ margin: "0px", padding: "0px", height: "80%", width: "100%" }}>
      <Navbar />
      <div style={{ height: "65px" }}></div>

      <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", display: "flex", height: "705px", alignItems: "center", marginBottom: "2%", justifyContent: "center" }}>
          <Typography variant={ "h3" } style={{ color: "blue", fontFamily: "sans-serif", fontWeight: 700 }}>BLOGIFY</Typography> 
      </div>
      
      <hr style={{ width: "90%", color: "black", height: "0.5px", marginRight: "2%", marginLeft: "2%", border: "2px solid black", background: "black" }} />
      {noBlogs === 1 ? <NoBlogsComponent />
      :
      blogs.length > 0 ?
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "2%" }}>
            <Typography variant="h5" style={{ marginBottom: "0%", fontWeight: 700 }}>Personalized Blogs For You</Typography>
            <Stack
              direction={"row"}   
              justifyContent={"space-between"}
              flexWrap={"wrap"}
              spacing={2}
              padding="5%"
              paddingTop={"2%"}
            >
              {blogs.map((item, id) => (
                  <BlogCard data={blogs[id]}></BlogCard>
              ))}
            </Stack>
        </div>
        :
        <BlogLoading loadingMessage="Loading Your Personalized Blogs..." />
      }
    </div>
  )
}

export default Homepage