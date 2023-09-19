'use client'
import { Button, AppBar, Toolbar, Container, Drawer, List, ListItem, ListItemText, IconButton, ListItemButton, ListItemAvatar } from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';
import burguer from './burguer.png';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <AppBar sx={{ backgroundColor: '#FF5733' }}>
        <Toolbar>
          <IconButton onClick={toggleMenu} edge="start" color="inherit" aria-label="menu">
            <Image src={burguer} alt="Menu Icon" width={32} height={32} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container
        fixed
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Your content goes here */}
      </Container>
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu} sx={{ width: '250px' }}>
        <List sx={{ height: '100%' }}>
        <ListItem>
            <IconButton onClick={toggleMenu}>
              <Image src={burguer} alt="Burger Icon" width={32} height={32} />
            </IconButton>
          </ListItem>
          <ListItem button onClick={toggleMenu}>
            <ListItemText primary="Administrar usuario" />
          </ListItem>
          <ListItem button onClick={toggleMenu}>
            <ListItemText primary="Inventarios" />
          </ListItem>
          <ListItem button onClick={toggleMenu}>
            <ListItemText primary="Platillos del menú" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}








// import { Input, Text } from '../components';
// import { AppBar, Button, Toolbar, Box, Container } from '@mui/material';

// export default function Home() {
//   return (
//     <div>
//     <AppBar position="static"  sx={{ backgroundColor: '#FF5733' }}>
//       <Toolbar>
//           <Button variant="text" color="inherit" sx={{fontWeight: 'bold'}}>Administrar usuario</Button>
//           <Button variant="text" color="inherit" sx={{fontWeight: 'bold'}}>Platillos del menú</Button>
//           <Button variant="text" color="inherit" sx={{fontWeight: 'bold'}}>Inventarios</Button>
//           <Button variant="text" color="inherit" sx={{fontWeight: 'bold'}}>Reportes</Button>
//       </Toolbar>
//     </AppBar>
//     <Container
//       fixed
//       sx={{
//         height: 'calc(85vh - 64px)', // Subtract the height of the AppBar
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       {/* Your content goes here */}
//     </Container>
//   </div>
// 	)
// }
