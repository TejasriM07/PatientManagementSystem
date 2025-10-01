import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../utils/api';
import { 
  Button, 
  TextField, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  InputAdornment,
  IconButton 
} from '@mui/material';
import { 
  Person, 
  Lock, 
  Visibility, 
  VisibilityOff,
  Login as LoginIcon 
} from '@mui/icons-material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { username, password });
      login(res.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
          maxWidth: 400,
          width: '100%',
          borderRadius: 4,
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 600,
                background: 'linear-gradient(45deg, #2b6777 30%, #52ab98 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Please sign in to continue
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
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
              sx={{ mb: 2 }}
            />

            {error && (
              <Typography 
                color="error" 
                sx={{ 
                  mb: 2,
                  p: 1.5,
                  bgcolor: 'error.light',
                  borderRadius: 1,
                  color: 'error.dark'
                }}
              >
                {error}
              </Typography>
            )}

            <Button 
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              startIcon={<LoginIcon />}
              sx={{ 
                mt: 2,
                mb: 2,
                height: 48,
                background: 'linear-gradient(45deg, #2b6777 30%, #52ab98 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1e4b55 30%, #3a7b6d 90%)',
                }
              }}
            >
              Sign In
            </Button>

            <Button 
              color="primary"
              fullWidth
              onClick={() => navigate('/register')}
              sx={{ 
                mt: 1,
                textTransform: 'none',
                '&:hover': {
                  background: 'rgba(43, 103, 119, 0.08)'
                }
              }}
            >
              Don't have an account? Create one
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;