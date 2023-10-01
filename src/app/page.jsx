'use client';
import * as React from 'react';
import { useState } from 'react';
import { Box, AppBar, Toolbar, Drawer, List, Divider, Typography, CssBaseline } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import HomeListItem from '@/components/HomeListItem';
import { useRouter } from 'next/navigation';
import { useAuth, useUserSystemStore } from '@/hooks';
import Inventory from './inventory/page';
import AddProduct from './inventory/addProduct/page';

const drawerWidth = 240;

export default function Home() {
  const router = useRouter();
  const userSystem = useUserSystemStore((state) => state.userSystem);
  const logout = useUserSystemStore((state) => state.logout);
  const username = userSystem.name;
  const { isAuth } = useAuth();
  const [showInventory, setShowInventory] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);

  // Function to switch to Inventory
  const switchToInventory = () => {
    setShowInventory(true);
    setShowProductForm(false);
  };

  // Function to switch to ProductForm
  const switchToProductForm = () => {
    switchToDefault();
    setShowProductForm(true);
  };

  // Function to return to default content (Typography)
  const switchToDefault = () => {
    setShowProductForm(false);
    setShowInventory(false);
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#EEEEEE', minHeight: '100vh' }}>
      <CssBaseline />
      {/* Barra de navegacion */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#20528E' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <RestaurantMenuIcon sx={{ marginRight: '8px' }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', textShadow: '1px 1px 4px black' }}>
            SISTEMA ASAP
          </Typography>
          <Typography variant="h8" component="div" sx={{ fontWeight: 'light', flex: 1, textAlign: 'center' }}>
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
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <HomeListItem name="Home" icon={<HomeRoundedIcon />} redirectPath="/" onTap={() => {
              switchToDefault();
            }} />
            <Divider />
            <HomeListItem name="Platillos del menú" icon={<RestaurantRoundedIcon />} redirectPath="/" onTap={() => {
              switchToDefault();
            }} />
            <Divider />
            <HomeListItem name="Inventarios" icon={<Inventory2RoundedIcon />} onTap={() => {
              console.log('Inventory', showInventory);
              switchToInventory();
            }} />
            <Divider />
            <HomeListItem name="Cerrar sesión" icon={<ExitToAppRoundedIcon />} redirectPath="/login" onTap={() => {
              logout();
              router.push('/login');
            }} />
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {showInventory ? (
        <Inventory onAddProduct={switchToProductForm} />
      ) : showProductForm ? (
        <AddProduct onBack={switchToInventory} />
      ) : (
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
      )}

      {/* Conditionally render buttons based on the active component
      {!showInventory && !showProductForm && (
        <button onClick={switchToInventory}>Show Inventory</button>
      )}
      {showInventory && (
        <button onClick={switchToProductForm}>Add Product</button>
      )}
      {showProductForm && (
        <button onClick={switchToInventory}>Back to Inventory</button>
      )} */}

        {/* {showInventory ? (
          <Inventory />
        ) : (
          <>  
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
          </>
        )} */}
      </Box>
    </Box>
  );
}