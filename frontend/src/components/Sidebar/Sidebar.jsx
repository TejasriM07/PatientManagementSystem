import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';
import { 
  Home,
  EventAvailable,
  LocalHospital,
  People,
  DateRange,
  Logout,
  PersonAdd
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const sidebarLinks = [
  { label: 'Home', path: '/dashboard', icon: <Home /> },
  { label: 'Book Now', path: '/book', icon: <EventAvailable /> },
  { label: 'Doctors List', path: '/doctors', icon: <LocalHospital /> },
  { label: 'Add Doctor', path: '/add-doctor', icon: <PersonAdd /> },
  { label: 'Add Patient', path: '/add-patient', icon: <People /> },
  { label: 'Appointment List', path: '/appointments', icon: <DateRange /> },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #2b6777 0%, #52ab98 100%)',
          color: '#ffffff',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 600 }}>
          My Hospital
        </Typography>
      </Box>
      <List>
        {sidebarLinks.map((link) => (
          <ListItem key={link.label} disablePadding>
            <ListItemButton
              onClick={() => navigate(link.path)}
              sx={{
                mb: 1,
                mx: 1,
                borderRadius: 2,
                backgroundColor: location.pathname === link.path ? 'rgba(255,255,255,0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#ffffff' }}>
                {link.icon}
              </ListItemIcon>
              <ListItemText 
                primary={link.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: location.pathname === link.path ? 600 : 400,
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              mt: 2,
              mx: 1,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#ffffff' }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
