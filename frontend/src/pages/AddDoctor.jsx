import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button,
  Paper,
  InputAdornment,
  Divider,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Person,
  Badge,
  MedicalServices,
  School,
  WorkHistory,
  LocalHospital
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

function AddDoctor() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', 
    doctorId: '', 
    department: '', 
    specialization: '', 
    experience: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'experience' ? Number(value) || '' : value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!form.name.trim()) return 'Doctor name is required';
    if (!form.doctorId.trim()) return 'Doctor ID is required';
    if (!form.department.trim()) return 'Department is required';
    if (!form.specialization.trim()) return 'Specialization is required';
    if (!form.experience || form.experience < 0) return 'Valid experience is required';
    return null;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await api.post('/doctors/add', form);
      setSuccess(true);
      setError('');
      // Reset form
      setForm({
        name: '', 
        doctorId: '', 
        department: '', 
        specialization: '', 
        experience: ''
      });
      // Navigate to doctors list after 2 seconds
      setTimeout(() => {
        navigate('/doctors');
      }, 2000);
    } catch (err) {
      if (err.response?.data?.message?.includes('duplicate key')) {
        setError('Doctor ID already exists. Please use a different ID.');
      } else {
        setError(err.response?.data?.message || 'Failed to add doctor. Please try again.');
      }
    }
  };

  return (
    <Box 
      sx={{ 
        p: 4,
        minHeight: 'calc(100vh - 64px)',
        bgcolor: 'background.default'
      }}
    >
      <Paper
        elevation={2}
        sx={{
          maxWidth: 600,
          mx: 'auto',
          p: 4,
          borderRadius: 4,
          background: '#ffffff',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <LocalHospital 
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
              color: 'primary.main'
            }}
          >
            Add New Doctor
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Enter the doctor's details below
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <form onSubmit={handleSubmit}>
          <TextField 
            label="Doctor Name" 
            name="name" 
            fullWidth 
            margin="normal" 
            value={form.name} 
            onChange={handleChange} 
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <TextField 
            label="Doctor ID" 
            name="doctorId" 
            fullWidth 
            margin="normal" 
            value={form.doctorId} 
            onChange={handleChange} 
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Badge color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <TextField 
            label="Department" 
            name="department" 
            fullWidth 
            margin="normal" 
            value={form.department} 
            onChange={handleChange} 
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MedicalServices color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <TextField 
            label="Specialization" 
            name="specialization" 
            fullWidth 
            margin="normal" 
            value={form.specialization} 
            onChange={handleChange} 
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <School color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <TextField 
            label="Experience (years)" 
            name="experience" 
            type="number" 
            fullWidth 
            margin="normal" 
            value={form.experience} 
            onChange={handleChange} 
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WorkHistory color="primary" />
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
            startIcon={<LocalHospital />}
            sx={{ 
              mt: 2,
              height: 48,
              background: 'linear-gradient(45deg, #2b6777 30%, #52ab98 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1e4b55 30%, #3a7b6d 90%)',
              }
            }}
          >
            Add Doctor
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSuccess(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Doctor added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddDoctor;