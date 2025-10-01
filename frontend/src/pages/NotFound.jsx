import React from 'react';
import { Box, Typography } from '@mui/material';

function NotFound() {
  return (
    <Box sx={{ p: 8, textAlign: 'center' }}>
      <Typography variant="h3" color="error">404 - Page Not Found</Typography>
    </Box>
  );
}

export default NotFound;
