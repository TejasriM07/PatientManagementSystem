import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Checkbox, 
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  FormControlLabel,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid
} from '@mui/material';
import { 
  Search,
  Delete,
  Edit,
  CheckCircle,
  Event,
  AccessTime,
  Person,
  LocalHospital,
  Save
} from '@mui/icons-material';
import api from '../utils/api';

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  useEffect(() => {
    api.get('/appointments')
      .then(res => setAppointments(res.data))
      .catch(err => setError('Failed to load appointments'));
  }, []);

  const handleSearch = async () => {
    try {
      const res = await api.get('/appointments/search', {
        params: { query: search }
      });
      setAppointments(res.data);
    } catch (err) {
      setError('Failed to search appointments');
    }
  };

  const handleDelete = async id => {
    try {
      await api.delete(`/appointments/${id}`);
      setAppointments(appointments.filter(a => a._id !== id));
    } catch (err) {
      setError('Failed to delete appointment');
    }
  };

  const handleTreated = async (id, treated) => {
    try {
      await api.patch(`/appointments/${id}/treated`, { treated });
      setAppointments(appointments.map(a => a._id === id ? { ...a, treated } : a));
    } catch (err) {
      setError('Failed to update appointment status');
    }
  };

  const handleEdit = (appointment) => {
    setCurrentAppointment(appointment);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setCurrentAppointment(null);
  };

  const handleSaveEdit = () => {
    // This is a mock save function. In a real app, you would call your backend API here.
    const updatedAppointments = appointments.map(a => 
      a._id === currentAppointment._id ? currentAppointment : a
    );
    setAppointments(updatedAppointments);
    handleCloseEditDialog();
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box sx={{ p: 4, }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, color: 'primary.main', fontWeight: 600 }}>
        Appointment List
      </Typography>
      
      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          label="Search appointments"
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 400 }}
        />
        <Button 
          variant="contained" 
          onClick={handleSearch}
          sx={{ px: 4 }}
        >
          Search
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {appointments.map(a => (
          <Grid item xs={12} key={a._id}>
            <Card 
              elevation={2}
              sx={{ 
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                },
                borderRadius: 4,
                width: '100%',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Chip 
                    label={a.treated ? "Treated" : "Pending"}
                    color={a.treated ? "success" : "warning"}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" color="primary" onClick={() => handleEdit(a)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(a._id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Person color="primary" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {a.patient?.name || 'N/A'}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocalHospital color="primary" />
                    <Typography variant="body1">
                      {a.doctor?.name || 'N/A'}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Event color="primary" />
                    <Typography variant="body1">
                      {a.date}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTime color="primary" />
                    <Typography variant="body1">
                      {a.timeSlot}
                    </Typography>
                  </Box>

                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      mt: 1,
                      p: 1.5, 
                      bgcolor: 'background.default',
                      borderRadius: 1,
                    }}
                  >
                    {a.concern}
                  </Typography>

                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={a.treated} 
                        onChange={e => handleTreated(a._id, e.target.checked)}
                        icon={<CheckCircle />}
                        checkedIcon={<CheckCircle color="success" />}
                      />
                    }
                    label="Mark as treated"
                    sx={{ mt: 1 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Appointment</DialogTitle>
        <DialogContent>
          {currentAppointment && (
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                name="date"
                label="Date"
                type="date"
                fullWidth
                margin="normal"
                value={currentAppointment.date}
                onChange={handleEditFormChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                name="timeSlot"
                label="Time Slot"
                fullWidth
                margin="normal"
                value={currentAppointment.timeSlot}
                onChange={handleEditFormChange}
              />
              <TextField
                name="concern"
                label="Concern"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={currentAppointment.concern}
                onChange={handleEditFormChange}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveEdit} 
            variant="contained" 
            startIcon={<Save />}
            sx={{
              background: 'linear-gradient(45deg, #2b6777 30%, #52ab98 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1e4b55 30%, #3a7b6d 90%)',
              }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AppointmentList;