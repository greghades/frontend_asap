import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';

function HomeListItem({ name, icon, color = '#20528E', redirectPath, onTap }) {
  const router = useRouter();

  const iconStyle = {
    color: color,
  };

  const handleClick = () => {
    if (onTap) {
      onTap();
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
