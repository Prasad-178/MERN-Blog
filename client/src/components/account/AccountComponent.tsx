import { useEffect, useState } from "react"
import EmailField from "../reusable-components/EmailField"
import PasswordField from "../reusable-components/PasswordField"
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography"
import { useMediaQuery, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks"
import { setName, setEmail, setStatus, setMethod, setData, setVerified, fetchUser, fetchUserDetails } from "../features/user/userSlice";
import { setLogin } from "../features/login/loginSlice";
import { NavLink } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import ReusableSubmitButton from "../reusable-components/ReusableSubmitButton";
import NameField from "../signup/components/NameField";
import EmailFieldReadonly from "../reusable-components/EmailFieldReadonly";

const AccountComponent = () => {

  const navigate = useNavigate()
  const dispatch: any = useAppDispatch()
  const User = useAppSelector((state) => state.user)

    const [name, setName] = useState<string>(User.data.name!)
    const [email, setEmail] = useState<string>(User.data.email!)
    const [password, setPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("")

    function handleName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }
    
    function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }
    
    function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    function handleNewPassword(event: React.ChangeEvent<HTMLInputElement>) {
        setNewPassword(event.target.value)
    }

    function handleConfirmNewPassword(event: React.ChangeEvent<HTMLInputElement>) {
        setConfirmNewPassword(event.target.value)
    }

    const theme = useTheme()

    const ElevenSeventy = useMediaQuery(theme.breakpoints.down(1170))
    const EightFifty = useMediaQuery(theme.breakpoints.down(850))
    const SixFifty = useMediaQuery(theme.breakpoints.down(650))
    const FiveTwenty = useMediaQuery(theme.breakpoints.down(520))
    const FourTwenty = useMediaQuery(theme.breakpoints.down(420))

    const sendRequest = async () => {
        const res = await axios.post("http://localhost:5000/api/secure/editaccount", {
            name: name,
            email: email,
            password: password,
            newPassword: newPassword
        })
        .catch((err) => {
            console.log(err)
        })

        console.log(res)
        const data = await res!.data
        return data
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (newPassword !== confirmNewPassword) {
            alert("New passwords do not match!!")
            return
        }

        sendRequest().then((res) => {
            console.log(res)
            dispatch(fetchUserDetails({}))
        })
    }

    useEffect(() => {
        
    }, [])

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "12%" }}>
        <Stack
            spacing={2} 
            direction={"column"}
            width={ElevenSeventy ? (EightFifty ? (FiveTwenty ? '60%' : '50%') : '50%') : '35%'} 
            marginLeft={FiveTwenty ? '20%' : '30%'}
            marginTop={SixFifty ? (FourTwenty ? '30%' : '20%') : '15%'}>
                    <Typography variant={FiveTwenty? "body1" : "h6"}>ACCOUNT DETAILS</Typography>
                    <NameField value={name} handleChangeName={handleName} />
                    <EmailFieldReadonly value={email} handleChangeEmail={handleEmail} />
                    <Accordion style={{ backgroundColor: "transparent", color: "1px solid black" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography>Password Settings</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <PasswordField placeholder={"Existing Password"} handleChangePassword={handlePassword} />
                            <PasswordField placeholder={"New Password"} handleChangePassword={handleNewPassword} />
                            <PasswordField placeholder={"Confirm New Password"} handleChangePassword={handleConfirmNewPassword} />
                        </AccordionDetails>
                    </Accordion>
                    <ReusableSubmitButton buttonName="Edit Account Details" value="EditAccountButton" />
                    <NavLink to="/" style={{ textDecoration: "none", color: "red" }}>Cancel</NavLink>
        </Stack>
    </form>
  )
}

export default AccountComponent