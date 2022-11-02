import { FormEventHandler, useState } from "react"
import NameField from "./components/NameField"
import EmailField from "../reusable-components/EmailField"
import PasswordField from "../reusable-components/PasswordField"
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography"
import { useMediaQuery, useTheme } from "@mui/material"
import RegisterButton from "./components/RegisterButton"
import axios from "axios"
import { useNavigate } from "react-router-dom";

const SignupComponent = () => {

    const navigate = useNavigate()

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    function handleName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }
    
    function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }
    
    function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    // axios post request :
    const sendRequest = async () => {
        const res = await axios.post("http://localhost:3000/register", {
        name: name, 
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
        console.log(name, email, password)
            sendRequest().then(() => {
                navigate('/login')
            })

    }

    const theme = useTheme()
    const ElevenSeventy = useMediaQuery(theme.breakpoints.down(1170))
    const EightFifty = useMediaQuery(theme.breakpoints.down(850))
    const SixFifty = useMediaQuery(theme.breakpoints.down(650))
    const FiveTwenty = useMediaQuery(theme.breakpoints.down(520))
    const FourTwenty = useMediaQuery(theme.breakpoints.down(420))

  return (
    <form onSubmit={handleSubmit}> {/* can also submit in the normal way */} 
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