import { useEffect, useState } from "react"
import EmailField from "../reusable-components/EmailField"
import PasswordField from "../reusable-components/PasswordField"
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography"
import { useMediaQuery, useTheme } from "@mui/material"
import LoginButton from "./subComponents/LoginButton";
import { Navigate, useNavigate } from "react-router-dom";
import AuthCheck from "../../helper/AuthCheck";
import { useAppSelector, useAppDispatch } from "../app/hooks"
import { setName, setEmail, setStatus, setMethod, setData, setVerified, fetchUser } from "../features/user/userSlice";
import { setLogin } from "../features/login/loginSlice";

const LoginComponent = () => {

  const navigate = useNavigate()
  const dispatch: any = useAppDispatch()
  const User = useAppSelector((state) => state.user)

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    
    function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }
    
    function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    const theme = useTheme()

    const ElevenSeventy = useMediaQuery(theme.breakpoints.down(1170))
    const EightFifty = useMediaQuery(theme.breakpoints.down(850))
    const SixFifty = useMediaQuery(theme.breakpoints.down(650))
    const FiveTwenty = useMediaQuery(theme.breakpoints.down(520))
    const FourTwenty = useMediaQuery(theme.breakpoints.down(420))

    const handleSubmit: any = (e: Event) => {
      e.preventDefault()
      dispatch(fetchUser({ email, password }))
      console.log("ud is : ", User.data)
    }

    useEffect(() => {
      if (User.loading === false && User.status === "failed" && User.method === "login") {
        dispatch(setMethod("idle"))
        dispatch(setLogin(false))
        dispatch(setStatus("idle"))
        alert(User.error)
      }
      else if (User.loading === false && User.status === "succeeded" && User.method === "login") {
        dispatch(setMethod("idle"))
        dispatch(setLogin(true))
        dispatch(setStatus("idle"))
        alert(User.error)
        navigate('/', {replace: true})
      }
    }, [User])

  return (
    <form onSubmit={handleSubmit}>
        <Stack
            spacing={2} 
            direction={"column"}
            width={ElevenSeventy ? (EightFifty ? (FiveTwenty ? '60%' : '50%') : '50%') : '35%'} 
            marginLeft={FiveTwenty ? '20%' : '30%'}
            marginTop={SixFifty ? (FourTwenty ? '30%' : '20%') : '15%'}>

                    <Typography variant={FiveTwenty? "body1" : "h6"}>LOGIN</Typography>
                    <EmailField handleChangeEmail={handleEmail} />
                    <PasswordField handleChangePassword={handlePassword} />
                    <LoginButton />

        </Stack>
    </form>
  )
}

export default LoginComponent