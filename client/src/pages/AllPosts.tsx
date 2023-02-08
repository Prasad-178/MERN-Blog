import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/navbar/Navbar'
import BlogLoading from '../components/blogPreview/BlogLoading'
import BlogCard from '../components/blogPreview/BlogCard'
import NoBlogsComponent from '../components/blogPreview/NoBlogsComponent'
import { Typography } from "@material-ui/core"
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import { useMediaQuery, useTheme } from "@mui/material"

const AllPosts = () => {

    const navigate = useNavigate()
    const nextPage = ">"
    const previousPage = "<"
    const firstPage = "<<"
    const lastPage = ">>"
    const pageSize = 1

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

    const theme = useTheme()

    const TenFifty = useMediaQuery(theme.breakpoints.down(1050))
    const FourHundred = useMediaQuery(theme.breakpoints.down(400))

    const [blogs, setBlogs] = useState<Array<BlogType>>([])
    const [noBlogs, setNoBlogs] = useState<number>(0)
    const [numberOfPosts, setNumberOfPosts] = useState<number>(0)
    const [pages, setPages] = useState<Array<Object>>([])
    const [id, setId] = useState<number>(parseInt(useParams().id!))

    useEffect(() => {
        getAllPosts().then((res) => {
          setBlogs(res)
          if (res.length === 0) {
            setNoBlogs(1)
          }
          else {
            setNoBlogs(0)
          }
        })
    }, [ ,id, useParams().id!])

    useEffect(() => {
        getNumberOfPosts().then((res) => {
          setNumberOfPosts(res.count!)
          // console.log(res.count)

          let temp: Array<Object> = []
          let numberOfPages = res.count/pageSize
          for (let i=0; i<numberOfPages; i++) {
              temp.push({})
          }
          setPages(temp)

        })
    }, [])

    const getNumberOfPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/blogs/numberofblogs")
      return res.data
    }
      
    const getAllPosts = async () => {
        const res = await axios.post("http://localhost:5000/api/blogs/allposts", {
          pageNumber: id,
          pageSize: pageSize
        })
        // console.log(res)

        return res.data
    }

    const changeId = (idParam: number) => {
        setId(idParam)
        navigate('/allposts/' + idParam)
    }

  return (
    <>
      <div style={{ height: "60px" }}></div>
      <div style={{ margin: "0px", padding: "0px", height: "80%", width: "100%", marginBottom: "8%" }}>
          <Navbar />
          {noBlogs === 1 ? <NoBlogsComponent />
          :
          blogs.length > 0 ?
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "2%" }}>
                  <Typography variant="h5" style={{ marginBottom: "0%", fontWeight: 700 }}>All Blogs</Typography>
                  <div style={{ width: blogs.length === 1 ? "20%" : "45%", marginRight: TenFifty ? (FourHundred ? "20%" : "13%") : "0%", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", padding: "5%", paddingTop: "2%" }}>
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
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: "2%", marginTop: "-3%" }}>
              {id === 1 ? <button style={{ opacity: "0.5", pointerEvents: "none" }}>{firstPage}</button> : <button onClick={() => changeId(1)}>{firstPage}</button>}
              {id === 1 ? <button style={{ opacity: "0.5", pointerEvents: "none" }}>{previousPage}</button>: <button onClick={() => changeId(id-1)}>{previousPage}</button>}
              {pages.map((item, index) => {
                return (
                  <button onClick={() => changeId(index+1)}>{index+1}</button>
                ) 
              })}
              {id === pages.length ? <button style={{ opacity: "0.5", pointerEvents: "none" }}>{nextPage}</button> : <button onClick={() => changeId(id+1)}>{nextPage}</button>}
              {/* <button onClick={() => changeId(pages.length)}>{lastPage}</button> */}
              {id === pages.length ? <button style={{ opacity: "0.5", pointerEvents: "none" }}>{lastPage}</button> : <button onClick={() => changeId(pages.length)}>{lastPage}</button>}
          </div>
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