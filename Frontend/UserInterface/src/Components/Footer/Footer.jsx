import React from 'react';
import { Container, Typography, Link, makeStyles, IconButton } from '@material-ui/core';
import fbIcon from '../../assets/social/fb.png';
import instaIcon from '../../assets/social/insta.png';
import linkedinIcon from '../../assets/social/linkdin.png';
import twIcon from '../../assets/social/tw.png';

const useStyles = makeStyles((theme) => ({
    footer: {
        background: 'linear-gradient(45deg, #00274d 30%, #003c71 90%)',
        color: '#ffffff',
        padding: theme.spacing(4, 0),
        borderTop: '1px solid #003c71',
    },
    footerContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
        },
    },
    footerLinks: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            marginBottom: theme.spacing(3),
        },
    },
    footerLink: {
        margin: theme.spacing(0, 2),
        color: '#ffffff',
        textDecoration: 'none',
        transition: 'color 0.3s',
        '&:hover': {
            color: '#0056d2',
        },
        '&:visited': {
            color: '#ffffff',
        },
    },
    socialIcons: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
    },
    socialIcon: {
        width: 24,
        height: 24,
        margin: theme.spacing(0, 1),
        transition: 'transform 0.3s',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    footerText: {
        color: '#ffffff',
        marginTop: theme.spacing(2),
    },
}));

function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container className={classes.footerContent}>
                <div className={classes.footerLinks}>
                    <Link href="" className={classes.footerLink}>
                        Home
                    </Link>
                    <Link href="" className={classes.footerLink}>
                        About Us
                    </Link>
                    <Link href="" className={classes.footerLink}>
                        Contact
                    </Link>
                    <Link href="" className={classes.footerLink}>
                        Privacy Policy
                    </Link>
                </div>
                <div className={classes.socialIcons}>
                    <IconButton href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={fbIcon} alt="Facebook" className={classes.socialIcon} />
                    </IconButton>
                    <IconButton href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={instaIcon} alt="Instagram" className={classes.socialIcon} />
                    </IconButton>
                    <IconButton href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src={linkedinIcon} alt="LinkedIn" className={classes.socialIcon} />
                    </IconButton>
                    <IconButton href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src={twIcon} alt="Twitter" className={classes.socialIcon} />
                    </IconButton>
                </div>
                <Typography variant="body2" className={classes.footerText}>
                    &copy; {new Date().getFullYear()} DocCure. All rights reserved.
                </Typography>
            </Container>
        </footer>
    );
}

export default Footer;
