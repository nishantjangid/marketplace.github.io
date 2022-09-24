import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Image1 from "../../images/image1.png";

import AvatarGroup from '@mui/material/AvatarGroup';
import { Favorite } from '@mui/icons-material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Checkbox from '@mui/material/Checkbox';

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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Cards = ({ data, type }) => {
  const classes = useStyles();
  const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();
  const accountInfo = useSelector(state => state.accountInfo);   
  const [expanded, setExpanded] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const price = e.target.price.value;
    const tokenID = e.target.tokenid.value;

    if (price == "" && parseFloat(price) > 0) {
      toast.warning("Please enter a valid Number");
      return false;
    }

    if (active === true) {
      try {
                
        let value = await ethers.utils.parseEther(price);
        let paymentCurrency = ContractAddress;
        setLoading(true);
        await accountInfo.contract.signer.signMessage("For Resell your NFT");
        let confirmTransaction = await accountInfo.contract.setTokenPrice(value, tokenID, true, paymentCurrency, false);
        await confirmTransaction.wait();

        var data = new FormData();
        data.append("tokenID", tokenID);
        data.append("price", price);
        data.append("resell", 1);
        const json = JSON.stringify({ resell: 1,tokenID:tokenID,price:price });
        axios.post(`${API_URL}/nft/resell`, json, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
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
        console.log(err);
        setLoading(false);
        toast.error(err.message);
      }

    } else {
      toast.warning("Please connect wallet");
    }

  }

  return (
    <Card className={classes.cardContainer}>
      <Box className={classes.cardArea}>
        <AvatarGroup max={3}>
          <Avatar  alt="Remy Sharp" src={Image1} />
          <Avatar alt="Travis Howard" src={Image1} />
          <Avatar alt="Cindy Baker" src={Image1} />
        </AvatarGroup>
        <MoreHorizIcon />
      </Box>
      <Link to={`/details/` + data.tokenId}>
        <Box
          component="img"
          className={classes.cardImage}
          src={`${API_URL}` + data.path}
          alt="Paella dish"
        >
        </Box>
      </Link>
      <CardContent className={classes.CardContent}>
      <Box className={classes.cardTitleDetails}>
        <Link to={`/details/` + data.tokenId} style={{"textDecoration":"none","color":"inherit"}}>
          <Typography variant="div" color="text.dark" className={classes.cardTitle}>{data.name}</Typography>
        </Link>
        <Typography variant="div" color="text.secondary" className={classes.cardDetails}>NFTs 1/1</Typography>
      </Box>
        <Box sx={{ "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between" }}>
          <Typography variant="div" color="text.dark" className={classes.cardDetails}>{data.price} ETH</Typography>
          <Box component="div" sx={{ "display": "flex", "alignItems": "center" }} className={classes.likeIcon}>            
            <LikeButton />
            <Typography component="span">0</Typography>
          </Box>
        </Box>
        {type === "owned" ?
          data.resell === 0 ?
          (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField fullWidth type="number" inputProps={{ maxLength: 13, step: "any" }} label="Price" name="price" variant="standard" required />
              <TextField type="hidden" name="tokenid" variant="standard" value={data.tokenId} required />
              <LoadingButton type="submit" variant="contained" loading={loading} loadingPosition="center" style={{ "width": "100%", "marginTop": "1rem" }} >Resell</LoadingButton>
            </Box>
          ) : ''
          : ''
        }
      </CardContent>
    </Card>
  );
};

export default Cards;
