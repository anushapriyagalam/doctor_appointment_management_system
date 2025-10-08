import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Container, Card, CardContent, Button, Divider, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Rating as MuiRating
} from '@mui/material';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [cancelable, setCancelable] = useState({});
  const [ratingEligible, setRatingEligible] = useState({});
  const [ratings, setRatings] = useState([]);
  const [openRatingDialog, setOpenRatingDialog] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState('');
  const username = localStorage.getItem('username');

  useEffect(() => {
    axios.get(`http://localhost:8300/appointment/name/${username}`)
      .then(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          setAppointments(data);

          const now = new Date();
          const updatedCancelable = data.reduce((acc, app) => {
            acc[app.appointmentId] = (now - new Date(app.bookedDateTime)) <= 2 * 60 * 1000 && app.status === 'BOOKED';
            return acc;
          }, {});

          setCancelable(updatedCancelable);
        } else {
          console.error('Unexpected response data format:', data);
          setAppointments([]);
        }
      })
      .catch(error => console.error('Error fetching appointment history:', error));

    axios.get(`http://localhost:8400/rating`)
      .then(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          setRatings(data);

          const updatedRatingEligibility = appointments.reduce((acc, app) => {
            const selectedDateTime = new Date(`${app.selectedDate} ${app.selectedTime}`);
            const hasRating = data.some(rating => rating.appointmentId === app.appointmentId);
            acc[app.appointmentId] = !hasRating && (new Date() - selectedDateTime >= 20 * 60 * 1000) && app.status === 'BOOKED';
            return acc;
          }, {});

          setRatingEligible(updatedRatingEligibility);
        } else {
          console.error('Unexpected response data format:', data);
        }
      })
      .catch(error => console.error('Error fetching ratings:', error));
  }, [username, appointments]);

  const handlePrintReceipt = (appointment) => {
    const doc = new jsPDF();
    doc.text('Appointment Receipt', 14, 16);
    doc.autoTable({
      startY: 22,
      head: [['Field', 'Value']],
      body: [
        ['Appointment ID', appointment.appointmentId],
        ['Name', appointment.name],
        ['Age', appointment.age],
        ['Gender', appointment.gender],
        ['Phone Number', appointment.phoneNumber],
        ['Doctor Name', appointment.doctorName],
        ['Service', appointment.doctorServiceName],
        ['Hospital', appointment.doctorHospitalName],
        ['Location', appointment.doctorHospitalLocation],
        ['Booking Amount', appointment.doctorBookingAmount],
        ['Booked Date & Time', new Date(appointment.bookedDateTime).toLocaleString()],
        ['Selected Date', appointment.selectedDate],
        ['Selected Time', appointment.selectedTime],
        ['Status', appointment.status]
      ],
    });
    doc.save(`appointment-${appointment.appointmentId}.pdf`);
  };

  const handleCancel = (appointment) => {
    console.log('Sending update request for appointment ID:', appointment.appointmentId);

    axios.put(`http://localhost:8300/appointment/${appointment.appointmentId}`, {
      ...appointment,
      status: 'CANCELLED'
    })
      .then(response => {
        console.log('Appointment canceled successfully:', response.data);

        const updatedAppointments = appointments.map(app =>
          app.appointmentId === response.data.appointmentId ? response.data : app
        );
        setAppointments(updatedAppointments);

        const updatedCancelable = { ...cancelable };
        updatedCancelable[response.data.appointmentId] = false;
        setCancelable(updatedCancelable);
      })
      .catch(error => {
        console.error('Error canceling appointment:', error);
      });
  };

  const handleOpenRatingDialog = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setOpenRatingDialog(true);
  };

  const handleCloseRatingDialog = () => {
    setOpenRatingDialog(false);
    setNewRating(0);
    setNewReview('');
  };

  const handleSubmitRating = () => {
    axios.post('http://localhost:8400/rating', {
      appointmentId: selectedAppointmentId,
      rating: newRating,
      review: newReview
    })
      .then(response => {
        console.log('Rating submitted successfully:', response.data);

        setRatingEligible(prevState => ({
          ...prevState,
          [selectedAppointmentId]: false
        }));

        handleCloseRatingDialog();
      })
      .catch(error => {
        console.error('Error submitting rating:', error);
      });
  };

  if (appointments.length === 0) return <Typography variant="h6" align="center"><br />No Appointments Found<br /><br/></Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Appointment History
      </Typography>
      <Grid container spacing={3}>
        {appointments.map((appointment) => (
          <Grid item xs={12} key={appointment.appointmentId}>
            <Card variant="outlined" sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                  <strong>APPOINTMENT ID: {appointment.appointmentId}</strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Name:</strong> {appointment.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Age:</strong> {appointment.age}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Gender:</strong> {appointment.gender}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Phone Number:</strong> {appointment.phoneNumber}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Doctor Name:</strong> {appointment.doctorName}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Service:</strong> {appointment.doctorServiceName}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Hospital:</strong> {appointment.doctorHospitalName}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Location:</strong> {appointment.doctorHospitalLocation}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Booking Amount:</strong> {appointment.doctorBookingAmount}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Booked Date & Time:</strong> {new Date(appointment.bookedDateTime).toLocaleString()}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Selected Date:</strong> {appointment.selectedDate}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Selected Time:</strong> {appointment.selectedTime}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Status:</strong> <span style={{ color: appointment.status === 'BOOKED' ? 'green' : 'red' }}>{appointment.status}</span>
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handlePrintReceipt(appointment)}
                  >
                    Print Receipt
                  </Button>
                  {cancelable[appointment.appointmentId] && (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleCancel(appointment)}
                      sx={{ ml: 2 }}
                    >
                      Cancel
                    </Button>
                  )}
                  {ratingEligible[appointment.appointmentId] && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleOpenRatingDialog(appointment.appointmentId)}
                      sx={{ ml: 2 }}
                    >
                      Add Rating
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openRatingDialog} onClose={handleCloseRatingDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add Rating</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <MuiRating
              name="newRating"
              value={newRating}
              onChange={(event, newValue) => setNewRating(newValue)}
              precision={0.5}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Review"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRatingDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitRating} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AppointmentHistory;
