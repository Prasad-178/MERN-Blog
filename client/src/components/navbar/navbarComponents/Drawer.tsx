import { Drawer, IconButton, ListItem } from "@mui/material";
import { useState } from "react";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { linksInNavbar as ll, iconsInDrawer as ic } from "./links";
import { useAppSelector } from "../../app/hooks";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";

function DrawerComponent() {

    const [open, setOpen] = useState(false)
    const login = useAppSelector((state) => state.login.login)
    const navigate = useNavigate()

    return (
        <>
            <Drawer anchor={"right"} open={open} onClose={() => setOpen(!open)}>
                <List style={{ backgroundColor: "transparent", height: "100%", color: "blue" }}>
                    <ListItem>
                        <ListItemButton onClick={() => navigate('/')}>
                            <ListItemIcon>
                                {ic[0]}
                            </ListItemIcon>
                            <ListItemText primary={ll[0]} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <ListItemIcon onClick={() => navigate('/allposts/1')}>
                                {ic[1]}
                            </ListItemIcon>
                            <ListItemText primary={ll[1]} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton style={{ alignItems: 'center', justifyContent: 'center' }} onClick={() => { login ? navigate('/account') : navigate('/login') }}>
                            <ListItemIcon>
                                {login ? <AccountCircleIcon /> : <LoginIcon />}
                            </ListItemIcon>
                            <ListItemText primary={login ? "Account" : "Login"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton onClick={() => { login ? navigate('/') : navigate('/register') }}>
                            <ListItemIcon>
                                {login ? <LogoutIcon /> : <CreateIcon />}
                            </ListItemIcon>
                            <ListItemText primary={login ? "Logout" : "Signup"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <IconButton onClick={() => setOpen(!open)}>
                <MenuRoundedIcon />
            </IconButton>
        </>
    )
}

export default DrawerComponent