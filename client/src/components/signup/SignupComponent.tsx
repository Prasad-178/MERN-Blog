import React, { useState } from "react"
import NameField from "./components/NameField"
import EmailField from "../reusable-components/EmailField"
import PasswordField from "../reusable-components/PasswordField"
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography"
import { useMediaQuery, useTheme } from "@mui/material"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ReusableSubmitButton from "../reusable-components/ReusableSubmitButton";
import ActionAlerts from "../alertComponent/AlertMessage";

const SignupComponent = () => {

    const navigate = useNavigate()

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [alertBoolean, setAlertBoolean] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>("")

    function handleName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }
    
    function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }
    
    function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    function handleConfirmPassword(event: React.ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(event.target.value)
    }

    const sendRequest = async () => {
        const res = await axios.post("http://localhost:5000/api/secure/register", {
        name: name, 
        email: email, 
        password: password
        })
        .catch((err: any) => {
            setAlertBoolean(true)
            setAlertMessage("An account with this email already exists!")
        })

        const data = await res!.data
        // console.log(data)
        return data
    }
    const handleSubmit: any = (e: Event) => {
        e.preventDefault()
        if (password.length < 1 || confirmPassword.length < 1) {
            setAlertBoolean(true)
            setAlertMessage("You have to enter the password!")
            return
        }
        
        if (password !== confirmPassword) {
            setAlertBoolean(true)
            setAlertMessage("Passwords do not match!")
            return
        }

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
    <form onSubmit={handleSubmit} style={{ marginBottom: "5%", backgroundColor: "#aebce6" }}>
        <Stack
            spacing={2} 
            direction={"column"}
            marginBottom={"2%"}
            width={ElevenSeventy ? (EightFifty ? (FiveTwenty ? '60%' : '50%') : '50%') : '35%'} 
            marginLeft={FiveTwenty ? '20%' : '30%'}
            marginTop={SixFifty ? (FourTwenty ? '25%' : '15%') : '10%'}>
                    <Typography variant={FiveTwenty? "body1" : "h6"}>CREATE ACCOUNT</Typography>
                    <NameField value={name} handleChangeName={handleName} />
                    <EmailField value={email} handleChangeEmail={handleEmail} />
                    <PasswordField placeholder={"Password"} handleChangePassword={handlePassword} />
                    <PasswordField placeholder={"Confirm Password"} handleChangePassword={handleConfirmPassword} />
                    <ReusableSubmitButton buttonName="REGISTER" value={"RegisterButton"} />
                    <NavLink to={'/login'} style={{ textDecoration: "none", color: "blue" }}>Already have an account?</NavLink>
        </Stack>
        <ActionAlerts message={alertMessage} booleanDisplay={alertBoolean} onClose={() => setAlertBoolean(false)} />
    </form>
  )
}

export default SignupComponent