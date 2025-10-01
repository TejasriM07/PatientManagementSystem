import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { 
  Button, 
  TextField, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  MenuItem,
  InputAdornment,
  IconButton,
  Alert,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { 
  Person, 
  Lock, 
  Visibility, 
  VisibilityOff,
  Email,
  Badge,
  ArrowBack,
  HowToReg
} from '@mui/icons-material';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('Patient');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { email, username, role, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #2b6777 0%, #52ab98 100%)',
        p: 3
      }}
    >
      <Card 
        sx={{ 
          maxWidth: 450,
          width: '100%',
          borderRadius: 4,
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <HowToReg 
              sx={{ 
                fontSize: 48, 
                color: 'primary.main',
                mb: 2
              }} 
            />
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 600,
                background: 'linear-gradient(45deg, #2b6777 30%, #52ab98 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Join us to experience better healthcare
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField 
              label="Email Address" 
              fullWidth 
              margin="normal" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required
              type="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField 
              label="Username" 
              fullWidth 
              margin="normal" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                onChange={e => setRole(e.target.value)}
                required
                startAdornment={
                  <InputAdornment position="start">
                    <Badge color="primary" />
                  </InputAdornment>
                }
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="staff">Staff</MenuItem>
                <MenuItem value="Patient">Patient</MenuItem>
              </Select>
            </FormControl>

            <TextField 
              label="Password" 
              type={showPassword ? 'text' : 'password'}
              fullWidth 
              margin="normal" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2
                }}
              >
                {error}
              </Alert>
            )}

            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              size="large"
              startIcon={<HowToReg />}
              sx={{ 
                mb: 2,
                height: 48,
                background: 'linear-gradient(45deg, #2b6777 30%, #52ab98 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1e4b55 30%, #3a7b6d 90%)',
                }
              }}
            >
              Create Account
            </Button>

            <Button 
              color="primary"
              fullWidth
              startIcon={<ArrowBack />}
              onClick={() => navigate('/login')}
              sx={{ 
                textTransform: 'none',
                '&:hover': {
                  background: 'rgba(43, 103, 119, 0.08)'
                }
              }}
            >
              Back to Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Register;