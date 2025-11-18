import { Box, Container, Divider, Link, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 3,
        px: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} octowalrus-frontend. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="#" variant="body2" color="text.secondary">
              Privacy Policy
            </Link>
            <Link href="#" variant="body2" color="text.secondary">
              Terms of Service
            </Link>
            <Link href="#" variant="body2" color="text.secondary">
              Contact
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
