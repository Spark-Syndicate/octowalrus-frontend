import { ContactMail, Home, Info } from '@mui/icons-material';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  type SxProps,
  type Theme,
} from '@mui/material';

const navItems = [
  { text: 'Home', icon: <Home />, path: '/' },
  { text: 'About', icon: <Info />, path: '/about' },
  { text: 'Contact', icon: <ContactMail />, path: '/contact' },
];

interface NavDrawerProps {
  variant: 'temporary' | 'permanent';
  open?: boolean;
  onClose?: () => void;
  sx?: SxProps<Theme>;
}

export const NavDrawer = ({ variant, open, onClose, sx }: NavDrawerProps) => {
  const drawerContent = (
    <Box sx={{ width: 250 }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box component="nav">
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={sx}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};
