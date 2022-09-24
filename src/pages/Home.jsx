
import { Avatar, AvatarGroup, CardContent, Container, Grid,  Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect } from 'react'

import { Paper, Button } from '@mui/material'
import Carousel from 'react-material-ui-carousel';
import { styled } from '@mui/material/styles';
import Image1 from "../images/image1.png";
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import dummyData from '../dummyDataNFT.json';
import Cards from '../components/Cards/Cards';
import Skeleton from '../components/Skeleton/Skeleton';
import axios from 'axios';
import { API_URL } from '../utils/Constant';
import { useWeb3React } from '@web3-react/core';
const useStyles = makeStyles((theme) => ({
    containerClass: {
        margin: '2rem 0',
        [theme.breakpoints.up("sm")]: {

        },
    },
}));


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ImageText = {
    "position": "absolute", "top": "20px", "left": "30px", "color": "#fff",
    "fontWeight": "700 !important",
    "transform": "translate3d(0px, 0px, 0px)",
    "whiteSpace": "pre-wrap",
    "textShadow": "0px 0px 2px #000000"
}

const imageArea = { "width": "100%", "height": "100%", "position": "relative", "padding": "0px", "borderRadius": "16px", "overflow": "hidden" }

const Home = () => {
    const classes = useStyles();
    const [recents, setRecents] = React.useState(dummyData);
    const [recentLoading, setRecentLoading] = React.useState(false);
    const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();    

    const getRecents = async () => {
        setRecentLoading(true);        
            await axios.get(`${API_URL}/nft/get-recents/`,{
                headers:{
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            })
            .then(response =>{
                
                if(response.data.code == 200){
                    console.log(response.data.message);
                    if(response.data.message.length>0){
                        setRecentLoading(false);                        
                        setRecents(response.data.message);
                    }
                }else if(response.data.code == 500){
                    console.log(response.data.message)
                }
            })
            .catch((err)=>{
                console.log(err);
            })            
    }
    useEffect(async()=>{
        getRecents();
    },[]);    

    return (
        <Container maxWidth="xl" sx={{mt:"1rem"}}>            
            <Grid container item spacing={3}>
                <Grid container item xs={12} md={4} lg={4}>                    
                        <img src={Image1} style={{ "width": "100%", "height": "100%" }} alt="home Big "/>                    
                </Grid>
                <Grid container item xs={12} md={8} lg={8} style={{ "display": "flex", "flexWrap": "wrap", "width": "100%", "height": "100%" }} spacing={3}>
                    <Grid container item xs={12} md={3} lg={3}>                        
                            <img src={Image1} style={{ "width": "100%", "height": "100%" }} alt="home small "/>                        
                    </Grid>
                    <Grid container item xs={12} md={3} lg={3}>                        
                            <img src={Image1} style={{ "width": "100%", "height": "100%" }} alt="home small "/>                        
                    </Grid>
                    <Grid container item xs={12} md={3} lg={3}>                                                    
                            <img src={Image1} style={{ "width": "100%", "height": "100%" }} alt="home small "/>                        
                    </Grid>
                    <Grid container item xs={12} md={3} lg={3}>                        
                            <img src={Image1} style={{ "width": "100%", "height": "100%" }} alt="home small "/>                        
                    </Grid>
                    <Grid container item xs={12} md={3} lg={3}>                        

                            <img src={Image1} style={{ "width": "100%", "height": "100%" }} alt="home small "/>                        
                    </Grid>
                    <Grid container item xs={12} md={3} lg={3}>                                                
                            <img src={Image1} style={{ "width": "100%", "height": "100%" }} alt="home small " />                        
                    </Grid>
                    <Grid container item xs={12} md={3} lg={3}>                                                    
                            <img src={Image1} style={{ "width": "100%", "height": "100%" }} alt="home small "/>                        
                    </Grid>
                    <Grid container item xs={12} md={3} lg={3}>                                                    
                            <img src={Image1} style={{ "width": "100%", "height": "100%" }} alt="home small "/>                        
                    </Grid>
                </Grid>
            </Grid>
            
            {/* EXPLORE SECTION           */}
            <Box className={classes.containerClass}>
                <Box>
                    <Typography variant="h3">Recents</Typography>
                </Box>
                <Grid container  spacing={2}>

                    {recentLoading ? Array(8).fill(
                        <Grid container item lg={2} md={2} xs={12}>                            
                                <Skeleton />                            
                        </Grid>)
                        :
                        recents.map(e =>
                            <Grid  container item lg={2} md={2} xs={12}>                                
                                <Cards data={e} key={e._id} type={"recents"} />                                
                            </Grid>
                        )
                    }

                </Grid>
            </Box>
        </Container>
    )
}

export default Home
