import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"
import { Typography } from "@material-ui/core"
import BlogLoading from "../components/blogPreview/BlogLoading"
import TagItem from "../components/createBlog/subComponents/TagItem"
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from '@mui/material/Link';
import { EditorState } from "draft-js"
import Footer from "../components/footer/Footer"
import LaunchIcon from '@mui/icons-material/Launch';
import { NavLink } from "react-router-dom"

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
    email: string
}

const initialBlogState: BlogType = {
    author: "",
    content: "",
    date: Date.prototype,
    image: "",
    instagram: "",
    tags: [""],
    title: "",
    twitter: "",
    __v: 0,
    _id: "",
    email: ""
}

const BlogPage = () => {

    const paramId = useParams().id

    const [data, setBlogDetails] = useState<BlogType>(initialBlogState)
    const [dataRetrieved, setDataRetrieved] = useState<boolean>(false)
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())

    const [author, content, date, image, instagram, tags, title, twitter, id, email] = [data.author, data.content, data.date, data.image, data.instagram, data.tags, data.title, data.twitter, data._id, data.email]
    
    var blogTitle: any
    var blogInstagramLink = instagram
    if (blogInstagramLink.substring(0,6) === "http://" || blogInstagramLink.substring(0,7) === "https://") {}
    else {
        blogInstagramLink = "http://" + blogInstagramLink
    }

    var blogTwitterLink = twitter
    if (blogTwitterLink.substring(0,6) === "http://" || blogTwitterLink.substring(0,7) === "https://") {}
    else {
        blogTwitterLink = "http://" + blogTwitterLink
    }

    const routeString = "BLOGIFY >> " + title

    const convertImages = (htmlText: string): string => {

        const initialIndex = htmlText.indexOf('" style="height:')
        const finalIndex = htmlText.indexOf('px"/>') + 4

        // console.log(htmlText.substring(initialIndex+2, finalIndex-2))

        let toBeReplaced = htmlText.substring(initialIndex+2, finalIndex-2)
        let toReplaceWith = (/style="height: 360px;width: 640px; justify-self: center/).source
        
        // htmlText = htmlText.replace(toBeReplaced, toReplaceWith)
        
        htmlText = htmlText.replace("<iframe ", (/<iframe style="justify-self: center;" /).source) 

        return htmlText
    }

    const sendRequest = async () => {
        const res = await axios.get("http://localhost:5000/api/blogs/blog/" + paramId)
        console.log(res)
        const dateString: string = res.data.date
        let date = new Date(dateString)

        const data = await res!.data

        setBlogDetails(data)
        setBlogDetails(prevState => ({
            ...prevState,
            date: date
        }))
        setDataRetrieved(true)

        blogTitle = res.data.title.toUpperCase()
        setBlogDetails(prevState => ({
            ...prevState,
            title: blogTitle
        }))

        let html = res.data.content
        html = convertImages(html)

        setBlogDetails(prevState => ({
            ...prevState,
            content: html
        }))

        return "hi"
    }

    useEffect(() => {
        sendRequest().then((res: any) => {
            console.log(res)
        })
    }, [])

  return (
    <>
        <Navbar />
        {dataRetrieved ? 
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div style={{ height: "60px" }}></div>
            <div style={{ marginBottom: "1%", marginTop: "2%", alignSelf: "flex-start", marginLeft: "10%" }}>
                <Typography variant="body2" color="textPrimary" style={{ fontWeight: 600 }}>{routeString}</Typography>
            </div>
            <img src={image} style={{ width: "1280px", height: "600px", marginBottom: "5%" }}></img>
            <div style={{ maxWidth: "1000px", display: "flex", alignSelf: "center" }}>
                <Typography variant="h3" style={{ color: "black", fontWeight: 700, fontStyle: "italic" }}>{title}</Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignSelf: "center" }}>
                {tags.map((item: any, index: any) => (
                            <>
                                <ul style={{ display: "inline-flex", fontSize: "15px", backgroundColor: "#4a5bb9", borderRadius: "5px", padding: "1%", paddingBottom: "1%", marginLeft: "2%", marginRight: "1%", marginTop: "0%", letterSpacing: "0.2px" }} key={index}>
                                    <TagItem tagName={item.toUpperCase()} />
                                </ul>
                            </>
                            ))}
            </div>

            <div style={{ height: "30px" }}></div>
            <hr style={{ width: "75%", alignSelf: "center", color: "black", height: "0.5px", marginRight: "2%", marginLeft: "2%", marginBottom: "2%", border: "2px solid black", background: "black" }} />
            <div style={{ width: "75%", alignSelf: "center", display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "2%" }}>
                <div style={{ marginLeft: "5%" }}>
                    <Typography variant="body1" style={{ fontWeight: 600, fontSize: "21px" }}>{author} <NavLink to={'/profile/' + author}> <LaunchIcon /> </NavLink> </Typography>
                    <Typography variant="body2" style={{ fontSize: "21px" }}>{date.toUTCString()}</Typography>
                </div>
                <div style={{ marginRight: "5%", display: "flex", flexDirection: "row" }}>
                    {twitter.length > 0 ? 
                    <Link href={blogTwitterLink} target="_blank">
                        <IconButton color="default" size='large' disableRipple disableTouchRipple>
                            <TwitterIcon style={{ color: "white", background: "blue", borderRadius: "60%", padding: "20%" }} />
                        </IconButton>
                    </Link>
                    :
                    null
                    }
                    {instagram.length > 0 ?
                    <Link href={blogInstagramLink} target="_blank">
                        <IconButton color="default" size='large' disableFocusRipple disableRipple disableTouchRipple>
                            <InstagramIcon style={{ color: "orange", background: "none", borderRadius: "60%", padding: "20%" }} />
                        </IconButton>
                    </Link>
                    :
                    null
                    }
                </div>
            </div>
            <hr style={{ width: "75%", alignSelf: "center", color: "black", height: "0.5px", marginRight: "2%", marginLeft: "2%", marginBottom: "2%", border: "2px solid black", background: "black" }} />
            <div style={{ width: "55%", display: "flex", flexDirection: "column", alignSelf: "center", marginBottom: "5%" }} dangerouslySetInnerHTML={{__html: data.content}} />
            <div></div>
        </div>
        : 
        <>
            <div style={{ marginTop: "15%" }}></div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <BlogLoading loadingMessage="Loading Blog..." />
            </div>
        </>
        }
        <Footer />
    </>
  )
}

export default BlogPage