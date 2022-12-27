import React, { useEffect, useState } from "react"
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography"
import { useMediaQuery, useTheme } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CreateBlogButton from "../createBlog/subComponents/CreateBlogButton";
import BlogField from "../createBlog/subComponents/BlogField";
import { useAppSelector } from "../app/hooks";
import TitleIcon from '@mui/icons-material/Title';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import IconButton from '@mui/material/IconButton';
import TagField from "../createBlog/subComponents/TagField";
import TagItem from "../createBlog/subComponents/TagItem";
import CancelIcon from '@mui/icons-material/Cancel';
import { Editor } from "react-draft-wysiwyg"; 
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertFromHTML, convertFromRaw, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";  
import htmlToDraft from "html-to-draftjs";
import EditBlogButton from "./subComponents/EditBlogButton";
var stateFromHTML = require('draft-js-import-html').stateFromHTML;

const EditPostComponent = () => {

  const navigate = useNavigate()
  const User = useAppSelector((state) => state.user)
  const Login = useAppSelector((state) => state.login)
  
  const email = User.data.email
  const author = User.data.name

  const [blogId, setBlogId] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  const [twitter, setTwitter] = useState<string>("")
  const [instagram, setInstagram] = useState<string>("")
  const [currentTag, setCurrentTag] = useState<string>("")
  const [tags, setTags] = useState<Array<string>>([])
  const [image, setFileName] = useState<any>("")

  const id = useParams().id!

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setFileName(base64)
  }
  
  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value)
  }

  const handleTwitter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTwitter(event.target.value)
  }

  const handleInstagram = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInstagram(event.target.value)
  }

  const handleCurrentTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(event.target.value)
  }

  const setDefaultStateCurrentTag = () => {
    setCurrentTag("")
  }

  const addTag = () => {
    if (currentTag != "") {
      setTags(prevTags => {
        return [...prevTags, currentTag]
      })
      setDefaultStateCurrentTag()
    }
    else {}

    setCurrentTag("")
  }

  const deleteTag = (id: Number) => {
    console.log("Id is : ", id)
    setTags(prevTags => {
      return prevTags.filter((item, index) => {
        return index !== id
      })
    })
  }

//   const userData = async () => {
//     const res = await axios.get("http://localhost:5000/api/secure/emailverification", {})
//     if (res.data.message == true) {}
//     else {
//       navigate('/')
//       alert("You have to verify your email to create a blog! Please check your inbox!")
//     }
//     return res
//   }
  const blogData = async () => {
    const res = await axios.get("http://localhost:5000/api/blogs/blog/" + id)
    console.log(res.data)
    // this is the blog object
    setBlogId(id)
    setTags(res.data.tags)
    setTwitter(res.data.twitter)
    setInstagram(res.data.instagram)
    setFileName(res.data.image)
    setTitle(res.data.title)

    console.log(res.data.content)
    
    // const rawContent = res.data.content
    // const currentContentState = stateFromHTML(rawContent)
    // setEditorState(currentContentState)
    // const draft = htmlToDraft(rawContent)
    // setContent(draftToHtml(convertToRaw(ContentState.createFromBlockArray(draft.contentBlocks, draft.entityMap))))

    // const contentState = ContentState.createFromBlockArray(draft.contentBlocks, draft.entityMap)
    // const rawHtml = convertToRaw(contentState)

    // setContentState(rawHtml)
    // const convertedRawContent = convertFromRaw(rawHtml)
    // const editorState = EditorState.createWithContent(convertedRawContent)
    // setEditorState(editorState)

    const html = res.data.content
    const blocksFromHTML = convertFromHTML(html)
    const content = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)

    setEditorState(EditorState.createWithContent(content))
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))

    return res
  }

  useEffect(() => {
    setBlogId(id)
    blogData().then((res) => {
        console.log(content)
    })
  }, [])

    const theme = useTheme()

    const ElevenSeventy = useMediaQuery(theme.breakpoints.down(1170))
    const EightFifty = useMediaQuery(theme.breakpoints.down(850))
    const FiveTwenty = useMediaQuery(theme.breakpoints.down(520))

    const sendRequest = async () => {
        const res = await axios.put("http://localhost:5000/api/blogs/editblog/" + blogId, {
            author: author,
            title: title,
            content: content,
            image: image,
            tags: tags,
            twitter: twitter,
            instagram: instagram,
            email: email
        })
        .catch((err: any) => console.log(err.message))

        const data = await res!.data
        console.log(data)
        return data
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        sendRequest()
        .then(() => {
          alert("Blog edited successfully")
          navigate('/myposts')
        })
    }

  return (
    <>
        <div style={{ height: "60px" }}></div>
        <form onSubmit={handleSubmit}>
        <Stack
            spacing={2} 
            direction={"column"}
            width={ElevenSeventy ? (EightFifty ? (FiveTwenty ? '60%' : '50%') : '50%') : '35%'} 
            marginLeft={FiveTwenty ? '20%' : '30%'}
            marginBottom={"5%"}
            marginTop={"2%"}
            >
                    <Typography variant={FiveTwenty? "body1" : "h6"} style={{ fontWeight: 700, alignSelf: "center" }}>EDIT BLOG</Typography>
                    <BlogField value={title} handleChangeBlogField={handleTitle} placeholder="Title" icon={<TitleIcon />} nameOfField="title" />
                    <Typography variant={FiveTwenty? "body1" : "h6"} style={{ fontWeight: 700 }}>BLOG BODY :</Typography>
                    <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
                    <Editor contentState={convertToRaw(editorState.getCurrentContent())} editorState={editorState} wrapperClassName="wrapper" editorClassName="editor" toolbarClassName="toolbar" editorStyle={{ backgroundColor: "lavender" }} toolbarStyle={{ backgroundColor: "blue" }}
                      onEditorStateChange={
                        (newState) => {
                          setEditorState(newState)
                          setContent(draftToHtml(convertToRaw(newState.getCurrentContent())))
                          console.log(content)
                      }}
                      toolbar={{
                        image: {
                          icon: image,
                          className: undefined,
                          component: undefined,
                          popupClassName: undefined,
                          urlEnabled: true,
                          uploadEnabled: true,
                          alignmentEnabled: "CENTER",
                          uploadCallback: undefined,
                          previewImage: false,
                          inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                          alt: { present: false, mandatory: false },
                          defaultSize: {
                            height: '360',
                            width: '640',
                          },
                        },
                        embedded: {
                          icon: "icon",
                          className: undefined,
                          component: undefined,
                          popupClassName: undefined,
                          embedCallback: undefined,
                          defaultSize: {
                            height: '360',
                            width: '640',
                          },
                        },
                      }}
                    />
                    </div>
                    <Typography variant={FiveTwenty? "body1" : "h6"} style={{ fontWeight: 700 }}>SOCIALS :</Typography>
                    <BlogField value={twitter} handleChangeBlogField={handleTwitter} placeholder="Twitter" icon={<TwitterIcon />} nameOfField="twitter" />
                    <BlogField value={instagram} handleChangeBlogField={handleInstagram} placeholder="Instagram" icon={<InstagramIcon />} nameOfField="instagram" />
                    <Typography variant={FiveTwenty? "body1" : "h6"} style={{ fontWeight: 700 }}>TAGS :</Typography>
                    <TagField handleChangeTagField={handleCurrentTag} addTag={addTag} value={currentTag} />
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        {tags.map((item: any, index: any) => (
                          <>
                            <ul style={{ display: "inline-flex", fontSize: "15px", backgroundColor: "#5bc546", borderRadius: "5px", padding: "1%", paddingBottom: "1%", marginLeft: "2%", marginRight: "-1.15%", marginTop: "0%", letterSpacing: "0.2px" }} key={index}>
                                <TagItem tagName={item.toUpperCase()} />
                            </ul>
                            <IconButton style={{ marginBottom: "3.75%", marginLeft: "0.5%" }} aria-label="delete" color='error' size='small' onClick={() => deleteTag(index)}>
                                <CancelIcon />
                            </IconButton>
                          </>
                        ))}
                    </div>
                    <Typography style={{ marginTop: "0%" }}>Blog Cover Image : </Typography>
                    <input type="file" name="image" onChange={(e) => handleFileUpload(e)} />
                    <EditBlogButton />
        </Stack>
    </form>
    </>
  )
}

const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
}

export default EditPostComponent