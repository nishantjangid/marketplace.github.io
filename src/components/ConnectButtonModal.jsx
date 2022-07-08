import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Metamask from "../images/metamask.png"
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import { ethers } from "ethers";
import axios from 'axios';
import { API_URL, CHAINID } from '../utils/Constant';
import { ABI, ContractAddress } from '../utils/ContractInfo';
import { accountInfos } from '../redux/accountSlice';
import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';
import { TransactionContext } from "../context/TransactionContext";
import { InjectedConnector } from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { toHex } from '../utils/Utils';
import WrongNetworkModal from './WrongNetworkModal';
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
  const [connected,setConnected] = React.useState(false);
  const accountInfo = useSelector(state => state.accountInfo);
  const [connectedRight, setConnectedRight] = useState(true);

  const injected = new InjectedConnector();
  const walletconnect = new WalletConnectConnector({
    rpc: { 97 : "https://data-seed-prebsc-1-s1.binance.org:8545/"},
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    pollingInterval:2000
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

  const isAlreadyConnected = async () => {
    let isConnected = localStorage.getItem('isConnected');
    if(isConnected){
      let wallet = localStorage.getItem('wallet');
      if(wallet == "metamask"){
        await activate(injected);
      }
    }
  }

  // INITIALIZE VALUES WHEN WALLET CONNECT
  const initial = async () => {

    if (active === true) {

      const provider = await new ethers.providers.Web3Provider(library.provider);
      const signer = await provider.getSigner();
      const contract = await new ethers.Contract(ContractAddress, ABI, signer);
      const isConnected = true;
      let a = {
        account,
        connector,
        chainId,
        walletType,
        contract,
        isConnected
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
    if(connected){
      initial();
      insertUser()
    }
  }, [connected]);

  useEffect(() => {
    if(active == true){
        if (Number(chainId) == CHAINID) {
            let connected ={ connected : true };
            setConnectedRight(false);
            setConnected(true);
            
        } else {
            setConnectedRight(true);
            setConnected(false);
        }
    }else{
        setConnectedRight(false);
        setConnected(false);        
    }
}, [chainId]);

  useEffect(()=>{
    isAlreadyConnected();
  },[])


  return (
    <div>
      {connectedRight && <WrongNetworkModal />}
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
          <Button variant="contained" style={{ width: "100%", "marginBottom": "1rem" }} onClick={() => connect(walletconnect,"walletConnect")}>
            <Typography onClick={() => handleClose()}>Wallet Connect</Typography>
          </Button>

        </Box>
      </Modal>
    </div>
  )
}

export default ConnectButtonModal
