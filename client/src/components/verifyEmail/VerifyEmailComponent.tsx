import { useEffect, useState } from "react"
import EmailField from "../reusable-components/EmailField"
import PasswordField from "../reusable-components/PasswordField"
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography"
import { useMediaQuery, useTheme } from "@mui/material"
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios"
import { useAppSelector } from "../app/hooks";
import ReusableSubmitButton from "../reusable-components/ReusableSubmitButton";
import ActionAlerts from "../alertComponent/AlertMessage";

const VerifyEmailComponent = () => {

  const navigate = useNavigate()
  const User = useAppSelector((state) => state.user)

  const [alertBoolean, setAlertBoolean] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>("")

  useEffect(() => {
    if (User.data.verified) {
      setAlertBoolean(true)
      setAlertMessage("Your account is already verified!")
      // navigate('/login')
    }
  }, [])

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
        const res = await axios.post('https://blogify-01.onrender.com/api/secure/verifyEmail', {
          email: email,
          password: password
        })
        .catch((err: any) => {
          setAlertBoolean(true)
          setAlertMessage(err.message)
        })

        const data = await res!.data
        // console.log(data)
        return data
    }

    const handleSubmit: any = (e: Event) => {
      e.preventDefault()
      if (password.length < 1) {
        setAlertBoolean(true)
        setAlertMessage("You have to enter the password!")
        return
      }
      
      // console.log(email, password)
        sendRequest().then(() => {
          navigate('/login')
        })
    }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "15%" }}>
        <Stack
            spacing={2} 
            direction={"column"}
            width={ElevenSeventy ? (EightFifty ? (FiveTwenty ? '60%' : '50%') : '50%') : '35%'} 
            marginLeft={FiveTwenty ? '20%' : '30%'}
            marginTop={SixFifty ? (FourTwenty ? '30%' : '20%') : '15%'}>

                    <Typography variant={FiveTwenty? "body1" : "h6"}>VERIFY EMAIL</Typography>
                    <EmailField value={email} handleChangeEmail={handleEmail} />
                    <PasswordField placeholder={"Password"} handleChangePassword={handlePassword} />
                    <ReusableSubmitButton buttonName="VERIFY EMAIL" value={"VerifyEmailButton"} />
        </Stack>
        <ActionAlerts message={alertMessage} booleanDisplay={alertBoolean} onClose={() => setAlertBoolean(false)} />
    </form>
  )
}

export default VerifyEmailComponent