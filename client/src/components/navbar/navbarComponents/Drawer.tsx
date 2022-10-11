import { Drawer, IconButton, ListItem } from "@mui/material";
import { useState } from "react";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { linksInNavbar as ll, iconsInDrawer as ic } from "./links";


function DrawerComponent() {

    const [open, setOpen] = useState(false)

    return (
        <>
            <Drawer anchor={"right"} open={open} onClose={() => setOpen(!open)}>
                <List>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                {ic[0]}
                            </ListItemIcon>
                            <ListItemText primary={ll[0]} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <ListItemIcon>
                                {ic[1]}
                            </ListItemIcon>
                            <ListItemText primary={ll[1]} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <ListItemIcon>
                                {ic[2]}
                            </ListItemIcon>
                            <ListItemText primary={"Account"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                {ic[3]}
                            </ListItemIcon>
                            <ListItemText primary={"Cart"} />
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