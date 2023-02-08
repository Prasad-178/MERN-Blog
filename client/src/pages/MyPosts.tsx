import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/navbar/Navbar"
import { Typography } from "@material-ui/core"
import BlogCard from "../components/blogPreview/BlogCard"
import BlogLoading from "../components/blogPreview/BlogLoading"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "../components/app/hooks"
import NoBlogsComponent from "../components/blogPreview/NoBlogsComponent"
import Footer from "../components/footer/Footer"
import { useMediaQuery, useTheme } from "@mui/material"
import ActionAlerts from "../components/alertComponent/AlertMessage"

const MyPosts = () => {

    const User = useAppSelector((state) => state.user)
    // console.log("User is : ", User)
    const email = User.data.email
    // console.log("logged in email is : ", email)

    const successAlert = "Blog deleted successfully!"

    const theme = useTheme()

    const TenFifty = useMediaQuery(theme.breakpoints.down(1050))
    const FourHundred = useMediaQuery(theme.breakpoints.down(400))

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

  const [alertBoolean, setAlertBoolean] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>("")

  const routeString = "BLOGIFY >> MY POSTS"

  useEffect(() => {
    getMyBlogs().then((res) => {
      // console.log("response data is : ", res)
      setBlogs(res)
      if (res.length === 0) {
        setNoBlogs(1)
      }
    })
  }, [])
  
  const getMyBlogs = async () => {
    const res = await axios.post("http://localhost:5000/api/blogs/myblogs", {
        email: email
    })

    return res.data
  }

  const deleteBlog = async (id: string)  => {
    let confirmationText: any = prompt("Confirm you want to delete this blog by typing 'YES' into this text box below :")
    switch (confirmationText) {
      case "YES":
        {
          const res = await axios.delete("http://localhost:5000/api/blogs/deleteblog/" + id)
          // console.log(res)
          getMyBlogs().then((res) => {
            // console.log("response data is : ", res)
            setBlogs(res)
            if (res.length === 0) {
              setNoBlogs(1)
            }
            setAlertBoolean(true)
            setAlertMessage("Blog deleted successfully!")
          })
          break;
        }
      default:
        {
          setAlertBoolean(true)
          setAlertMessage("Blog was not deleted")
          return
        }
    }

    return
  }

  return (
    <>
        <Navbar />
        <div style={{ height: '10%' }}></div>
        {noBlogs === 1 ?
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "7%" }}>
          <div style={{ height: "200px" }}></div>
          <NoBlogsComponent />
          <Button style={{ marginTop: "5%" }} variant="contained" color="success" onClick={() => navigate('/createblog')}>
              <Typography variant="h6">Create Your Own Blog</Typography>
          </Button>
          <Button variant="outlined" style={{ marginTop: "2%", color: "green", border: "2px solid red" }} onClick={() => navigate('/allposts/1')}>
              <Typography variant="h6">ALL BLOGS</Typography>
          </Button>
        </div>
        :
        blogs.length > 0 ?
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "5%", marginBottom: "6%" }}>
            <Typography variant="h5" style={{ marginBottom: "0%", marginTop: "1%", fontWeight: 700 }}>Your Blogs</Typography>
            <div style={{ width: blogs.length === 1 ? "20%" : "45%", marginRight: TenFifty ? (FourHundred ? "20%" : "13%") : "0%", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", padding: "5%", paddingTop: "2%" }}>
              {blogs.map((item, id) => (
                  <BlogCard data={blogs[id]} deleteBlog={(id: string) => deleteBlog(id)}></BlogCard>
              ))}
            </div>
            <Button variant="contained" color="success" onClick={() => navigate('/createblog')}>
                <Typography variant="h6">Create Your Own Blog</Typography>
            </Button>
            <Button variant="outlined" style={{ marginTop: "2%", color: "green", border: "2px solid red" }} onClick={() => navigate('/allposts/1')}>
              All Blogs
            </Button>
        </div>
        :
        <>
            <div style={{ marginTop: "15%" }}></div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "5%" }}>
                <BlogLoading loadingMessage="Loading your Blogs..." />
                <Button style={{ marginTop: "5%" }} variant="contained" color="success" onClick={() => navigate('/createblog')}>
                    <Typography variant="h6">Create Your Own Blog</Typography>
                </Button>
            </div>
        </>
        }
        <ActionAlerts message={alertMessage} booleanDisplay={alertBoolean} onClose={() => {
          setAlertBoolean(false)
          if (alertMessage === successAlert) navigate('/')
        }} ></ActionAlerts>
      <Footer />
    </>
  )
}

export default MyPosts