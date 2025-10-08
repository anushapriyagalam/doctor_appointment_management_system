import React, { useState, useEffect } from 'react';
import {
  Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent,
  DialogTitle, Grid, TextField, Typography, IconButton, MenuItem, Select, FormControl, InputLabel,
  InputAdornment
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Search as SearchIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [searchField, setSearchField] = useState('name');
  const [role, setRole] = useState(null);
  const [newDoctor, setNewDoctor] = useState({
    id: '',
    doctorImage: '',
    doctorQualification: '',
    doctorServiceName: '',
    doctorHospitalName: '',
    doctorHospitalLocation: '',
    doctorServiceDescription: '',
    doctorBookingAmount: '',
    availableDateTimes: [{ availableDate: '', availableTime: [''] }]
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);

    axios.get('http://localhost:8100/doctor')
      .then(response => setDoctors(response.data))
      .catch(error => console.error('Error fetching doctors:', error));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAvailableDateChange = (index, value) => {
    const updatedAvailableDateTimes = [...newDoctor.availableDateTimes];
    updatedAvailableDateTimes[index].availableDate = value;
    setNewDoctor(prevState => ({
      ...prevState,
      availableDateTimes: updatedAvailableDateTimes
    }));
  };

  const handleAvailableTimeChange = (index, timeIndex, value) => {
    const updatedAvailableDateTimes = [...newDoctor.availableDateTimes];
    updatedAvailableDateTimes[index].availableTime[timeIndex] = value;
    setNewDoctor(prevState => ({
      ...prevState,
      availableDateTimes: updatedAvailableDateTimes
    }));
  };

  const handleAddAvailableTime = (index) => {
    const updatedAvailableDateTimes = [...newDoctor.availableDateTimes];
    updatedAvailableDateTimes[index].availableTime.push('');
    setNewDoctor(prevState => ({
      ...prevState,
      availableDateTimes: updatedAvailableDateTimes
    }));
  };

  const handleRemoveAvailableTime = (index, timeIndex) => {
    const updatedAvailableDateTimes = [...newDoctor.availableDateTimes];
    updatedAvailableDateTimes[index].availableTime.splice(timeIndex, 1);
    setNewDoctor(prevState => ({
      ...prevState,
      availableDateTimes: updatedAvailableDateTimes
    }));
  };

  const handleAddAvailableDateTime = () => {
    setNewDoctor(prevState => ({
      ...prevState,
      availableDateTimes: [...prevState.availableDateTimes, { availableDate: '', availableTime: [''] }]
    }));
  };

  const handleRemoveAvailableDateTime = (index) => {
    const updatedAvailableDateTimes = [...newDoctor.availableDateTimes];
    updatedAvailableDateTimes.splice(index, 1);
    setNewDoctor(prevState => ({
      ...prevState,
      availableDateTimes: updatedAvailableDateTimes
    }));
  };

  const handleAddDoctor = () => {
    axios.post('http://localhost:8100/doctor', newDoctor)
      .then(response => {
        setDoctors([...doctors, response.data]);
        handleClose();
      })
      .catch(error => console.error('Error adding doctor:', error));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value);
  };

  const filteredDoctors = doctors.filter(doctor => {
    switch (searchField) {
      case 'name':
        return doctor.name.toLowerCase().includes(search.toLowerCase());
      case 'service':
        return doctor.doctorServiceName.toLowerCase().includes(search.toLowerCase());
      case 'hospital':
        return doctor.doctorHospitalName.toLowerCase().includes(search.toLowerCase());
      case 'location':
        return doctor.doctorHospitalLocation.toLowerCase().includes(search.toLowerCase());
      default:
        return doctor;
    }
  });

  return (
    <Box sx={{ pl: 5 }}><br />
      {role === 'ADMIN' && (
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Doctor
        </Button>
      )}
      <Box sx={{ mt: 3, mb: 3 }}>
        <FormControl variant="outlined" sx={{ minWidth: 100, mr: 3 }}>
          <InputLabel>Search By</InputLabel>
          <Select
            value={searchField}
            onChange={handleSearchFieldChange}
            label="Search By"
            size="small"
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
          >
            <MenuItem value="name" sx={{ fontSize: '0.875rem' }}>Name</MenuItem>
            <MenuItem value="service" sx={{ fontSize: '0.875rem' }}>Service</MenuItem>
            <MenuItem value="hospital" sx={{ fontSize: '0.875rem' }}>Hospital</MenuItem>
            <MenuItem value="location" sx={{ fontSize: '0.875rem' }}>Location</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchChange}
          label="Search"
          sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box><br/>

      <Grid container spacing={3}>
        {filteredDoctors.map(doctor => (
          <Grid item key={doctor.id} xs={12} sm={6} md={2.5}>
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
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: 600 }}>Add Doctor</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="ID"
            type="number"
            fullWidth
            name="id"
            value={newDoctor.id}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Doctor Image URL"
            type="text"
            fullWidth
            name="doctorImage"
            value={newDoctor.doctorImage}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Doctor Qualification"
            type="text"
            fullWidth
            name="doctorQualification"
            value={newDoctor.doctorQualification}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Doctor Service Name"
            type="text"
            fullWidth
            name="doctorServiceName"
            value={newDoctor.doctorServiceName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Doctor Hospital Name"
            type="text"
            fullWidth
            name="doctorHospitalName"
            value={newDoctor.doctorHospitalName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Doctor Hospital Location"
            type="text"
            fullWidth
            name="doctorHospitalLocation"
            value={newDoctor.doctorHospitalLocation}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Doctor Service Description"
            type="text"
            fullWidth
            name="doctorServiceDescription"
            value={newDoctor.doctorServiceDescription}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Doctor Booking Amount"
            type="number"
            fullWidth
            name="doctorBookingAmount"
            value={newDoctor.doctorBookingAmount}
            onChange={handleChange}
          />
          {newDoctor.availableDateTimes.map((dateTime, index) => (
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "#2C3E50", fontWeight: 600 }}>
            Cancel
          </Button>
          <Button onClick={handleAddDoctor} sx={{ color: "#1ABC9C", fontWeight: 600 }}>
            Add Doctor
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Doctors;
