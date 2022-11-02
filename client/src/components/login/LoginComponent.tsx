import { useState } from "react"
import EmailField from "../reusable-components/EmailField"
import PasswordField from "../reusable-components/PasswordField"
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography"
import { useMediaQuery, useTheme } from "@mui/material"
import LoginButton from "./components/LoginButton";
import { Navigate, useNavigate } from "react-router-dom";
import AuthCheck from "../../assets/auth-asset/AuthCheck";
import axios from "axios"

const LoginComponent = () => {

  const navigate = useNavigate()

    const [email, setEmail] = useState<string>("")
    const[password, setPassword] = useState<string>("")
    
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

    // axios post request :
    const sendRequest = async () => {
        const res = await axios.post('http://localhost:3000/login', {
          email: email, 
          password: password
        })
        .catch((err: any) => alert(err.message))

        const data = await res!.data
        console.log(data)
        return data
    }

    const handleSubmit: any = (e: Event) => {
      e.preventDefault()
      console.log(email, password)
        sendRequest().then(() => {
          navigate('/')
        })
    }

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