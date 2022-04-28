import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useEffect, useState } from 'react';
import Image from "../images/image1.png";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/Constant';
import { LoadingButton } from '@mui/lab';
import { ContractAddress, initiateContract } from '../utils/ContractInfo';
import { toast, ToastContainer } from 'react-toastify';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';
const Heading = {
    "fontSize":"30px",
    "fontWeight":"bolder"
}
const nftOwnerDetail = {
    "flexFlow": "row nowrap",
    "-WebkitBoxPack": "justify",
    "justifyContent": "space-between",
    "display":"flex",
    "marginTop":"2rem"
}
const TabStyle = { "border": "none !important", "borderRadius": "0px !important", "background": "transparent", "color": "#000 !important", "fontWeight": "bold !important" }

const DetailHeading = {"fontWeight":"700","color":"rgb(110, 110, 110)","fontSize":"15px","marginBottom":"0.5rem"};

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box component="div" sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const Details = () => {
    const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();
    const [nfts,setNfts] = useState([]);
    const location = useLocation();
    const nftID = location.pathname.split("/")[2];
    const accountInfo = useSelector(state => state.accountInfo);    
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    async function buyNFT(id) {
        if(active === true){

            if(loading){
                setLoading(false);
            }else{
                setLoading(true);
            }
    
            await axios.get(`${API_URL}/nft/get-one/${id}`,{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(async(response) =>{                   
                if(response.data.code == 200){                
                    try{                                                                          
                        
                        await accountInfo.contract.signer.signMessage(`For Buy NFT in ${response.data.message.price} By ${ContractAddress} `);
                        setLoading(true);                                            
                        let confirmTransaction = await accountInfo.contract.buyWithBNB(nftID,account,{ value: (response.data.message.price*(10**18)).toString()});
                        await confirmTransaction.wait();
                        setLoading(false);
                        
                        var data = new FormData();
                        data.append("resell",0);
                        data.append("tokenID",response.data.message.tokenId);
                        data.append("address",account);        
                        const json = JSON.stringify({ resell: 0,tokenID:response.data.message.tokenId,address:account });
                        axios.post(`${API_URL}/nft/changeOwner`,json,{
                            headers:{
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(response =>{
                            console.log(response);
                            if(response.data.code == 200){
                                toast.success(response.data.message);
                            }else{
                                toast.error(response.data.message);
                            }
                        })  
                        .catch(err=>{
                            toast.error(err.message);
                        });         
                        
                    }catch(err){
                        setLoading(false);
                        toast.error(err.message);
                    }        
                }else if(response.data.code == 500){
                    toast.error(response.data.message);
                }
            }).catch((err)=>{
                toast.error(err.message);           
            })        
        }else{
            toast.warning("Please connect your wallet");
        }


    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(async()=>{
       await axios.get(`${API_URL}/nft/get-one/${nftID}`,{
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response =>{
            
            if(response.data.code == 200){
                setNfts([response.data.message]);
            }else if(response.data.code == 500){
                console.log(response.data.message)
            }
        })
        .catch((err)=>{
            console.log(err);
        });

    },[]);    

  return (
      <Container maxWidth="lg" sx={{"padding":"2rem 0","marginTop":"7rem"}}>
      <ToastContainer/>
      {nfts.map(nft => 
            (<Grid container spacing={2} key={nft._id}>
                <Grid  item lg={6} md={6} xs={12} sx={{"width":"100%","height":"100%","padding":"2rem"}}>
                    <Box component="img" src={`${API_URL+'/'+nft.path}`} sx={{"width":"100%","objectFit":"cover","borderRadius":"10px"}}/>
                </Grid>
                <Grid  item lg={6} md={6} xs={12}>
                    <Box sx={{"padding":"2rem"}}>
                        <Typography sx={Heading}>{nft.name}</Typography>
                        <Box component="div" sx={{"display":"flex","flexDirection":"row","fontWeight":"700"}}>
                            <Box component="div" sx={{"color":"rgb(110, 110, 110)"}}>Price:</Box>&nbsp;<Box component="div"> {nft.price} ETH</Box>&nbsp;
                            <Box component="div" sx={{"color":"rgb(110, 110, 110)"}}>1/1</Box>
                        </Box>
                        <Box component="p" sx={{"whiteSpace":"pre-wrap","overflowWrap":"break-word","textAlign":"justify","color":"rgb(4, 4, 5)","fontSize":"20px !important"}}>
                        {nfts.description}
                        </Box>
                        <Box style={nftOwnerDetail}>
                            <Box sx={{"width":"calc(50% - 6px);"}}>
                                <Typography sx={DetailHeading}>Creator</Typography>
                                <Box sx={{"display":"flex","alignItems":"center"}}>
                                    <Box component="img" src={Image} width="55px" style={{"borderRadius":"50%"}}></Box>
                                    <Typography component="h2" sx={{"marginLeft":"0.5rem"}}>{(nft.creatorAddress).substr(0,9)}...</Typography>
                                </Box>
                            </Box>
                            <Box sx={{"width":"calc(50% - 6px);"}}>
                                <Typography sx={DetailHeading}>Collection</Typography>
                                <Box sx={{"display":"flex","alignItems":"center"}}>
                                    <Box component="img" src={Image} width="55px" style={{"borderRadius":"50%"}}></Box>
                                    <Typography component="h2" sx={{"marginLeft":"0.5rem"}}>Owner Address</Typography>
                                </Box>
                            </Box>
                        </Box>  
                        <Box style={{"width":"100%","display":"flex","alignItems":"center","justifyContent":"center"}}>
                        {loading==true ?
                        <LoadingButton loading variant="outlined"
                        style={{"border":"none","padding":".5rem 2rem","marginTop":"2rem"}}
                        >
                            Submit
                        </LoadingButton>
                         : 
                            <LoadingButton
                            onClick={()=>buyNFT(nftID)}                    
                            variant="outlined"
                            style={{"border":"none","padding":".5rem 2rem","marginTop":"2rem","color":"#000"}}>
                                Buy
                            </LoadingButton>
                         }
                        </Box>                      
                        <Box component="div" sx={{ borderBottom: 1, borderColor: 'divider',"marginTop":"2rem" }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab sx={TabStyle} label="Details" {...a11yProps(0)} />
                                <Tab sx={TabStyle} label="Bids" {...a11yProps(1)} />
                                <Tab sx={TabStyle} label="History" {...a11yProps(2)} />
                            </Tabs>
                            </Box>
                            <TabPanel  value={value} index={0}>
                                <Box component="div">
                                    <Typography sx={DetailHeading}>Owner</Typography>
                                    <Box component="div" sx={{"display":"flex","alignItems":"center"}}>
                                        <Box component="img" src={Image} width="55px" style={{"borderRadius":"50%"}}></Box>
                                        <Typography component="h2" sx={{"marginLeft":"0.5rem"}}>{(nft.ownerAddress).substr(0,9)}...</Typography>
                                    </Box>
                                </Box>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                            Item Two
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <Box sx={{"display":"flex","alignItems":"center"}}>
                                    <Box component="img" src={Image} width="55px" sx={{"borderRadius":"50%","marginRight":"0.5rem"}}/>
                                    <Box sx={{"display":"flex","flexDirection":"column"}}>
                                        <Typography component="span">Listed For 6 ETH</Typography>
                                        <Typography component="span">By Nishant 34 minitus ago</Typography>
                                    </Box>
                                </Box>
                            </TabPanel>                            
                        
                    </Box>
                </Grid>
            </Grid>)
      )}
      </Container>
  );
};

export default Details;
