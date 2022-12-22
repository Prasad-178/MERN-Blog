import { useState, useEffect } from "react"
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import { connect } from "react-redux";
import { Grid, Tabs, Tab, Box, useTheme, useMediaQuery } from "@mui/material"
import Logo from "./navbarComponents/Logo";
import axios from "axios";
import DrawerComponent from "./navbarComponents/Drawer";
import { useNavigate, Link } from "react-router-dom";
import { getURLExtension } from "../../helper/getCurrentURL"
import { useQuery } from "react-query"
import SearchBar from "./navbarComponents/search-bar";
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import LoginIcon from '@mui/icons-material/Login';
import { useAppSelector, useAppDispatch } from "../app/hooks"
import { fetchOutUser, setMethod, setStatus } from "../features/user/userSlice";
import { setLogin } from "../features/login/loginSlice";

function Navbar() {

    const dispatch = useAppDispatch()
    const User = useAppSelector((state) => state.user)
    const Login = useAppSelector((state) => state.login)

    type NavbarValue = null | number
    const [value, setValue] = useState<NavbarValue>()
    
    const theme = useTheme()
    const isDrawerOpen = useMediaQuery(theme.breakpoints.down('lg'))
    const navigate = useNavigate()

    useEffect(() => {
        const ext = getURLExtension() 
        if (ext === "") {
            setValue(0)
        }
        else if (ext === "myposts") {
            setValue(1)
        }
        else {

        }

    }, [])

    const handleLogout = (e: any) => {
        console.log("yo")
        dispatch(fetchOutUser({}))
        navigate('/login')
    }

    useEffect(() => {
        if (User.loading === false && User.method === "logout" && User.status === "failed") {
            dispatch(setMethod("idle"))
            dispatch(setLogin(true))
            dispatch(setStatus("idle"))
        }
        else if (User.loading === false && User.method === "logout" && User.status === "succeeded") {
            dispatch(setMethod("idle"))
            dispatch(setLogin(false))
            dispatch(setStatus("idle"))
            alert(User.error)
        }
    }, [User])

    return (
        <AppBar style={{ backgroundImage: 'black', maxHeight: "15%" }}>
            <Toolbar>
                <Grid container sx={{ placeItems: 'center' }}>

                    <Logo />

                    {!isDrawerOpen ?    <Grid item xs={3}>
                                            <Tabs indicatorColor="secondary" textColor="inherit" value={value} >
                                                <Tab onClick={() => navigate('/')} label={'HOME'}></Tab>
                                                <Tab onClick={() => navigate('/createblog')} label={"MY POSTS"}></Tab>
                                            </Tabs>
                                        </Grid>
                                        :
                                        null} 

                    <Grid item>
                        <Tabs indicatorColor="secondary" textColor="inherit">
                            <Tab label={<SearchBar />}></Tab>
                        </Tabs>
                    </Grid>

                    {!isDrawerOpen ?    <Grid xs={3.4} />
                                        :
                                        null}

                    {!isDrawerOpen ?    <Grid item xs={2}>
                                            <Box display={'flex'}>
                                                {Login.login ? 
                                                <Link to={'/account'} style={{ textDecoration: 'none' }}><Button variant="text" sx={{ marginLeft: 'auto', color: 'white' }}> <AccountCircleIcon /> Account </Button></Link> 
                                                :
                                                <Link to={'/login'} style={{ textDecoration: 'none' }}><Button variant="text" sx={{ marginLeft: 'auto', color: 'white' }}> <LoginIcon /> Login </Button></Link>}
                                                {Login.login ? 
                                                <Button onClick={handleLogout}
                                                variant="text" sx={{ marginLeft: 4, color: 'white' }}> <LogoutIcon /> Logout </Button>
                                                : 
                                                <Link to={'/register'} style={{ textDecoration: 'none' }}><Button variant="text" sx={{ marginLeft: 'auto', color: 'white' }}> <CreateIcon /> Register </Button></Link>}
                                            </Box>
                                        </Grid>
                                        :
                                        null}
                    

                </Grid>
                {isDrawerOpen ? <DrawerComponent /> : null}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
