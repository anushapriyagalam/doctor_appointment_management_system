import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Container, Card, CardContent, Button, Divider
} from '@mui/material';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [cancelable, setCancelable] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8300/appointment')
      .then(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          setAppointments(data);
          const now = new Date();
          const cancelableFlags = data.map(app => (now - new Date(app.bookedDateTime)) <= 3 * 60 * 1000);
          setCancelable(cancelableFlags);
        } else {
          console.error('Unexpected response data format:', data);
          setAppointments([]);
        }
      })
      .catch(error => console.error('Error fetching all appointments:', error));
  }, []);

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

  const handleCancel = (appointment, index) => {
    console.log('Sending update request for appointment ID:', appointment.appointmentId);

    axios.put(`http://localhost:8300/appointment/${appointment.appointmentId}`, {
      ...appointment,
      status: 'CANCELLED'
    })
    .then(response => {
      console.log('Appointment canceled successfully:', response.data);
      const updatedAppointments = [...appointments];
      updatedAppointments[index] = response.data;
      setAppointments(updatedAppointments);
      const updatedCancelable = [...cancelable];
      updatedCancelable[index] = false;
      setCancelable(updatedCancelable);
    })
    .catch(error => {
      console.error('Error canceling appointment:', error);
    });
  };

  if (appointments.length === 0) return <Typography variant="h6" align="center">No Appointments Found</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Appointment History
      </Typography>
      <Grid container spacing={3}>
        {appointments.map((appointment, index) => (
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
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Status:</strong> <span style={{ color: appointment.status === 'BOOKED' ? 'green' : 'red' }}>{appointment.status}</span>
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handlePrintReceipt(appointment)}
                  >
                    Print Receipt
                  </Button>
                  {cancelable[index] && appointment.status === 'BOOKED' && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleCancel(appointment, index)}
                    >
                      Cancel
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Appointments;
