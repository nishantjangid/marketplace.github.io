import { Box, Button, Container,  Typography } from '@mui/material'
import {makeStyles} from '@mui/styles';
import { useWeb3React } from '@web3-react/core';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Disconnect from './Disconnect';
import { toast, ToastContainer } from 'react-toastify';
import { API_URL, CHAINID, networkParams } from '../utils/Constant';
import { toHex } from '../utils/Utils';
const useStyles = makeStyles((theme) => ({
    SignInContainerr: {
        width: '100%',
        height: '100vh',
        display: 'flex !important',
        alignItems: 'center',
        justifyContent: 'center',
        position:"fixed",
        top:0,
        left:0,
        zIndex:2000,
        [theme.breakpoints.up("sm")]: {
            width: '100%',
        },
    },
    SigninBoxx: {
        width: '100%',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        rowGap: '1rem',
        zIndex: '202',
        height: '100%',
        background: '#fff',
        [theme.breakpoints.up("sm")]: {
            width: '100%',
        },
    }
}));
const WrongNetworkModal = () => {
    const classes = useStyles();  
    let navigate = useNavigate();
    const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();
    async function disconnect() {
        try {
            deactivate();
            let path = `/`; 
            navigate(path);

        } catch (ex) {
            console.log(ex)
        }
    }


    const switchNetwork = async () => {
        try {
          await library.provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: toHex(CHAINID) }]
          });
        } catch (switchError) {      
          if (switchError.code === 4902) {
            try {
              await library.provider.request({
                method: "wallet_addEthereumChain",
                params: [networkParams[toHex(CHAINID)]]
              });
            } catch (error) {
              toast.error(error)
            }
          }
          if(switchError.code === 4001){
            try{
              toast.warning("Please switch correct network");              
              // deactivate();
            }catch(err){
              console.log(err);
            }
          }
        }
      };

    return (
        <Container maxWidth="xl" className={classes.SignInContainerr}>
            <Box component="div" className={classes.SigninBoxx}>
                <Typography variant="h5" component="h5" style={{'fontWeight':'600 '}}>Wrong Network</Typography>
                <Typography variant="span" component="span" style={{"fontWeight":'400','color':'rgb(110, 110, 110)'}}>Looks like you connected to unsupported network. Change network to Mainnet</Typography>
                <Box component="div">
                    <Button variant="contained" onClick={()=>switchNetwork()}>Switch Network</Button>
                </Box>
            </Box>
        </Container>
    )
}

export default WrongNetworkModal