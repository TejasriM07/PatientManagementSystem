import React, { useContext, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import AuthContext from './context/AuthContext';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Box } from '@mui/material';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookAppointment from './pages/BookAppointment';
import AddDoctor from './pages/AddDoctor';
import DoctorsList from './pages/DoctorsList';
import AddPatient from './pages/AddPatient';
import AppointmentList from './pages/AppointmentList';
import NotFound from './pages/NotFound';
import getDesignTokens from './theme';

function App() {
  const { user, themeMode } = useContext(AuthContext);
  const theme = useMemo(() => createTheme(getDesignTokens(themeMode)), [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {user && <Sidebar />}
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', ...(user && { marginLeft: '280px' }) }}>
          <Header />
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/book" element={user ? <BookAppointment /> : <Navigate to="/login" />} />
              <Route path="/add-doctor" element={user ? <AddDoctor /> : <Navigate to="/login" />} />
              <Route path="/doctors" element={user ? <DoctorsList /> : <Navigate to="/login" />} />
              <Route path="/add-patient" element={user ? <AddPatient /> : <Navigate to="/login" />} />
              <Route path="/appointments" element={user ? <AppointmentList /> : <Navigate to="/login" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;