import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, makeStyles } from '@material-ui/core';
import logo from '../../assets/logo/logo.png';

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: 'linear-gradient(45deg, #00274d 30%, #003c71 90%)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        width: '100%',
    },
    toolbar: {
        height: 70,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(0, 3),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0, 2),
        },
    },
    logo: {
        height: 50,
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    },
    siteName: {
        marginLeft: theme.spacing(2),
        color: '#ffffff',
        fontWeight: 'bold',
        letterSpacing: '1px',
    },
    navButtonsContainer: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    navButton: {
        marginLeft: theme.spacing(2),
        color: '#ffffff',
        borderColor: '#ffffff',
        transition: 'background-color 0.3s, color 0.3s',
        '&:hover': {
            backgroundColor: '#003c71',
            color: '#ffffff',
        },
        borderRadius: '5px',
        padding: theme.spacing(1, 3),
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(1),
        },
    }
}));

function Header() {
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    function redirectUser() {
        navigate('/login');
    }

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton edge="start" color="inherit" aria-label="logo">
                        <img src={logo} alt="Logo" className={classes.logo} />
                    </IconButton>
                    <Typography variant="h6" className={classes.siteName}>
                        DocCure
                    </Typography>
                </div>
                <div className={classes.navButtonsContainer}>
                    {location.pathname === '/' && (
                        <Button
                            className={classes.navButton}
                            onClick={() => redirectUser()}
                        >
                            Sign In
                        </Button>
                    )}
                    {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup' && (
                        <>
                            {role === 'ADMIN' && (
                                <>
                                    <Button className={classes.navButton} onClick={() => navigate('/menu')}>Menu</Button>
                                    <Button className={classes.navButton} onClick={() => navigate('/doctors')}>Doctors</Button>
                                    <Button className={classes.navButton} onClick={() => navigate('/appointments')}>Appointments</Button>
                                    <Button className={classes.navButton} onClick={() => navigate('/user-details')}>Profile</Button>
                                </>
                            )}
                            {role === 'DOCTOR' && (
                                <>
                                    <Button className={classes.navButton} onClick={() => navigate('/menu')}>Menu</Button>
                                    <Button className={classes.navButton} onClick={() => navigate('/doctor-info')}>Doctor</Button>
                                    <Button className={classes.navButton} onClick={() => navigate('/doctor-appointments')}>Appointments</Button>
                                    <Button className={classes.navButton} onClick={() => navigate('/user-details')}>Profile</Button>
                                </>
                            )}
                            {role === 'PATIENT' && (
                                <>
                                    <Button className={classes.navButton} onClick={() => navigate('/menu')}>Menu</Button>
                                    <Button className={classes.navButton} onClick={() => navigate('/doctors')}>Doctors</Button>
                                    <Button className={classes.navButton} onClick={() => navigate('/appointment-details')}>Appointments</Button>
                                    <Button className={classes.navButton} onClick={() => navigate('/user-details')}>Profile</Button>
                                </>
                            )}
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
