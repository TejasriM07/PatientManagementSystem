import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import AuthContext from '../../context/AuthContext';

function Header() {
  const { toggleTheme } = useContext(AuthContext);
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(45deg, #2b6777 30%, #52ab98 90%)'
          : theme.palette.background.paper,
      }}
    >
      <Toolbar>
        <img src="./hlogo.png" alt="Hospital Logo" style={{ height: 40, marginRight: 16 }} />
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            // Color from your palette
            color: theme.palette.mode === 'light' ? 'primary.contrastText' : 'primary.light',
            // New font family
            fontFamily: "'Montserrat', 'Poppins', sans-serif"
          }}
        >
          The city hospital
        </Typography>
        <IconButton color="inherit" onClick={toggleTheme}>
          <Brightness4Icon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;