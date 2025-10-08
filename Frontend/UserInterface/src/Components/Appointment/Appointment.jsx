import React, { useState, useEffect } from 'react';
import {
  Box, Button, CardMedia, Typography, Grid, Container
} from '@mui/material';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Appointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctorId } = location.state;
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8100/doctor/${doctorId}`)
      .then(response => setDoctor(response.data))
      .catch(error => console.error('Error fetching doctor:', error));
  }, [doctorId]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    const id = localStorage.getItem('userId');
    const appointmentDetails = {
      id,
      doctorId: doctor.id,
      selectedDate,
      selectedTime
    };
    console.log('Sending appointment details:', appointmentDetails);
    axios.post('http://localhost:8300/appointment', appointmentDetails)
      .then(() => navigate('/success'))
      .catch(error => console.error('Error booking appointment:', error));
  };
  

  if (!doctor) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 3, mb: 3 }}>
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        Book Appointment
      </Typography>
      <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
        <CardMedia
          component="img"
          image={doctor.doctorImage}
          alt={doctor.name}
          sx={{ width: 150, height: 150, objectFit: 'cover' }}
        />
        <Box sx={{ ml: 2 }}>
          <Typography gutterBottom variant="h5">
            {doctor.name}
          </Typography>
          <Typography variant="body1" color="text.primary">
            {doctor.doctorServiceName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {doctor.doctorHospitalName}, {doctor.doctorHospitalLocation}
          </Typography>
        </Box>
      </Box>
      <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem' }}>
        Available Date
      </Typography>
      <Grid container spacing={2}>
        {doctor.availableDateTimes.map((dateTime, index) => (
          <Grid item key={index}>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: selectedDate === dateTime.availableDate ? 'rgb(151, 210, 239)' : 'inherit',
                color: selectedDate === dateTime.availableDate ? 'black' : 'inherit'
              }}
              onClick={() => handleDateClick(dateTime.availableDate)}
            >
              {dateTime.availableDate}
            </Button>
          </Grid>
        ))}
      </Grid>
      {selectedDate && (
        <>
          <Typography variant="h6" sx={{ mt: 3, mb: 2, fontSize: '1rem' }}>
            Available Time
          </Typography>
          <Grid container spacing={2}>
            {doctor.availableDateTimes
              .find(dateTime => dateTime.availableDate === selectedDate)
              .availableTime.map((time, index) => (
                <Grid item key={index}>
                  <Button
                    variant="outlined"
                    sx={{
                      backgroundColor: selectedTime === time ? 'rgb(151, 210, 239)' : 'inherit',
                      color: selectedTime === time ? 'black' : 'inherit'
                    }}
                    onClick={() => handleTimeClick(time)}
                  >
                    {time}
                  </Button>
                </Grid>
              ))}
          </Grid>
        </>
      )}
      {selectedDate && selectedTime && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Appointment;
