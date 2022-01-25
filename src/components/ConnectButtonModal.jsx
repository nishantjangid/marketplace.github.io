import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Metamask from "../images/metamask.png"
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import {TransactionContext} from "../context/TransactionContext";
import { useWeb3React } from '@web3-react/core';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
const ConnectButtonModal = () => {
    const [open, setOpen] = useState(false);
    const {injected,walletconnect,ethereumContract} = useContext(TransactionContext);     
    const {connector, library, chainId, account, activate, deactivate, active, error} = useWeb3React();
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };    

    async function connect(provider) {
        try {
          await activate(provider);
        } catch (ex) {
          console.log(ex)
        }
      }    
    return (
        <div>
        { !(active) && <Button variant="contained" onClick={handleOpen}>Connect Wallet</Button>}
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 500 }}>
                  <Box variant="contained" style={{"float":"right","padding":"0.5rem","marginBottom":"1rem","cursor":"pointer"}}   onClick={handleClose}><Close /></Box>
                <Button variant="contained" style={{width:"100%","marginBottom":"1rem"}} onClick={()=>connect(injected)}>
                    <Typography onClick={()=>handleClose()}>Metamask</Typography>
                    {/* <Metamask/> */}
                </Button>
                <Button variant="contained" style={{width:"100%","marginBottom":"1rem"}} onClick={()=>connect(walletconnect)}>
                    <Typography onClick={()=>handleClose()}>Wallet Connect</Typography>
                    {/* <Metamask/> */}
                </Button>
                    
                </Box>
            </Modal>            
        </div>
    )
}

export default ConnectButtonModal
