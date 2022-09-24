import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useWeb3React } from '@web3-react/core';
import { ToastContainer, toast } from 'react-toastify';
import axios, { Axios } from 'axios';
import { API_URL, CHAINID } from '../utils/Constant';

import { ethers } from 'ethers';
import { ContractAddress, initiateContract } from '../utils/ContractInfo';
import { LoadingButton } from '@mui/lab';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

const inputStyle = {
    "width": "100%",
    "marginBottom": "1rem"
}
const Mint = () => {
    const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();
    const [loading, setLoading] = useState(false);    
    const [activatingConnector, setActivatingConnector] = useState()
    const accountInfo = useSelector(state => state.accountInfo);

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined)
        }
    }, [activatingConnector, connector])


    const handleSubmit = async (e) => {

        e.preventDefault();
        const name = e.target.name.value;
        const description = e.target.description.value;
        const royalities = e.target.royalities.value;
        const price = e.target.price.value;
        const image = e.target.image.files[0];

        if (name !== "" && !isNaN(name)) {
            toast.warning("Please enter a valid name");
            return false;
        }

        if (royalities !== "" && isNaN(royalities)) {
            toast.warning("Please enter a valid royalities");
            return false;
        }

        if (price !== "" && isNaN(price)) {
            toast.warning("Please enter a valid price");
            return false;
        }

        if (active === true) {


            try {

                let tokenURI = `${API_URL}/uploads/`;
                let value = await ethers.utils.parseEther(price);
                let tokenID = Math.floor(Math.random() * 10000000000000);
                let paymentCurrency = ContractAddress;
                setLoading(true);
                await accountInfo.contract.signer.signMessage("For Create NFT", paymentCurrency, value);

                let confirmTransaction = await accountInfo.contract.mintNFT(tokenURI, 0, tokenID, false, value, paymentCurrency, royalities);
                let receipt = await confirmTransaction.wait();
                
                var data = new FormData();
                data.append("name", name);
                data.append("description", description);
                data.append("price", price);
                data.append("royalities", royalities);
                data.append("image", image);
                data.append("tokenId", tokenID);
                data.append("address", account);

                axios.post(`${API_URL}/nft/add`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        setLoading(false);
                        if (response.data.message) {
                            toast.success(response.data.message);
                        }
                        if (response.data.error) {
                            toast.error(response.data.error)
                        }
                    })
                    .catch(err => {
                        setLoading(false);
                        toast.error(err.message);
                    });
            } catch (err) {
                setLoading(false);
                toast.error(err.message);
            }
        } else {
            toast.warning("Please connect wallet");
        }



    }



    return (
        <> 
                <Container maxWidth="sm" >
                    <ToastContainer />
                    <Box component="form" sx={{ "width": "100%", d: "flex", alignItems: "center", justifyContent: "center", mt: "5rem" }} onSubmit={handleSubmit}>
                        <Typography variant='h3' style={{ "textAlign": "center" }}>
                            Mint a NFT
                        </Typography>
                        <TextField fullWidth style={inputStyle} type="text" id="standard-basic" label="Name" name="name" variant="standard" required />
                        <TextField fullWidth style={inputStyle} type="text" label="Description" name="description" variant="standard" required />
                        <TextField fullWidth style={inputStyle} type="number" inputProps={{ maxLength: 3, step: "1" }} label="Royalities" name="royalities" variant="standard" />
                        <TextField fullWidth style={inputStyle} type="number" inputProps={{ maxLength: 13, step: "any" }} label="Price" name="price" variant="standard" required />
                        <TextField fullWidth style={inputStyle} type="file" name="image" />
                        <Box component="div" sx={{ "textAlign": "center", mt: 1 }}>
                            <LoadingButton type="submit" variant="contained" loading={loading} loadingPosition="center">Mint</LoadingButton>
                        </Box>
                    </Box>
                </Container>
        </>
    )
}

export default Mint
