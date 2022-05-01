import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Metamask from "../images/metamask.png"
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { ethers } from "ethers";
import axios from 'axios';
import { API_URL } from '../utils/Constant';
import { ABI, ContractAddress } from '../utils/ContractInfo';
import { accountInfos, removeInfo } from '../redux/accountSlice';
import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';
import { TransactionContext } from "../context/TransactionContext";
import { InjectedConnector } from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
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
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);

  const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [walletType, setWalletType] = React.useState("");
  const accountInfo = useSelector(state => state.accountInfo);    
  
  const injected = new InjectedConnector({ supportedChainIds: [56, 97] });
  const connectors = new WalletConnectConnector({
    rpc: { 56: 'https://bsc-dataseed.binance.org/' },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: 10000
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function connect(provider, wallet) {
    try {
      await activate(provider);
      setWalletType(wallet);
    } catch (ex) {
      console.log(ex)
    }
  }

  // INITIALIZE VALUES WHEN WALLET CONNECT
  const initial = async () => {

    if (active === true) {

      const provider = await new ethers.providers.Web3Provider(library.provider);
      const signer = await provider.getSigner();
      const contract = await new ethers.Contract(ContractAddress, ABI, signer);
      let a = {
        account,
        connector,
        chainId,
        walletType,
        contract
      }
      dispatch(accountInfos(a));
    } else {
      console.log("Err Something went wrong");
    }
  }
  
  // INSERT USER  WHEN CONNECT
  const insertUser = () => {
    try {
      if (active === true) {

        const json = JSON.stringify({ "name": "Default_name", "address": account });
        axios.post(`${API_URL}/nft/addNewUser`, json, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        })
          .then(response => {

            if (response.data.message) {

            }
            if (response.data.error) {

            }
          })
          .catch(err => {
            // console.log(err);
          });
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  }
  useEffect(() => {
    initial();
    insertUser();
  }, [account,walletType]);


  return (
    <div>
      {!(active) && <Button variant="contained" onClick={handleOpen}>Sign in</Button>}
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <Box variant="contained" style={{ "float": "right", "padding": "0.5rem", "marginBottom": "1rem", "cursor": "pointer" }} onClick={handleClose}><Close /></Box>
          <Button variant="contained" style={{ width: "100%", "marginBottom": "1rem" }} onClick={() => connect(injected, "metamask")}>
            <Typography onClick={() => handleClose()}>Metamask</Typography>
            {/* <Metamask/> */}
          </Button>
          {/* <Button variant="contained" style={{width:"100%","marginBottom":"1rem"}} onClick={()=>connect(walletconnect)}>
                    <Typography onClick={()=>handleClose()}>Wallet Connect</Typography>                    
                </Button> */}

        </Box>
      </Modal>
    </div>
  )
}

export default ConnectButtonModal
