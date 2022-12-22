import React, { useEffect, useState } from "react"
import EmailField from "../reusable-components/EmailField"
import PasswordField from "../reusable-components/PasswordField"
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography"
import { useMediaQuery, useTheme } from "@mui/material"
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import CreateBlogButton from "./subComponents/CreateBlogButton";
import BlogField from "./subComponents/BlogField";
import { useAppSelector } from "../app/hooks";
import TitleIcon from '@mui/icons-material/Title';
import ContentField from "./subComponents/ContentField";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import IconButton from '@mui/material/IconButton';
import TagField from "./subComponents/TagField";
import TagItem from "./subComponents/TagItem";
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';

const CreateBlogComponent = () => {

  const navigate = useNavigate()
  const User = useAppSelector((state) => state.user)

  const [author, setAuthor] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [twitter, setTwitter] = useState<string>("")
  const [instagram, setInstagram] = useState<string>("")
  const [currentTag, setCurrentTag] = useState<string>("")
  const [tags, setTags] = useState<Array<string>>([])
  const [image, setFileName] = useState<string>("")

  const onChangeFile = (e: any) => {
    // alert("hi inside on change file")
    // console.log("event is : ", e)
    // console.log(e.target.files[0].name)
    setFileName(e.target.files[0].name)
  }

  const handleAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value)
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

  const addTag = () => {
    if (currentTag != "") {
      setTags(prevTags => {
        return [...prevTags, currentTag]
      })
      setCurrentTag("")
      console.log(tags)
    }
    else {}
  }

  const deleteTag = (id: Number) => {
    console.log("Id is : ", id)
    setTags(prevTags => {
      return prevTags.filter((item, index) => {
        return index !== id
      })
    })
  }

  const formData = new FormData()

  formData.append("author", author)
  formData.append("title", title)
  formData.append("content", content)
  formData.append("image", image)
  formData.append("tags", JSON.stringify(tags))
  formData.append("twitter", twitter)
  formData.append("instagram", instagram)

    const theme = useTheme()

    const ElevenSeventy = useMediaQuery(theme.breakpoints.down(1170))
    const EightFifty = useMediaQuery(theme.breakpoints.down(850))
    const SixFifty = useMediaQuery(theme.breakpoints.down(650))
    const FiveTwenty = useMediaQuery(theme.breakpoints.down(520))
    const FourTwenty = useMediaQuery(theme.breakpoints.down(420))

    const handleSubmit = async () => {
        const res = await axios.post("http://localhost:5000/api/blogs/newblog", formData)
        console.log(res)
    }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Stack
            spacing={2} 
            direction={"column"}
            width={ElevenSeventy ? (EightFifty ? (FiveTwenty ? '60%' : '50%') : '50%') : '35%'} 
            marginLeft={FiveTwenty ? '20%' : '30%'}
            marginTop={SixFifty ? (FourTwenty ? '30%' : '20%') : '10%'}>
                    <Typography variant={FiveTwenty? "body1" : "h6"}>CREATE BLOG</Typography>
                    <BlogField handleChangeBlogField={handleAuthor} placeholder="Author Name" icon={<PersonIcon />} nameOfField="Author"></BlogField>
                    <BlogField handleChangeBlogField={handleTitle} placeholder="Title" icon={<TitleIcon />} nameOfField="Title" />
                    <ContentField handleChangeContentField={handleContent} />
                    <BlogField handleChangeBlogField={handleTwitter} placeholder="Twitter" icon={<TwitterIcon />} nameOfField="Twitter" />
                    <BlogField handleChangeBlogField={handleInstagram} placeholder="Instagram" icon={<InstagramIcon />} nameOfField="Instagram" />
                    <TagField handleChangeTagField={handleCurrentTag} addTag={addTag} />
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        {tags.map((item, index) => (
                          <>
                            <ul style={{ display: "inline-flex", fontSize: "24px", backgroundColor: "#3f51b5", borderRadius: "5px", padding: "1%", marginLeft: "2%", marginRight: "-1.15%", color: "white", letterSpacing: "1.75px" }} key={index}><TagItem tagName={item} /></ul>
                            <IconButton aria-label="delete" color='error' size='small' onClick={() => deleteTag(index)}>
                                <CancelIcon />
                            </IconButton>
                          </>
                        ))}
                    </div>
                    <Typography>Choose Blog Image : </Typography>
                    <input type="file" name="image" onChange={onChangeFile} />
                    <CreateBlogButton />
        </Stack>
    </form>
  )
}

export default CreateBlogComponent