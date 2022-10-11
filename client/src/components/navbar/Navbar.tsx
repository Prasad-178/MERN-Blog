// import styled from "styled-components"
// import * as injectTapEventPlugin from "react-tap-event-plugin"
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import { connect } from "react-redux";
import { Grid, Tabs, Tab, Box, useTheme, useMediaQuery } from "@mui/material"
import StoreIcon from '@mui/icons-material/Store';
import Logo from "./navbarComponents/Logo";
import { changeSelected } from "../../redux";
import { useSelector, useDispatch } from "react-redux";
import { linksInNavbar as ll } from "./navbarComponents/links";
import navbarReducer from "../../redux/reducers/NavbarReducers";
import DrawerComponent from "./navbarComponents/Drawer";

function Navbar(props: any) {
    const theme = useTheme()
    const isDrawerOpen = useMediaQuery(theme.breakpoints.down('lg'))
    const Selected: Number = useSelector((state: any) => state.Selected)
    const dispatch = useDispatch()
    return (
        <AppBar style={{ backgroundImage: 'linear-gradient(90deg, rgba(107,113,213,1) 10%, rgba(65,9,121,1) 41%, rgba(215,22,22,0.8606793059020483) 100%)' }}>
            <Toolbar>
                <Grid container sx={{ placeItems: 'center' }}>

                    <Logo />

                    {!isDrawerOpen ?    <Grid item xs={3}>
                                            <Tabs indicatorColor="secondary" textColor="inherit" value={Selected} onChange={(e,val) => props.changeSelected(val)}>
                                                <Tab label={ll[0]}></Tab>
                                                <Tab label={ll[1]}></Tab>
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

const mapStateToProps = (state:any) => {
    return {
        SELECTED_NAVBAR: state.Selected
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        changeSelected: (val: Number) => dispatch(changeSelected(val))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar)

// export default Navbar
