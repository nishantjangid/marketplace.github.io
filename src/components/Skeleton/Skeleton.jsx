import React from 'react'
import "./skeleton.css";
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
import { Box } from '@mui/material';
import { API_URL } from '../../utils/Constant';
import { Link } from 'react-router-dom';

const Skeleton = () => {
  return (
    <Card sx={{ maxWidth: 300,"width":"220px","border":"1px solid rgba(4, 4, 5, 0.1) !important","boxShadow":"none","borderRadius":"20px"}}>
    <Box sx={{"display":"flex","flexDirection":"row","alignItems":"center","justifyContent":"space-between","padding":"10px 16px"}}>
        <AvatarGroup max={3}>
          <Box component="span" alt="Remy Sharp" className="threeImageSK"/>
          <Box component="span" alt="Travis Howard"  className="threeImageSK"/>
          <Box component="span" alt="Cindy Baker" className="threeImageSK"/>
        </AvatarGroup>       
          <MoreHorizIcon />          
      </Box>
      
      <Box
        component="div"
        sx={{"width":"100%","height":"250px","objectFit":"cover"}}                
        className="nftImageSK"
      >
    </Box>
      
    <CardContent sx={{"display":"flex","flexDirection":"column"}}>
      <Typography variant="div" color="text.dark" className="nftNameSk"></Typography>
      <Typography variant="div" color="text.dark" className="nftTypeSk"></Typography>
      <Box sx={{"display":"flex","flexDirection":"row","alignItems":"center","justifyContent":"space-between"}}>
        <Typography variant="div" color="text.dark" className="nftTypeSk"></Typography>
        
      </Box>
    </CardContent>
  </Card>
  )
}

export default Skeleton