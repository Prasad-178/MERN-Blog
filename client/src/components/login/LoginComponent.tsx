import { useEffect, useState } from "react"
import EmailField from "../reusable-components/EmailField"
import PasswordField from "../reusable-components/PasswordField"
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography"
import { useMediaQuery, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks"
import { setName, setEmail, setStatus, setMethod, setData, setVerified, fetchUser } from "../features/user/userSlice";
import { setLogin } from "../features/login/loginSlice";
import { NavLink } from "react-router-dom";
import axios from "axios";
import ReusableSubmitButton from "../reusable-components/ReusableSubmitButton";
import ActionAlerts from "../alertComponent/AlertMessage";

const LoginComponent = () => {

  const navigate = useNavigate()
  const dispatch: any = useAppDispatch()
  const User = useAppSelector((state) => state.user)

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [alertBoolean, setAlertBoolean] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>("")
    
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
      if (password.length < 1) {
        setAlertBoolean(true)
        setAlertMessage("You have to enter the password!")
        return
      }
      dispatch(fetchUser({ email, password }))
    }

    useEffect(() => {
      if (User.loading === false && User.status === "failed" && User.method === "login") {
        setAlertBoolean(true)
        setAlertMessage(User.error)

        dispatch(setMethod("idle"))
        dispatch(setLogin(false))
        dispatch(setStatus("idle"))
      }
      else if (User.loading === false && User.status === "succeeded" && User.method === "login") {
        dispatch(setMethod("idle"))
        dispatch(setLogin(true))
        dispatch(setStatus("idle"))
        alert(User.error)
      }
    }, [User])

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "6%" }}>
        <Stack
            spacing={2} 
            direction={"column"}
            marginBottom={"2%"}
            width={ElevenSeventy ? (EightFifty ? (FiveTwenty ? '60%' : '50%') : '50%') : '35%'} 
            marginLeft={FiveTwenty ? '20%' : '30%'}
            marginTop={SixFifty ? (FourTwenty ? '30%' : '20%') : '15%'}>
                    <Typography variant={FiveTwenty? "body1" : "h6"}>LOGIN</Typography>
                    <EmailField value={email} handleChangeEmail={handleEmail} />
                    <PasswordField placeholder={"Password"} handleChangePassword={handlePassword} />
                    <ReusableSubmitButton buttonName="Login" value={"LoginButton"} />
                    <NavLink to="/register" style={{ textDecoration: "none", color: "blue" }}>Don't have an account yet?</NavLink>
                    <NavLink to="/resetpassword" style={{ textDecoration: "none", color: "red" }}>Forgot your password?</NavLink>
        </Stack>
        <ActionAlerts message={alertMessage} booleanDisplay={alertBoolean} onClose={() => setAlertBoolean(false)} />
    </form>
  )
}

export default LoginComponent