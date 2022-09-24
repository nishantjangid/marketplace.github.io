import React from 'react'
import { Box, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { LoadingButton } from '@mui/lab';
import { useWeb3React } from '@web3-react/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../utils/Constant';
import axios, { Axios } from 'axios';
const useStyles = makeStyles((theme) => ({
  inputClass: {
    width: "100%",
    margin: "1rem !important",
    [theme.breakpoints.up("sm")]: {

    },
  },
}));
const CreateCollection = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (active) {
      const name = e.target.collection_name.value;
      const image = e.target.image.files[0];
      var data = new FormData();
      data.append("name", name);
      data.append("image", image);
      data.append("address", account);
      await axios.post(`${API_URL}/collection/addCollection`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            toast.success(res.data.message);
          } else {
            toast.warning(res.data.message);
          }
        })
        .catch(err => { console.log(err) })
    } else {      
      toast.warning("Please connect your wallet");
    }
  }
  return (
    <>
      <Container maxWidth="sm" >
      <ToastContainer />
        <Box component="form" sx={{ "width": "100%", d: "flex", alignItems: "center", justifyContent: "center", mt: "5rem" }} onSubmit={handleSubmit}>
          <Typography variant='h3' style={{ "textAlign": "center" }}>
            Create Collection
          </Typography>
          <TextField fullWidth className={classes.inputStyle} type="text" key={"name"} id="standard-basic" label="Name" name="collection_name" variant="standard" required />
          <TextField fullWidth className={classes.inputStyle} type="file" key={"file"} name="image"  required />
          <Box component="div" sx={{ "textAlign": "center", mt: 1 }}>
            <LoadingButton type="submit" variant="contained" loading={loading} loadingPosition="center">Create</LoadingButton>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default CreateCollection