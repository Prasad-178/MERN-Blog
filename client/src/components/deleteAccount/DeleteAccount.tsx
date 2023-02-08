import { Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import ActionAlerts from "../alertComponent/AlertMessage"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { fetchOutUser } from "../features/user/userSlice"
import EmailField from "../reusable-components/EmailField"
import PasswordField from "../reusable-components/PasswordField"
import ReusableSubmitButton from "../reusable-components/ReusableSubmitButton"


const DeleteAccount = () => {

    const dispatch = useAppDispatch()
    const User = useAppSelector((state) => state.user)
    const theme = useTheme()
    const navigate = useNavigate()

    const successAlert = "Account deleted successfully!"

    const ElevenSeventy = useMediaQuery(theme.breakpoints.down(1170))
    const EightFifty = useMediaQuery(theme.breakpoints.down(850))
    const SixFifty = useMediaQuery(theme.breakpoints.down(650))
    const FiveTwenty = useMediaQuery(theme.breakpoints.down(520))
    const FourTwenty = useMediaQuery(theme.breakpoints.down(420))

    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [alertBoolean, setAlertBoolean] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>("")

    function handleConfirmPassword(event: React.ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(event.target.value)
    }
    
    function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    const sendRequest = async () => {
        const res = await axios.post("https://blogify-01.onrender.com/api/secure/deleteaccount", {
            email: User.data.email!,
            password: password
        })
        .catch((err) => {
            // console.log(err)
            setAlertBoolean(true)
            setAlertMessage("The password that you have entered is wrong!")
            return
        })

        // console.log(res)
        const data = await res!.data
        return data
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        
        if (password !== confirmPassword) {
            setAlertBoolean(true)
            setAlertMessage("Passwords do not match!!")
            return
        }

        sendRequest().then((res) => {
            // console.log(res)
            dispatch(fetchOutUser({}))
            setAlertBoolean(true)
            setAlertMessage(successAlert)
        })
    }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "6%" }}>
        <Stack
            spacing={2} 
            direction={"column"}
            marginBottom={"2%"}
            width={ElevenSeventy ? (EightFifty ? (FiveTwenty ? '60%' : '50%') : '50%') : '35%'} 
            marginLeft={FiveTwenty ? '20%' : '30%'}
            marginTop={SixFifty ? (FourTwenty ? '30%' : '20%') : '15%'}>
                    <Typography variant={FiveTwenty? "body1" : "h6"}>CONFIRM DELETE ACCOUNT</Typography>
                    <PasswordField placeholder={"Password"} handleChangePassword={handlePassword} />
                    <PasswordField placeholder={"Confirm Password"} handleChangePassword={handleConfirmPassword} />
                    <Button onClick={handleSubmit} variant="contained" color='error' value='DeleteAccountButton' ><Typography variant='h6'>Delete Account</Typography></Button>
        </Stack>
        <ActionAlerts message={alertMessage} booleanDisplay={alertBoolean} onClose={() => {
          setAlertBoolean(false)
          if (alertMessage === successAlert) navigate('/')
        }} />
    </form>
  )
}

export default DeleteAccount