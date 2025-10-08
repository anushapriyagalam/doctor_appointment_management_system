import React, { useState, useEffect } from 'react';
import {
  Box, Button, Card, CardMedia, CardContent, Typography, Grid, Container,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton,
  Rating as MuiRating, MenuItem, Select
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Doctor = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [updateDoctor, setUpdateDoctor] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);

    axios.get(`http://localhost:8100/doctor/${id}`)
      .then(response => setDoctor(response.data))
      .catch(error => console.error('Error fetching doctor:', error));
    fetchRatings();
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:8100/doctor/${id}`)
      .then(() => navigate('/doctors'))
      .catch(error => console.error('Error deleting doctor:', error));
  };

  const handleBookAppointment = () => {
    const userId = localStorage.getItem('userId');
    navigate('/appointment', { state: { userId, doctorId: id } });
  };

  const handleOpenUpdateDialog = () => {
    if (doctor) {
      setUpdateDoctor({ ...doctor });
      setOpenUpdateDialog(true);
    }
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateDoctor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAvailableDateChange = (index, value) => {
    const updatedAvailableDateTimes = updateDoctor.availableDateTimes.map((dateTime, i) => (
      i === index ? { ...dateTime, availableDate: value } : dateTime
    ));
    setUpdateDoctor(prevState => ({
      ...prevState,
      availableDateTimes: updatedAvailableDateTimes
    }));
  };

  const handleAvailableTimeChange = (dateIndex, timeIndex, value) => {
    const updatedAvailableDateTimes = updateDoctor.availableDateTimes.map((dateTime, i) => (
      i === dateIndex ? {
        ...dateTime,
        availableTime: dateTime.availableTime.map((time, j) => (
          j === timeIndex ? value : time
        ))
      } : dateTime
    ));
    setUpdateDoctor(prevState => ({
      ...prevState,
      availableDateTimes: updatedAvailableDateTimes
    }));
  };

  const handleRemoveAvailableTime = (dateIndex, timeIndex) => {
    const updatedAvailableDateTimes = updateDoctor.availableDateTimes.map((dateTime, i) => (
      i === dateIndex ? {
        ...dateTime,
        availableTime: dateTime.availableTime.filter((_, j) => j !== timeIndex)
      } : dateTime
    ));
    setUpdateDoctor(prevState => ({
      ...prevState,
      availableDateTimes: updatedAvailableDateTimes
    }));
  };

  const handleAddAvailableTime = (index) => {
    const updatedAvailableDateTimes = updateDoctor.availableDateTimes.map((dateTime, i) => (
      i === index ? {
        ...dateTime,
        availableTime: [...dateTime.availableTime, '']
      } : dateTime
    ));
    setUpdateDoctor(prevState => ({
      ...prevState,
      availableDateTimes: updatedAvailableDateTimes
    }));
  };

  const handleRemoveAvailableDateTime = (index) => {
    const updatedAvailableDateTimes = updateDoctor.availableDateTimes.filter((_, i) => i !== index);
    setUpdateDoctor(prevState => ({
      ...prevState,
      availableDateTimes: updatedAvailableDateTimes
    }));
  };

  const handleAddAvailableDateTime = () => {
    setUpdateDoctor(prevState => ({
      ...prevState,
      availableDateTimes: [...prevState.availableDateTimes, { availableDate: '', availableTime: [''] }]
    }));
  };

  const handleUpdateDoctor = () => {
    axios.put(`http://localhost:8100/doctor/${id}`, updateDoctor)
      .then(response => {
        setDoctor(response.data);
        setOpenUpdateDialog(false);
      })
      .catch(error => console.error('Error updating doctor:', error));
  };

  const fetchRatings = () => {
    axios.get(`http://localhost:8400/rating/doctor/${id}`)
      .then(response => {
        const ratingsData = Array.isArray(response.data) ? response.data : [response.data];
        const sortedRatings = ratingsData.sort((a, b) => new Date(b.ratingDateTime) - new Date(a.ratingDateTime));
        setRatings(sortedRatings);

        const totalRatings = sortedRatings.length;
        if (totalRatings > 0) {
          const avgRating = sortedRatings.reduce((sum, rating) => sum + rating.rating, 0) / totalRatings;
          setAverageRating(avgRating);
        } else {
          setAverageRating(0);
        }
      })
      .catch(error => console.error('Error fetching ratings:', error));
  };

  if (!doctor) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 3, mb: 3 }}>
      <Card sx={{ boxShadow: 4, pt: 3 }}>
        <CardMedia
          component="img"
          height="350"
          image={doctor.doctorImage}
          alt={doctor.name}
          sx={{ objectFit: 'contain', borderRadius: '4px 4px 0 0' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ mb: 2, textAlign: 'center' }}>
            {doctor.name}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1" color="text.primary">
                <strong>Age:</strong> {doctor.age}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="text.primary">
                <strong>Gender:</strong> {doctor.gender}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="text.primary">
                <strong>Qualification:</strong> {doctor.doctorQualification}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="text.primary">
                <strong>Hospital:</strong> {doctor.doctorHospitalName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="text.primary">
                <strong>Location:</strong> {doctor.doctorHospitalLocation}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="text.primary">
                <strong>Service Description:</strong> {doctor.doctorServiceDescription}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="text.primary">
                <strong>Booking Amount:</strong> Rs.{doctor.doctorBookingAmount}.00
              </Typography>
            </Grid>
            {/* <Grid item xs={12}>
                <Typography variant="body1" color="text.primary">
                  <strong>Available Date Times:</strong>
                </Typography>
                {doctor.availableDateTimes.map((dateTime, index) => (
                  <Box key={index} sx={{ pt: 0.1 }}>
                    <Typography variant="body1" color="text.secondary">
                      <strong>Date:</strong> {dateTime.availableDate}
                      <Box component="span" sx={{ mx: 1 }}></Box>
                      <strong>Times:</strong> {dateTime.availableTime.join(', ')}
                    </Typography>
                  </Box>
                ))}
              </Grid> */}
          </Grid>
        </CardContent>
        {userRole !== 'DOCTOR' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBookAppointment}
            sx={{ mx: 1 }}
          >
            Book Appointment
          </Button>
        </Box>
        )}
        {userRole !== 'PATIENT' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpenUpdateDialog}
              sx={{ mx: 1 }}
            >
              Update Doctor
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              sx={{ mx: 1 }}
            >
              Delete Doctor
            </Button>
          </Box>
        )}
        <br />
        <Typography gutterBottom variant="h5" component="div" sx={{ mb: 2, textAlign: 'center' }}>
          Ratings
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          <MuiRating value={averageRating} precision={0.1} readOnly size="large" />
          <Typography variant="body1" color="text.primary" sx={{ ml: 1 }}>
            {averageRating.toFixed(1)} out of 5
          </Typography>
        </Box>
        <Box>
          {ratings.map((rating) => (
            <Card key={rating.ratingId} sx={{ p: 2, boxShadow: 1 }}>
              <Typography variant="body1" color="text.primary">
                <strong>{rating.name}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', mb: 1 }}>
                {new Date(rating.ratingDateTime).toLocaleString()}
              </Typography>
              <Box sx={{ mb: 0 }}>
                <MuiRating
                  value={rating.rating}
                  precision={0.1}
                  readOnly
                  size="small"
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: 'black',
                    },
                    '& .MuiRating-iconEmpty': {
                      color: 'black',
                    },
                  }}
                />
              </Box>
              <Typography variant="body2" color="text.primary">
                {rating.review}
              </Typography>
            </Card>
          ))}
        </Box>
      </Card>

      <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>Update Doctor</DialogTitle>
        <DialogContent>
          {updateDoctor && (
            <>
              <TextField
                label="Name"
                name="name"
                value={updateDoctor.name}
                onChange={handleUpdateChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Age"
                name="age"
                value={updateDoctor.age}
                onChange={handleUpdateChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Gender"
                name="gender"
                value={updateDoctor.gender}
                onChange={handleUpdateChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Qualification"
                name="doctorQualification"
                value={updateDoctor.doctorQualification}
                onChange={handleUpdateChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Hospital"
                name="doctorHospitalName"
                value={updateDoctor.doctorHospitalName}
                onChange={handleUpdateChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Location"
                name="doctorHospitalLocation"
                value={updateDoctor.doctorHospitalLocation}
                onChange={handleUpdateChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Service Description"
                name="doctorServiceDescription"
                value={updateDoctor.doctorServiceDescription}
                onChange={handleUpdateChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Booking Amount"
                name="doctorBookingAmount"
                value={updateDoctor.doctorBookingAmount}
                onChange={handleUpdateChange}
                fullWidth
                margin="normal"
              />
              {updateDoctor.availableDateTimes.map((dateTime, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      label="Available Date"
                      type="date"
                      value={dateTime.availableDate}
                      onChange={(e) => handleAvailableDateChange(index, e.target.value)}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                    />
                    <IconButton
                      aria-label="remove-date"
                      color="error"
                      onClick={() => handleRemoveAvailableDateTime(index)}
                      sx={{ ml: 2 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  {dateTime.availableTime.map((time, timeIndex) => (
                    <Box key={timeIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <TextField
                        label={`Available Time ${timeIndex + 1}`}
                        type="time"
                        value={time}
                        onChange={(e) => handleAvailableTimeChange(index, timeIndex, e.target.value)}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: '60%' }}
                      />
                      <IconButton
                        aria-label="remove"
                        color="secondary"
                        onClick={() => handleRemoveAvailableTime(index, timeIndex)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddAvailableTime(index)}
                  >
                    Add Time
                  </Button>
                </Box>
              ))}
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddAvailableDateTime}
              >
                Add Date Time
              </Button>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog} sx={{ color: "#2C3E50", fontWeight: 600 }}>
            Cancel
          </Button>
          <Button onClick={handleUpdateDoctor} sx={{ color: "#1ABC9C", fontWeight: 600 }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Doctor;
