import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent 
} from '@mui/material';
import { PersonAdd, MedicalServices, School, WorkHistory } from '@mui/icons-material';
import api from '../utils/api';

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');

  useEffect(() => {
    api.get('/doctors').then(res => setDoctors(res.data));
  }, []);

  return (
    <Box sx={{ p: 4, }}>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4,
          color: 'primary.main',
          fontWeight: 600
        }}
      >
        Our Medical Specialists
      </Typography>

      <Box 
        sx={{ 
          display: 'grid', 
          gap: 3, 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          mb: 4 
        }}
      >
        {doctors.map(doc => (
          <Card 
            key={doc._id} 
            elevation={2}
            sx={{ 
              position: 'relative',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    bgcolor: 'primary.main',
                    background: 'linear-gradient(45deg, #2b6777 30%, #52ab98 90%)'
                  }}
                >
                  {doc.name[0]}
                </Avatar>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Dr. {doc.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID: {doc.doctorId}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MedicalServices color="primary" />
                  <Typography>{doc.department}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <School color="primary" />
                  <Typography>{doc.specialization}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WorkHistory color="primary" />
                  <Typography>{doc.experience} years of experience</Typography>
                </Box>
              </Box>

              <Button 
                variant="contained"
                fullWidth 
                startIcon={<PersonAdd />}
                onClick={() => setSelectedDoctor(doc._id)}
                sx={{ 
                  mt: 3,
                  background: 'linear-gradient(45deg, #2b6777 30%, #52ab98 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1e4b55 30%, #3a7b6d 90%)',
                  }
                }}
              >
                Add Patient
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default DoctorsList;