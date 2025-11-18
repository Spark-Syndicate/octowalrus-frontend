import { useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { NavDrawer } from './NavDrawer';

export const Nav = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (isMobile) {
    return (
      <NavDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      />
    );
  }

  return (
    <NavDrawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
          position: 'relative',
        },
      }}
    />
  );
};
