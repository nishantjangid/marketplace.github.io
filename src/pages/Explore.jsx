import React, { useMemo } from 'react'
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Container, Skeleton, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import Cards from '../components/Cards/Cards';
import Dummy from "../dummyDataNFT.json";
import { API_URL } from '../utils/Constant';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  ExploreArea: {
      [theme.breakpoints.up("sm")]: {

      },
  },
  filters: {
      display:'flex',
      [theme.breakpoints.up("sm")]: {

      },
  },
  selectOption:{
    
    [theme.breakpoints.up("sm")]: {

    },
  },
  itemCard: {
    rowGap: "1rem",
    columnGap: "1.5rem",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    flex: "1 1 auto",
    [theme.breakpoints.up("sm")]: {

    },
  },  
}));
const category = ['Art','Metaverse','Color','Music'];
const saleType = ['Auction','Buy Now','On Sale'];
const Explore = () => {
  const classes = useStyles();
  const [data,setData] = useState([]);
  const [load,setLoad] = useState(true);
  const getNFTs = async () => {
    await axios.get(`${API_URL}/nft/get-all`,{
      headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
      }
    })
    .then((res)=>{
      if(res.data.code == 200){
        setLoad(false);
        setData(res.data.message);
      }else{
        setLoad(false);
      }
    })
    .catch(err=>console.log(err));
  }

  useMemo(()=>{
    getNFTs();
  })

  return (    
      <Container maxWidth="lg" sx={{'marginTop':'2rem'}}>
        <Box className={classes.ExploreArea} component="div">
          <Box className={classes.filters}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={category}
              className={classes.selectOption}
              sx={{ width: 300,marginRight:'1rem' }}
              renderInput={(params) => <TextField {...params} label="Category" />}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={saleType}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Sale Type" />}
            />
          </Box>
          <Box component='div' sx={{'margin':'1rem 0'}}>
            <Box component='div' className={classes.itemCard}>
              {load ? 
                <Skeleton />                            
               :
               data.map((e)=> <Cards data={e} type='explore' />)}
            </Box>
          </Box>
        </Box>
      </Container>
  )
}

export default Explore