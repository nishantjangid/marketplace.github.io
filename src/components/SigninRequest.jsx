import { Box, Container,  Typography } from '@mui/material'
import {makeStyles} from '@mui/styles';
import React from 'react'
import { useSelector } from 'react-redux';
import ConnectButtonModal from './ConnectButtonModal';

const useStyles = makeStyles((theme) => ({
    SignInContainer: {
        width:'100%',
        height:'100vh',
        display:'flex !important',
        alignItems:'center',
        justifyContent:'center',        
        [theme.breakpoints.up("sm")]: {
            width:'100%',            
        },      
    },
    SigninBox:{
        width:'100%',
        display:"flex",
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        rowGap:'1rem',
        zIndex:'201',
        height:'100%',
        background:'#fff',
        [theme.breakpoints.up("sm")]: {
            width:'100%',
            
        },        
    }
}));
const SigninRequest = () => {
    const classes = useStyles();      
  return (
    <Container maxWidth="xl" className={classes.SignInContainer}>
        <Box component="div" className={classes.SigninBox}>
            <Typography variant="h5" component="h5" style={{'fontWeight':'600 '}}>Sign in</Typography>
            <Typography variant="span" component="span" style={{"fontWeight":'400','color':'rgb(110, 110, 110)'}}>Please sign in with your blockchain wallet to see this page</Typography>
            <ConnectButtonModal />
        </Box>
    </Container>
  )
}

export default SigninRequest