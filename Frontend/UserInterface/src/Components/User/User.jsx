import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  IconButton,
  Grid,
  Divider,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';

function User() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      axios
        .get(`http://localhost:8000/user/name/${username}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("Username not found in local storage");
    }
  }, []);

  const handleOpen = () => {
    setUpdatedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogoutOpen = () => {
    setLogoutOpen(true);
  };

  const handleLogoutClose = () => {
    setLogoutOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8000/user/${user.id}`, updatedUser)
      .then(() => {
        setUser(updatedUser);
        setOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/user/${user.id}`)
      .then(() => {
        localStorage.removeItem("username");
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 10 }}>
      {user && (
        <Card
          sx={{
            boxShadow: 6,
            borderRadius: 3,
            bgcolor: "#ECF0F1",
            color: "#34495E",
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.02)" },
          }}
        >
          <Grid container spacing={0}>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#536878",
                borderRadius: "12px 0 0 12px",
                p: 3,
              }}
            >
              <Avatar
                src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
                alt="Profile"
                sx={{
                  width: 150,
                  height: 150,
                  boxShadow: 4,
                  border: "4px solid white",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={8} sx={{ p: 3 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 550, color: "#2C3E50" }}
                  >
                    {user.name}
                  </Typography>
                  <Box>
                  <IconButton
                      sx={{
                        color: "#34495E",
                        transition: "color 0.2s ease",
                        "&:hover": { color: "#2C3E50" },
                      }}
                      onClick={handleOpen}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={{
                        color: "#C0392B",
                        transition: "color 0.2s ease",
                        "&:hover": { color: "#A93226" },
                      }}
                      onClick={handleDelete}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ mb: 3, color: "#34495E" }}
                >
                  {user.email}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        sx={{ color: "#34495E" }}
                      >
                        <strong>Id:</strong> {user.id}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mt: 1, color: "#34495E" }}
                      >
                        <strong>Age:</strong> {user.age}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        sx={{ color: "#34495E" }}
                      >
                        <strong>Gender:</strong> {user.gender}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mt: 1, color: "#34495E" }}
                      >
                        <strong>Phone Number:</strong> {user.phoneNumber}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Divider sx={{ mb: 3 }} />
              </CardContent>
              <CardActions sx={{ justifyContent: "center", pb: 3 }}>
              <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#3498DB",
                    color: "white",
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    boxShadow: 4,
                    "&:hover": {
                      bgcolor: "#2980B9",
                      boxShadow: 6,
                    },
                  }}
                  startIcon={<LogoutIcon />}
                  onClick={handleLogoutOpen}
                >
                  Logout
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: 600 }}>Update User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            name="name"
            value={updatedUser.name || ""}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            name="email"
            value={updatedUser.email || ""}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Age"
            type="number"
            fullWidth
            name="age"
            value={updatedUser.age || "-"}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Gender"
            type="text"
            fullWidth
            name="gender"
            value={updatedUser.gender || ""}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            fullWidth
            name="phoneNumber"
            value={updatedUser.phoneNumber || ""}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ color: "#2C3E50", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            sx={{ color: "#1ABC9C", fontWeight: 600 }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={logoutOpen} onClose={handleLogoutClose}>
        <DialogContent>
          <Typography sx={{ color: "#34495E" }}>
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleLogoutClose}
            sx={{ color: "#2C3E50", fontWeight: 600 }}
          >
            No
          </Button>
          <Button
            onClick={handleLogout}
            sx={{ color: "#E74C3C", fontWeight: 600 }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default User;
