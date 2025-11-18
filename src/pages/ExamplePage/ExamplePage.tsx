import { Alert, Box, Button, Container, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import type React from 'react';
import { useEffect, useState } from 'react';

export const ExamplePage: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleTakeAction = () => {
    setCounter((prev) => prev + 1);
    setShowAlert(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Example Page
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        This is an example page demonstrating how to structure page-level components.
      </Typography>

      {showAlert && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Action completed! Counter is now {counter}.
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Interactive Component
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">Clicks: {counter}</Typography>
              <Button variant="contained" onClick={handleTakeAction} sx={{ mt: 2 }}>
                Take Action
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Static Component
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="outlined" onClick={() => setCounter(0)} disabled={counter === 0}>
          Reset Counter
        </Button>
      </Box>
    </Container>
  );
};
