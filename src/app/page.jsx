'use client';   
import * as React from 'react';
import { Box, AppBar, Toolbar, Drawer, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Divider, Typography, CssBaseline } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import HomeListItem from '@/components/HomeListItem';
import { useRouter } from 'next/navigation';
import { useAuth, useUserSystemStore } from '@/hooks';

const drawerWidth = 240;

export default function Home() {
  const router = useRouter();
  const userSystem = useUserSystemStore((state) => state.userSystem);
  const username = userSystem.name;
  const { isAuth } = useAuth();

	// if (!isAuth) {
  //   return router.push('/login');
  // }

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#EEEEEE', minHeight: '100vh' }}>
      <CssBaseline />
      {/* Barra de navegacion */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#2E77BB'}}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <RestaurantMenuIcon sx={{marginRight: '8px'}}/>
          <Typography variant="h6" component="div" sx={{fontWeight: 'bold', textShadow: '1px 1px 4px black'}}>
            SISTEMA ASAP
          </Typography>
          <Typography variant="h8" component="div" sx={{fontWeight: 'light', flex: 1, textAlign: 'center'}}>
            Bienvenido, {username}. 
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Menu lateral */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box'},
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <HomeListItem name="Home" icon={<HomeRoundedIcon />} redirectPath="/" />
            <Divider />
            <HomeListItem name="Platillos del menú" icon={<RestaurantRoundedIcon />} redirectPath="/" />
            <Divider />
            <HomeListItem name="Inventarios" icon={<Inventory2RoundedIcon />} redirectPath="/" />
            <Divider />
            <HomeListItem name="Iniciar sesión" icon={<LoginRoundedIcon />} redirectPath="/login" />
            <Divider />
            <HomeListItem name="Registrarse" icon={<AppRegistrationRoundedIcon />} redirectPath="/" />

            <HomeListItem name="Cerrar sesión" icon={<ExitToAppRoundedIcon />} redirectPath="/login" shouldLogout={true} />
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
}