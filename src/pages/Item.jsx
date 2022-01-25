import { Edit } from '@mui/icons-material';
import { Button, Container } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import Image1 from "../images/image1.png";
const EditBanner = {"marginTop":"10px", "width": "100%","objectFit":"cover", "backgroundColor": "rgb(247 245 245);", "height": "250px", "borderRadius": "20px", "position": "relative",}
const ProfilePic = {
    "width":"200px",
    "height":"200px",
    "objectFit":"cover",
    "zIndex":"22",
    "backgroundColor":"red",
    "position":"absolute",
    "bottom":"-40px",
    "left":"10%",
    "borderRadius":"50%",
    "overflow":"hidden"
}
const Item = () => {
    const [showBtn,setShowBtn] = useState(false);
    return (
        <Container maxWidth="xl" >
            <Box component="div" sx={EditBanner} onMouseEnter={e => {setShowBtn(true);}} onMouseLeave={e => {setShowBtn(false)}}>
            {showBtn && <Button className='editBtn' style={{"position":"absolute","bottom":"10px","right":"10px"}} variant="contained" endIcon={<Edit />}>Edit Profile</Button>}
                <Box component="div" sx={ProfilePic}>
                    <img src={Image1}  style={{"width":"100%","height":"100%"}}/>
                </Box>                
            </Box>
        </Container>);
};

export default Item;
