import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/navbar/Navbar'
import BlogLoading from '../components/blogPreview/BlogLoading'
import BlogCard from '../components/blogPreview/BlogCard'
import NoBlogsComponent from '../components/blogPreview/NoBlogsComponent'
import { Typography } from "@material-ui/core"
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import Footer from '../components/footer/Footer'

const AllPosts = () => {

    const navigate = useNavigate()

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
        getAllPosts().then((res) => {
          setBlogs(res.blogs)
          if (res.blogs.length === 0) {
            setNoBlogs(1)
          }
        })
      }, [])
    
      
    const getAllPosts = async () => {
    const res = await axios.get("http://localhost:5000/api/blogs/allposts")

    return res.data
    }

  return (
    <>
      <div style={{ height: "60px" }}></div>
      <div style={{ margin: "0px", padding: "0px", height: "80%", width: "100%", marginBottom: "4%" }}>
          <Navbar />
          {noBlogs === 1 ? <NoBlogsComponent />
          :
          blogs.length > 0 ?
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "2%" }}>
                  <Typography variant="h5" style={{ marginBottom: "0%", fontWeight: 700 }}>All Blogs</Typography>
                  <div style={{ width: blogs.length === 1 ? "20%" : "45%", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", padding: "5%", paddingTop: "2%" }}>
                  {blogs.map((item, id) => (
                      <BlogCard data={blogs[id]} deleteBlog={() => {}}></BlogCard>
                  ))}
                  </div>
              </div>
              :
              <>
                <div style={{ marginTop: "12.5%" }}></div>
                <BlogLoading loadingMessage="Loading All Blogs..." />
                <div style={{ marginBottom: "5%" }}></div>
              </>
          }
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Button variant="contained" color="success" onClick={() => navigate('/createblog')}>
                <Typography variant="h6">Create Your Own Blog</Typography>
            </Button>      
          </div>
      </div>
      <Footer />
    </>
  )
}

export default AllPosts