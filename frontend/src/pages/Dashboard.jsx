import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography 
} from '@mui/material';
import { 
  LocalHospital,
  Group,
  EventAvailable,
  ArrowForward,
  Star,
  PersonAdd,
  CheckCircle,
  Schedule
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    upcomingAppointments: 0
  });
  const [topDoctors, setTopDoctors] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);

  useEffect(() => {
    // Fetch statistics
    api.get('/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error('Error fetching stats:', err));
    
    // Fetch top doctors
    api.get('/doctors')
      .then(res => {
        setTopDoctors(res.data.slice(0, 4)); // Get top 4 doctors
      })
      .catch(err => console.error('Error fetching doctors:', err));

    setRecentReviews([
      { 
        id: 1, 
        patient: 'John D.', 
        rating: 5, 
        comment: "Excellent care and very professional staff. The doctors are knowledgeable and take time to explain everything.",
        date: '2023-09-15'
      },
      { 
        id: 2, 
        patient: 'Sarah M.', 
        rating: 4, 
        comment: "Very clean facility and friendly staff. Wait times could be shorter but overall great experience.",
        date: '2023-09-14'
      },
    ]);
  }, []);

  return (
    <Box 
      sx={{ 
        p: 4, 
        minHeight: 'calc(100vh - 64px)',
        bgcolor: 'background.default'
      }}
    >
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          background: 'linear-gradient(45deg, #2b6777 30%, #52ab98 90%)',
          color: 'primary.contrastText',
          borderRadius: 4,
          overflow: 'hidden',
          mb: 4,
          p: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
          Welcome to My Hospital
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
          Your health is our priority. Experience world-class healthcare.
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          endIcon={<ArrowForward />}
          onClick={() => navigate('/book')}
          sx={{ 
            bgcolor: '#ffffff',
            color: 'primary.main',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.9)',
            }
          }}
        >
          Book an Appointment
        </Button>

        {/* Decorative circles */}
        <Box 
          sx={{ 
            position: 'absolute',
            right: -100,
            top: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          }}
        />
      </Paper>

      {/* Statistics Cards */}
      <MuiGrid container spacing={3} sx={{ mb: 4 }}>
        <MuiGrid item xs={12} sm={6} md={3}>
          <Card 
            elevation={2}
            sx={{ 
              borderRadius: 4,
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.light',
                    width: 56,
                    height: 56,
                  }}
                >
                  <LocalHospital fontSize="large" />
                </Avatar>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {stats.totalDoctors}
              </Typography>
              <Typography color="text.secondary">
                Total Doctors
              </Typography>
            </CardContent>
          </Card>
        </MuiGrid>

        <MuiGrid item xs={12} sm={6} md={3}>
          <Card 
            elevation={2}
            sx={{ 
              borderRadius: 4,
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'secondary.light',
                    width: 56,
                    height: 56,
                  }}
                >
                  <Group fontSize="large" />
                </Avatar>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {stats.totalPatients}
              </Typography>
              <Typography color="text.secondary">
                Total Patients
              </Typography>
            </CardContent>
          </Card>
        </MuiGrid>

        <MuiGrid item xs={12} sm={6} md={3}>
          <Card 
            elevation={2}
            sx={{ 
              borderRadius: 4,
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'success.light',
                    width: 56,
                    height: 56,
                  }}
                >
                  <EventAvailable fontSize="large" />
                </Avatar>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {stats.totalAppointments}
              </Typography>
              <Typography color="text.secondary">
                Total Appointments
              </Typography>
            </CardContent>
          </Card>
        </MuiGrid>

        <MuiGrid item xs={12} sm={6} md={3}>
          <Card 
            elevation={2}
            sx={{ 
              borderRadius: 4,
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'warning.light',
                    width: 56,
                    height: 56,
                  }}
                >
                  <Schedule fontSize="large" />
                </Avatar>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {stats.upcomingAppointments}
              </Typography>
              <Typography color="text.secondary">
                Upcoming Appointments
              </Typography>
            </CardContent>
          </Card>
          </MuiGrid>
      </MuiGrid>
      
      {/* Top Doctors */}
      <Box>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 3,
            fontWeight: 600,
            color: 'primary.main'
          }}
        >
          Our Top Doctors
        </Typography>
        <MuiGrid container spacing={3} sx={{ mb: 6 }}>
        {topDoctors.map(doctor => (
          <MuiGrid item xs={12} sm={6} md={3} key={doctor._id}>
            <Card 
              elevation={2}
              sx={{ 
                borderRadius: 4,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      width: 64,
                      height: 64,
                      bgcolor: 'primary.main',
                      background: 'linear-gradient(45deg, #2b6777 30%, #52ab98 90%)'
                    }}
                  >
                    {doctor.name[0]}
                  </Avatar>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Dr. {doctor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {doctor.specialization}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Star fontSize="small" color="primary" />
                  <Typography variant="body2">
                    {doctor.experience} years experience
                  </Typography>
                </Box>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => navigate(`/doctors/${doctor._id}`)}
                  sx={{ mt: 1 }}
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </MuiGrid>
        ))}
      </MuiGrid>
      </Box>

      {/* Patient Reviews */}
      <Box>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 3,
            fontWeight: 600,
            color: 'primary.main'
          }}
        >
          Recent Patient Reviews
        </Typography>
        <MuiGrid container spacing={3}>
          {recentReviews.map(review => (
            <MuiGrid item xs={12} md={6} key={review.id}>
              <Card 
                elevation={2}
                sx={{ 
                  borderRadius: 4,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {review.patient[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {review.patient}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(review.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                    </Box>
                    <Rating 
                      value={review.rating} 
                      readOnly 
                      sx={{ ml: 'auto' }}
                    />
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    "{review.comment}"
                  </Typography>
                </CardContent>
              </Card>
            </MuiGrid>
          ))}
        </MuiGrid>
      </Box>
    </Box>
  );
}

export default Dashboard;