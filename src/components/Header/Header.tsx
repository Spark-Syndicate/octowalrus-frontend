import { Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          octowalrus-frontend
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {/* Additional header actions can be added here */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
