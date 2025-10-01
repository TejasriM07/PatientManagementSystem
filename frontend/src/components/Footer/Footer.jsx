import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
  <Box 
      sx={{ 
        background: 'linear-gradient(45deg, #2b6777 30%, #52ab98 90%)', 
        color: '#fff', 
        p: 2, 
        textAlign: 'center', 
        mt: 4, 
        position: 'relative', 
        bottom: 0 
      }}
    >
      <Typography variant="body2">&copy; {new Date().getFullYear()} My Hospital. All rights reserved.</Typography>
    </Box>
  );
}

export default Footer;