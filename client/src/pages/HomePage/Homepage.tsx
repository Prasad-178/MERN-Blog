import Navbar from "../../components/navbar/Navbar"
import userSlice, { fetchUser } from "../../components/features/user/userSlice"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../components/app/hooks"
import { useEffect } from "react"
import axios from "axios"
import { Typography } from "@material-ui/core"
import { useMediaQuery, useTheme } from "@mui/material"
import background from "../../assets/images/homepage.jpg"

const Homepage = () => {
  const dispatch: any = useAppDispatch()

  const [blogs, setBlogs] = useState<Array<Object>>([])

  const theme = useTheme()

  const SixFifty = useMediaQuery(theme.breakpoints.down(650))
  const FiveTwenty = useMediaQuery(theme.breakpoints.down(520))
  const FourTwenty = useMediaQuery(theme.breakpoints.down(420))

  useEffect(() => {
    const res = axios.get("http://localhost:3000/")
    console.log(res)
    getAllBlogs()
  }, [])

  
  const getAllBlogs = async () => {
    // console.log("fx is called!")
    const res = await axios.get("http://localhost:5000/api/blogs/allblogs")
    console.log("blogs are : ")
    console.log(res)
    console.log("blogs done!!!")
  }

  // getAllBlogs()
  
  const User = useAppSelector((state) => state.user)
  console.log(User)
  return (
    <div style={{ margin: "0px", padding: "0px", height: "80%" }}>
      <Navbar />
      <div style={{ height: "65px" }}></div>
      {/* <div>Hello there</div> */}
      <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", display: "flex", height: "480px", alignItems: "center" }}> <Typography variant={ "h4" } style={{ marginLeft: SixFifty ? (FiveTwenty ? (FourTwenty ? "30%" : "35%") : "40%") : "45%", color: "blue", fontFamily: "sans-serif" }}>BLOGIFY</Typography> </div>
    </div>
  )
}

export default Homepage