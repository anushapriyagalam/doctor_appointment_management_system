import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Link as MuiLink,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { styled } from "@mui/system";

const Logo = styled(LockOutlinedIcon)({
  fontSize: 40,
  marginBottom: 16,
  color: "#1976d2",
});

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/token", {
        username,
        password,
      });
      const token = response.data.token;
      const role = response.data.role;
      Cookies.set("token", token, { expires: 5 });
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);
      const userResponse = await axios.get(
        `http://localhost:8000/user/name/${username}`
      );
      const userId = userResponse.data.id;
      localStorage.setItem("userId", userId);
      setIsLoggedIn(true);
      if (role === "ADMIN") {
        navigate("/menu");
      } else if (role === "PATIENT") {
        navigate("/menu");
      } else if (role === "DOCTOR") {
        navigate("/menu");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrorMessage("Invalid username or password. Please try again");
      } else {
        setErrorMessage("An error occurred. Please try again");
      }
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
          Sign In
        </Typography>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
        <Typography variant="body2" color="textSecondary">
          {"Don't have an account? "}
          <MuiLink
            component={Link}
            to="/signup"
            sx={{ textDecoration: "none", fontWeight: "bold" }}
          >
            Sign up Here
          </MuiLink>
        </Typography>
        {isLoggedIn && (
          <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>
            User successfully logged in!
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default Login;
