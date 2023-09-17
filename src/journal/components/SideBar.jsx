import { Avatar, Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { SideBarItem } from "./SideBarItem";
import { stringAvatar } from "../../helpers";


export const SideBar = ({drawerWidth = 240}) => {

    const { displayName, photoURL } = useSelector(state => state.auth);
    const { notes } = useSelector(state => state.journal);
  
    return (
        <Box
            component='nav'
            sx={{width: {  sm: drawerWidth}, flexShrink: {sm: 0} }}
        >

            <Drawer
                variant="permanent" // temporary si se quiere ocultar o mostrar de manera condicional
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth}
                }}
            >

                <Toolbar>
                    {
                        (!!photoURL)
                            ? <Avatar alt={displayName} src={photoURL} />
                            : <Avatar {...stringAvatar(displayName)} />
                    }
                    <Typography sx={{ml:2}} variant="h6" noWrap component='div'>
                        {displayName}
                    </Typography>
                </Toolbar>

                <Divider />

                <List>
                    {
                        notes.map( note => (
                            <SideBarItem key={note.id} {...note}/>
                        ))
                    }
                </List>

            </Drawer>

        </Box>
    )
}
