import { useState, useEffect } from "react"
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import { connect } from "react-redux";
import { Grid, Tabs, Tab, Box, useTheme, useMediaQuery } from "@mui/material"
import Logo from "./navbarComponents/Logo";
import { useSelector, useDispatch } from "react-redux";
import { linksInNavbar as ll } from "./navbarComponents/links";
import DrawerComponent from "./navbarComponents/Drawer";
import { useNavigate } from "react-router-dom";
import { getCurrentURL, getURLExtension } from "../../helper/getCurrentURL"

function Navbar() {

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
    
    type NavbarValue = null | number
    const [value, setValue] = useState<NavbarValue>()
    
    const theme = useTheme()
    const isDrawerOpen = useMediaQuery(theme.breakpoints.down('lg'))
    const navigate = useNavigate()
    
    return (
        <AppBar style={{ backgroundImage: 'linear-gradient(90deg, rgba(26,31,117,1) 10%, rgba(142,102,182,1) 41%, rgba(215,22,22,0.8606793059020483) 100%)', maxHeight: "15%" }}>
            <Toolbar>
                <Grid container sx={{ placeItems: 'center' }}>

                    <Logo />

                    {!isDrawerOpen ?    <Grid item xs={3}>
                                            <Tabs indicatorColor="secondary" textColor="inherit" value={value} onChange={() => getURLExtension() === "" ? setValue(0) : (getURLExtension() === "myposts" ? setValue(1) : setValue(null))}>
                                                <Tab onClick={() => navigate('/')} label={ll[0]}></Tab>
                                                <Tab onClick={() => navigate('/myposts')} label={ll[1]}></Tab>
                                            </Tabs>
                                        </Grid>
                                        :
                                        null} 

                    <Grid item>
                        <Tabs indicatorColor="secondary" textColor="inherit">
                            <Tab label={ll[2]}></Tab>
                        </Tabs>
                    </Grid>

                    {!isDrawerOpen ?    <Grid xs={3.4} />
                                        :
                                        null}

                    {!isDrawerOpen ?    <Grid item xs={2}>
                                            <Box display={'flex'}>
                                                {ll[3]}
                                                {ll[4]}
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
