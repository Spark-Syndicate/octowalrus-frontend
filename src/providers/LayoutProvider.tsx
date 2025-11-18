import { Box } from '@mui/material';
import type React from 'react';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Nav } from '../components/Nav';

interface LayoutProviderProps {
  children: React.ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Nav />
        <Box
          component="main"
          sx={{
            flex: 1,
            p: 3,
            ml: { md: '250px' }, // Account for permanent drawer width on desktop
          }}
        >
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
