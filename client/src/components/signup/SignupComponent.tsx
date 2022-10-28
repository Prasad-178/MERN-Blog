import styled from "styled-components" 
import { useState } from "react"
import NameField from "./components/NameField"
import EmailField from "../reusable-components/EmailField"
import PasswordField from "../reusable-components/PasswordField"
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography"
import { useMediaQuery, useTheme } from "@mui/material"
import RegisterButton from "./components/RegisterButton"

const SignupComponent = () => {

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const[password, setPassword] = useState<string>("")

    function handleName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }
    
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

  return (
    <form action="/register" name="register" method="POST">
        <Stack
            spacing={2} 
            direction={"column"}
            width={ElevenSeventy ? (EightFifty ? (FiveTwenty ? '60%' : '50%') : '50%') : '35%'} 
            marginLeft={FiveTwenty ? '20%' : '30%'}
            marginTop={SixFifty ? (FourTwenty ? '30%' : '20%') : '15%'}>

                    <Typography variant={FiveTwenty? "body1" : "h6"}>CREATE ACCOUNT</Typography>
                    <NameField handleChangeName={handleName} />
                    <EmailField handleChangeEmail={handleEmail} />
                    <PasswordField handleChangePassword={handlePassword} />
                    <RegisterButton />

        </Stack>
    </form>
  )
}

export default SignupComponent