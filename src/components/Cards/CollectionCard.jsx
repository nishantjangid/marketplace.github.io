import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Image1 from "../../images/image1.png";

import AvatarGroup from '@mui/material/AvatarGroup';

import { Box, TextField } from '@mui/material';
import { API_URL } from '../../utils/Constant';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { ContractAddress, initiateContract } from '../../utils/ContractInfo';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import LikeButton from '../LikeButton/LikeButton';


const useStyles = makeStyles((theme) => ({
  cardContainer: {
      border: "1px solid rgb(233 233 233) !important",
      boxShadow: "none",
      borderRadius: "20px !important",
      padding:"0.5rem", 
      maxWidth: "200px",   
       
      [theme.breakpoints.down("md")]: {
        maxWidth: "100%", 
        width:'100% !important',   
      },
  },
  cardArea:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: "10px",
    [theme.breakpoints.up("sm")]: {

    },    
  },
  cardTitle:{
    fontSize:'1rem',
    fontWeight:"bold",
    [theme.breakpoints.up("sm")]: {

    }
  },
  cardDetails:{
    fontSize:'0.7rem',
    fontWeight:"bold",
    [theme.breakpoints.up("sm")]: {

    }
  },
  cardImage:{
    width: "100%",
    minHeight: "200px",
    maxHeight: "200px",
    objectFit: "cover",
    borderRadius: "20px !important",
    [theme.breakpoints.up("sm")]: {

    }
  },
  likeIcon:{
    fontSize:"1rem",
    [theme.breakpoints.up("sm")]: {

    }
  },
  CardContent:{
    padding:"16px 10px !important",
    "display": "flex", "flexDirection": "column", 
    [theme.breakpoints.down("md")]: {
      
    }
  },
  cardTitleDetails:{
    background: 'rgba(22, 22, 26, 0.04)',
    borderRadius: '10px',
    display:"flex",
    flexDirection:"column",
    padding:"0.5rem",
    [theme.breakpoints.down("md")]: {
      
    }
  }
}));


const CollectionCard = ({ data, type }) => {
  const classes = useStyles();
    console.log(data);
  return (
    <Card className={classes.cardContainer}>      
      <Link to={`/collection-nfts/` + data._id}>
        <Box
          component="img"
          className={classes.cardImage}
          src={`${API_URL}` + data.image}
          alt="Paella dish"
        >
        </Box>
      </Link>
      <CardContent className={classes.CardContent}>
      <Box className={classes.cardTitleDetails}>
        <Link to={`/collection-nfts/` + data._id} style={{"textDecoration":"none","color":"inherit"}}>
          <Typography variant="div" color="text.dark" className={classes.cardTitle}>{data.name}</Typography>
        </Link>        
      </Box>
      </CardContent>
    </Card>
  );
};

export default CollectionCard;
