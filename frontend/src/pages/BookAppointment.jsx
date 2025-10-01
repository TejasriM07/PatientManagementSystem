import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  MenuItem,
  Paper,
  InputAdornment,
  Divider,
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  Person,
  LocalHospital,
  EventAvailable,
  AccessTime,
  MedicalInformation,
  Schedule,
  CheckCircle
} from '@mui/icons-material';
import api from '../utils/api';

function BookAppointment() {
  const [form, setForm] = useState({
    patient: '', doctor: '', concern: '', date: '', timeSlot: ''
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const timeSlots = Array.from({ length: 26 }, (_, i) => `${8 + Math.floor(i/2)}:${i%2===0?'00':'30'}-${8 + Math.floor((i+1)/2)}:${(i+1)%2===0?'00':'30'}`);

  const steps = [
    'Select Patient',
    'Choose Doctor',
    'Schedule Appointment'
  ];

  useEffect(() => {
    api.get('/patients').then(res => setPatients(res.data));
    api.get('/doctors').then(res => setDoctors(res.data));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === 'patient' && activeStep === 0) {
      setActiveStep(1);
    } else if (name === 'doctor' && activeStep === 1) {
      setActiveStep(2);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (new Date(form.date).toDateString() === new Date().toDateString()) {
        setError('Cannot book appointment for today. Book at least a day prior.');
        return;
      }
      await api.post('/appointments/book', form);
      setError('');
      setActiveStep(3); // Show success state
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
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
          maxWidth: 800,
          mx: 'auto',
          p: 4,
          borderRadius: 4,
          background: '#ffffff',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <EventAvailable 
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
              color: 'primary.main',
              mb: 1
            }}
          >
            Book Your Appointment
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Follow the steps below to schedule your appointment
          </Typography>
        </Box>

        <Stepper 
          activeStep={activeStep} 
          sx={{ 
            mb: 6,
            '& .MuiStepLabel-root .Mui-completed': {
              color: 'primary.main'
            },
            '& .MuiStepLabel-root .Mui-active': {
              color: 'secondary.main'
            }
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Patient</InputLabel>
                <Select
                  name="patient"
                  value={form.patient}
                  onChange={handleChange}
                  required
                  startAdornment={
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  }
                >
                  {patients.map(p => (
                    <MenuItem key={p._id} value={p._id}>{p.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Doctor</InputLabel>
                <Select
                  name="doctor"
                  value={form.doctor}
                  onChange={handleChange}
                  required
                  startAdornment={
                    <InputAdornment position="start">
                      <LocalHospital color="primary" />
                    </InputAdornment>
                  }
                >
                  {doctors.map(d => (
                    <MenuItem key={d._id} value={d._id}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>Dr. {d.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {d.specialization}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField 
                label="Medical Concern" 
                name="concern" 
                fullWidth 
                multiline
                rows={3}
                value={form.concern} 
                onChange={handleChange} 
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MedicalInformation color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField 
                label="Appointment Date" 
                name="date" 
                type="date" 
                fullWidth 
                value={form.date} 
                onChange={handleChange} 
                required 
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Schedule color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Time Slot</InputLabel>
                <Select
                  name="timeSlot"
                  value={form.timeSlot}
                  onChange={handleChange}
                  required
                  startAdornment={
                    <InputAdornment position="start">
                      <AccessTime color="primary" />
                    </InputAdornment>
                  }
                >
                  {timeSlots.map(slot => (
                    <MenuItem key={slot} value={slot}>{slot}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Alert 
                  severity="error" 
                  sx={{ 
                    borderRadius: 2
                  }}
                >
                  {error}
                </Alert>
              </Grid>
            )}

            <Grid item xs={12}>
              {activeStep === 3 ? (
                <Box sx={{ textAlign: 'center' }}>
                  <CheckCircle 
                    sx={{ 
                      fontSize: 64, 
                      color: 'success.main',
                      mb: 2
                    }} 
                  />
                  <Typography variant="h5" gutterBottom sx={{ color: 'success.main' }}>
                    Appointment Booked Successfully!
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setForm({
                        patient: '', doctor: '', concern: '', date: '', timeSlot: ''
                      });
                      setActiveStep(0);
                    }}
                    sx={{ 
                      mt: 2,
                      background: 'linear-gradient(45deg, #2b6777 30%, #52ab98 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1e4b55 30%, #3a7b6d 90%)',
                      }
                    }}
                  >
                    Book Another Appointment
                  </Button>
                </Box>
              ) : (
                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth 
                  size="large"
                  startIcon={<EventAvailable />}
                  disabled={!form.patient || !form.doctor || !form.concern || !form.date || !form.timeSlot}
                  sx={{ 
                    height: 48,
                    background: 'linear-gradient(45deg, #2b6777 30%, #52ab98 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1e4b55 30%, #3a7b6d 90%)',
                    }
                  }}
                >
                  Book Appointment
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default BookAppointment;