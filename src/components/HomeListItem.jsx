import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useUserSystemStore } from '@/hooks';

function HomeListItem({ name, icon, color = '#2E77BB', redirectPath, shouldLogout = false }) {
  const logout = useUserSystemStore((state) => state.logout)
  const router = useRouter();

  const iconStyle = {
    color: color,
  };

  const handleClick = () => {
    if (shouldLogout == true) {
      logout();
    }

    if (redirectPath) {
      router.push(redirectPath);
    }
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon style={iconStyle}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
}

export default HomeListItem;
