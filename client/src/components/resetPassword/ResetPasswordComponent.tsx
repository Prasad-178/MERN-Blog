import { useState } from "react"
import EmailField from "../reusable-components/EmailField";
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography"
import { useMediaQuery, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReusableSubmitButton from "../reusable-components/ReusableSubmitButton";
import ActionAlerts from "../alertComponent/AlertMessage";

const ResetPasswordComponent = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState<string>("")

    const [alertBoolean, setAlertBoolean] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>("")
    
    function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }

    const theme = useTheme()

    const ElevenSeventy = useMediaQuery(theme.breakpoints.down(1170))
    const EightFifty = useMediaQuery(theme.breakpoints.down(850))
    const SixFifty = useMediaQuery(theme.breakpoints.down(650))
    const FiveTwenty = useMediaQuery(theme.breakpoints.down(520))
    const FourTwenty = useMediaQuery(theme.breakpoints.down(420))

    const sendRequest = async () => {
        const res = await axios.post("https://blogify-01.onrender.com/api/secure/resetpasswordemail", {
            email: email
        })
        .catch((err: any) => {
            setAlertBoolean(true)
            setAlertMessage("No account exists with this email address! Signup instead!")
            return
        })

        setAlertBoolean(true)
        setAlertMessage("Email has been sent with instructions to reset your password!")

        const data = await res!.data
        // console.log(data)
        return data
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        sendRequest().then(() => {})
    }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "7%" }}>
        <Stack
            spacing={2} 
            direction={"column"}
            marginBottom={"5%"}
            width={ElevenSeventy ? (EightFifty ? (FiveTwenty ? '60%' : '50%') : '50%') : '35%'} 
            marginLeft={FiveTwenty ? '20%' : '30%'}
            marginTop={SixFifty ? (FourTwenty ? '30%' : '20%') : '15%'}>
                    <Typography variant={FiveTwenty? "body1" : "h6"}>RESET PASSWORD</Typography>
                    <EmailField value={email} handleChangeEmail={handleEmail} />
                    <Typography variant={"body2"}>(An email will be sent to this email address with instructions to reset your password, if it exists)</Typography>
                    <ReusableSubmitButton buttonName="Send Email" value={"SendEmailButton"} />
        </Stack>
        <ActionAlerts message={alertMessage} booleanDisplay={alertBoolean} onClose={() => {
            setAlertBoolean(false)
            alertMessage.length > 0 ? navigate('/register') : navigate('/login')
        }} />
    </form>
  )
}

export default ResetPasswordComponent