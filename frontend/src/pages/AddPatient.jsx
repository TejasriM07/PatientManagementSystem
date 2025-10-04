import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Alert } from '@mui/material';
import {
  Person,
  Search,
  Phone,
  LocationOn,
  Wc,
  CalendarToday,
  LocalHospital,
  Event,
  MedicalInformation,
  PersonAdd,
  AccessTime
} from '@mui/icons-material';
import api from '../utils/api';

function AddPatient() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', gender: '', age: '', contactNumber: '', place: '', consultationHistory: [] });
  const [isFirstVisit, setIsFirstVisit] = useState('Yes');
  const [additionalFields, setAdditionalFields] = useState({ dateVisited: '', attendingDoctor: '', concern: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/patients').then(res => setPatients(res.data));
  }, []);

  const handleSearch = async () => {
    const res = await api.get('/patients/search?query=' + search);
    setPatients(res.data);
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleAdditionalFieldsChange = e => setAdditionalFields({ ...additionalFields, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let finalForm = { ...form };
      if (isFirstVisit === 'No') {
        finalForm.consultationHistory = [additionalFields];
      }
      await api.post('/patients/add', finalForm);
      setError('');
      alert('Patient added!');
    } catch (err) {
      setError(err.response?.data?.message || 'Adding patient failed');
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
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4,
          color: 'primary.main',
          fontWeight: 600
        }}
      >
        Patient Management
      </Typography>

      <Grid container spacing={4}>
        {/* Search and Patient List Section */}
        <Grid item xs={12} md={7}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 4,
              background: '#ffffff',
            }}
          >
            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                placeholder="Search patient name or contact"
                value={search}
                onChange={e => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button 
                variant="contained" 
                onClick={handleSearch}
                sx={{
                  px: 4,
                  background: 'linear-gradient(45deg, #2b6777 30%, #52ab98 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1e4b55 30%, #3a7b6d 90%)',
                  }
                }}
              >
                Search
              </Button>
            </Box>

            <Box sx={{ display: 'grid', gap: 2 }}>
              {patients.map(p => (
                <Card 
                  key={p._id} 
                  elevation={1}
                  sx={{ 
                    borderRadius: 3,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {p.name}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                          <Chip 
                            icon={<Wc />} 
                            label={p.gender} 
                            size="small" 
                            color="primary" 
                            variant="outlined" 
                          />
                          <Chip 
                            icon={<CalendarToday />} 
                            label={`${p.age} years`} 
                            size="small" 
                            color="primary" 
                            variant="outlined" 
                          />
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Phone fontSize="small" color="primary" />
                        <Typography variant="body2">{p.contactNumber}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOn fontSize="small" color="primary" />
                        <Typography variant="body2">{p.place}</Typography>
                      </Box>
                    </Box>

                    {p.consultationHistory.length > 0 && (
                      <>
                        <Divider sx={{ my: 2 }} />
                        <Typography 
                          variant="subtitle2" 
                          sx={{ 
                            color: 'primary.main',
                            fontWeight: 600,
                            mb: 1.5 
                          }}
                        >
                          Recent Consultations
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {p.consultationHistory.map((h, i) => (
                            <Box 
                              key={i}
                              sx={{ 
                                p: 2,
                                bgcolor: 'background.default',
                                borderRadius: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocalHospital fontSize="small" color="primary" />
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  Dr. {h.doctor}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Event fontSize="small" color="primary" />
                                <Typography variant="body2">{h.date}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <MedicalInformation fontSize="small" color="primary" />
                                <Typography variant="body2">{h.concern}</Typography>
                              </Box>
                              <Chip
                                size="small"
                                label={h.treated ? "Treated" : "Pending"}
                                color={h.treated ? "success" : "warning"}
                                sx={{ alignSelf: 'flex-start' }}
                              />
                            </Box>
                          ))}
                        </Box>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Add Patient Form Section */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 4,
              background: '#ffffff',
              position: 'sticky',
              top: 24
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <PersonAdd 
                sx={{ 
                  fontSize: 40, 
                  color: 'primary.main',
                  mb: 2
                }} 
              />
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 600,
                  color: 'primary.main'
                }}
              >
                Add New Patient
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <TextField 
                label="Patient Name" 
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

              <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  startAdornment={
                    <InputAdornment position="start">
                      <Wc color="primary" />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>

              <TextField 
                label="Age" 
                name="age" 
                type="number" 
                fullWidth 
                margin="normal" 
                value={form.age} 
                onChange={handleChange} 
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarToday color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <TextField 
                label="Contact Number" 
                name="contactNumber" 
                fullWidth 
                margin="normal" 
                value={form.contactNumber} 
                onChange={handleChange} 
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <TextField 
                label="Place" 
                name="place" 
                fullWidth 
                margin="normal" 
                value={form.place} 
                onChange={handleChange} 
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <FormControl component="fieldset" margin="normal" sx={{ mb: 3, width: '100%' }}>
                <FormLabel component="legend">Is this the first visit?</FormLabel>
                <RadioGroup row name="isFirstVisit" value={isFirstVisit} onChange={(e) => setIsFirstVisit(e.target.value)}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>

              {isFirstVisit === 'No' && (
                <Box>
                  <TextField 
                    label="Date Visited" 
                    name="dateVisited" 
                    type="date"
                    fullWidth 
                    margin="normal" 
                    value={additionalFields.dateVisited} 
                    onChange={handleAdditionalFieldsChange} 
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3 }}
                  />
                  <TextField 
                    label="Attending Doctor" 
                    name="attendingDoctor" 
                    fullWidth 
                    margin="normal" 
                    value={additionalFields.attendingDoctor} 
                    onChange={handleAdditionalFieldsChange} 
                    required
                    sx={{ mb: 3 }}
                  />
                  <TextField 
                    label="Concern" 
                    name="concern" 
                    fullWidth 
                    margin="normal" 
                    multiline
                    rows={3}
                    value={additionalFields.concern} 
                    onChange={handleAdditionalFieldsChange} 
                    required
                    sx={{ mb: 3 }}
                  />
                </Box>
              )}

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
                startIcon={<PersonAdd />}
                sx={{ 
                  height: 48,
                  background: 'linear-gradient(45deg, #2b6777 30%, #52ab98 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1e4b55 30%, #3a7b6d 90%)',
                  }
                }}
              >
                Add Patient
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddPatient;