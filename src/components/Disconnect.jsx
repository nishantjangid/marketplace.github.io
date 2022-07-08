import { Button } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import React from 'react'
import { removeInfo } from '../redux/accountSlice';
import { useDispatch, useSelector } from 'react-redux';

const Disconnect = () => {
    const {  deactivate } = useWeb3React();
    const dispatch = useDispatch();
    async function disconnect() {
        try {
            dispatch(removeInfo());
            deactivate()
        } catch (ex) {
            console.log(ex)
        }
    }

  return (
    <>
        <Button variant='container' style={{ "color": "#fff" }} onClick={() => disconnect()}>Sign out</Button>        
    </>
  )
}

export default Disconnect