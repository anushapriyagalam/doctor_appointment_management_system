import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Card, CardContent, CardMedia, Typography, CircularProgress, Button
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorInfo = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const doctorName = localStorage.getItem('username');

  useEffect(() => {

    axios.get(`http://localhost:8100/doctor/name/${doctorName}`)
      .then(response => {
        setDoctor(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching doctor details');
        setLoading(false);
      });
  }, [doctorName, navigate]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ pl: 5, pr: 5, pt: 3 }}>
      <Grid container spacing={3}>
        {doctor && (
          <Grid item xs={12} sm={6} md={2.5}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={doctor.doctorImage}
                alt={doctor.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {doctor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Service:</strong> {doctor.doctorServiceName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Qualification:</strong> {doctor.doctorQualification}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Booking Amount:</strong> Rs.{doctor.doctorBookingAmount}.00
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Button sx={{ color: "#1ABC9C", fontWeight: 600 }} onClick={() => navigate(`/doctor/${doctor.id}`)}>
                  MORE DETAILS
                </Button>
              </Box>
            </Card><br />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default DoctorInfo;
