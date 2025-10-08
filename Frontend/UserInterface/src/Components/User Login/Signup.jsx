import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  MenuItem,
  Link as MuiLink,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { styled } from "@mui/system";

const Logo = styled(PersonAddAltIcon)({
  fontSize: 40,
  marginBottom: 16,
  color: "#1976d2", // Blue color for logo
});

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/auth/register", {
        name,
        email,
        password,
        age,
        gender,
        phoneNumber,
        role,
      });
      setErrorMessage("");
      setSuccessMessage("Registered Successfully");
    } catch (error) {
      setErrorMessage("Registration Failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Logo />
        <Typography component="h1" variant="h5" gutterBottom>
          Create an Account
        </Typography>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSignup} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Enter Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Enter Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Enter Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            select
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Select Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="PATIENT">Patient</MenuItem>
            <MenuItem value="DOCTOR">Doctor</MenuItem>
          </TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
        <Typography variant="body2" color="textSecondary">
          {"Already have an account? "}
          <MuiLink
            component={Link}
            to="/login"
            sx={{ textDecoration: "none", fontWeight: "bold" }}
          >
            Login here
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  );
}

export default Signup;
