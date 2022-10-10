// import styled from "styled-components"
// import * as injectTapEventPlugin from "react-tap-event-plugin"
import { useState } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import { Grid, Tabs, Tab } from "@mui/material"
import StoreIcon from '@mui/icons-material/Store';
import Logo from "./navbarComponents/Logo";

function Navbar() {
    return (
        <AppBar>
            <Toolbar>
                <Grid container spacing={1}>
                    <Logo />
                    <Grid item xs={7}>
                        <Tabs indicatorColor="secondary" textColor="inherit" value={2}>
                            <Tab label="Products" />
                            <Tab label="Contact" />
                            <Tab label="About" />
                        </Tabs>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar