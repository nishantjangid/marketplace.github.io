import { Button } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import React from 'react'
import { removeInfo } from '../redux/accountSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useDisconnect } from '../Hooks/useDisconnect';

const Disconnect = () => {
    const {disconnect} = useDisconnect();
  return (
    <>
        <Button variant='container' style={{ "color": "#fff" }} onClick={() => disconnect()}>Sign out</Button>        
    </>
  )
}

export default Disconnect