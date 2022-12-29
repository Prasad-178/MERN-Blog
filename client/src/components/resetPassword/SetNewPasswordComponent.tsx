import { useState } from "react"
import EmailField from "../reusable-components/EmailField";
import PasswordField from "../reusable-components/PasswordField";
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography"
import { useMediaQuery, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BlogField from "../createBlog/subComponents/BlogField";
import KeyIcon from '@mui/icons-material/Key';
import ReusableSubmitButton from "../reusable-components/ReusableSubmitButton";

const SetNewPasswordComponent = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [otp, setOtp] = useState<string>("")
    
    function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }

    function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    function handleConfirmPassword(event: React.ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(event.target.value)
    }

    function handleOtp(event: React.ChangeEvent<HTMLInputElement>) {
        setOtp(event.target.value)
    }

    const theme = useTheme()

    const ElevenSeventy = useMediaQuery(theme.breakpoints.down(1170))
    const EightFifty = useMediaQuery(theme.breakpoints.down(850))
    const SixFifty = useMediaQuery(theme.breakpoints.down(650))
    const FiveTwenty = useMediaQuery(theme.breakpoints.down(520))
    const FourTwenty = useMediaQuery(theme.breakpoints.down(420))

    const sendRequest = async () => {
        const res = await axios.post("http://localhost:5000/api/secure/setnewpassword", {
            email: email,
            password: password,
            enteredOtp: otp
        })
        .catch((err: any) => alert("Wrong Otp entered!!"))

        const data = await res!.data
        console.log(data)
        return data
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (password.length < 1) {
            alert("You have to enter the password!")
            return
        }
        
        if (password !== confirmPassword) {
            alert("Passwords do not match!")
            return
        }

        sendRequest().then(() => {
            navigate('/login')
        })
    }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "12%" }}>
        <Stack
            spacing={2} 
            direction={"column"}
            width={ElevenSeventy ? (EightFifty ? (FiveTwenty ? '60%' : '50%') : '50%') : '35%'} 
            marginLeft={FiveTwenty ? '20%' : '30%'}
            marginTop={SixFifty ? (FourTwenty ? '30%' : '20%') : '15%'}>
                    <Typography variant={FiveTwenty? "body1" : "h6"}>SET YOUR NEW PASSWORD</Typography>
                    <EmailField value={email} handleChangeEmail={handleEmail} />
                    <PasswordField placeholder="New Password" handleChangePassword={handlePassword} />
                    <PasswordField placeholder="Confirm New Password" handleChangePassword={handleConfirmPassword} />
                    <BlogField placeholder={"OTP"} icon={<KeyIcon />} nameOfField={"otp"} value={otp} handleChangeBlogField={handleOtp} />
                    <ReusableSubmitButton buttonName="Set New Password" value={"SetNewPasswordButton"} />
        </Stack>
    </form>
  )
}

export default SetNewPasswordComponent