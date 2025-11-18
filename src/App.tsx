import { Avatar, Box, Button, Container, Paper, Typography } from '@mui/material';
// Import the example assets
import ExampleIcon from './assets/icons/example-icon.svg';
import ExampleLogo from './assets/images/example-logo.png';
import { LayoutProvider } from './providers/LayoutProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { capitalizeWords, formatCurrency } from './utils/example-utils';

function App() {
  const handleExampleAction = () => {
    console.log('Example action clicked!');
    alert('Example action triggered!');
  };

  return (
    <ThemeProvider>
      <LayoutProvider>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Header with logo and icon */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Avatar
              src={ExampleIcon}
              alt="Example Icon"
              sx={{ width: 48, height: 48, bgcolor: 'primary.main' }}
            />
            <Box>
              <Typography variant="h3" component="h1" gutterBottom>
                octowalrus-frontend
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Welcome to your new React application! This template includes examples of
                components, pages, utilities, and tests to help you get started.
              </Typography>
            </Box>
          </Box>

          {/* Asset showcase section */}
          <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
            <Typography variant="h5" gutterBottom>
              Asset Examples
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Example Icon (SVG)
                </Typography>
                <Box
                  component="img"
                  src={ExampleIcon}
                  alt="Example Icon"
                  sx={{
                    width: 64,
                    height: 64,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                  }}
                />
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Example Logo (PNG)
                </Typography>
                <Box
                  component="img"
                  src={ExampleLogo}
                  alt="Example Logo"
                  sx={{
                    width: 120,
                    height: 60,
                    objectFit: 'contain',
                    bgcolor: 'white',
                    borderRadius: 1,
                    p: 1,
                    border: '1px solid',
                    borderColor: 'grey.300',
                    '&:hover': {
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      transition: 'box-shadow 0.2s ease-in-out',
                    },
                  }}
                />
              </Box>
            </Box>
          </Paper>

          {/* Example of using utility functions */}
          <Box sx={{ mb: 4, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Utility Function Examples
            </Typography>
            <Typography variant="body2">
              Currency formatting: {formatCurrency(1234.56)} | Text capitalization:{' '}
              {capitalizeWords('react typescript example')}
            </Typography>
          </Box>

          {/* Example components section - placeholder for your actual components */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Components Available
            </Typography>
            <Paper sx={{ p: 3 }}>
              <Typography variant="body2">
                Your components are located in <code>src/components/</code>. Current components
                include: Header, Footer, Nav, and MainLayoutProvider.
              </Typography>
              <Button variant="contained" onClick={handleExampleAction} sx={{ mt: 2 }}>
                Example Action
              </Button>
            </Paper>
          </Box>

          {/* Link to example page */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Example Page
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Check out the ExamplePage component for a more complex example with state management.
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                // In a real app, this would navigate to the page
                console.log('Navigate to ExamplePage');
              }}
            >
              View Example Page
            </Button>
          </Box>

          {/* Development info */}
          <Box
            sx={{
              mt: 6,
              p: 3,
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Development Resources
            </Typography>
            <Typography variant="body2" component="div">
              <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                <li>
                  Components are in <code>src/components/</code> with colocated tests
                </li>
                <li>
                  Pages are in <code>src/pages/</code> for route-level components
                </li>
                <li>
                  Utilities are in <code>src/utils/</code> for reusable functions
                </li>
                <li>
                  Assets are in <code>src/assets/</code> for images, icons, etc.
                </li>
                <li>
                  Stories are in <code>src/components/*/ComponentName.stories.tsx</code>
                </li>
              </ul>
            </Typography>
          </Box>
        </Container>
      </LayoutProvider>
    </ThemeProvider>
  );
}

export default App;
