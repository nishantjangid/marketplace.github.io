import { Container, Grid } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Image1 from "../../images/image1.png";
import Image2 from "../../images/image2.png";
import Image3 from "../../images/image3.jpg";
import "./HomeSlider.css";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const HomeSlider = () => {
    return (
        <Container maxWidth="xl">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        
                        <Item className='HeroSectionSliderImage'><img src={Image1} alt="" style={{ "objectFit": "cover", "height": "100%", "width": "100%" }} /></Item>
                        
                    </Grid>
                    <Grid item xs={8}>
                        <Box sx={{ p: 2, "display": "flex", "flexDirection": "row","flexWrap":"wrap"}}>
                            <Item className='HeroSectionImage'><img src={Image1} alt="" style={{ "objectFit": "cover", "height": "100%", "width": "100%" }} /></Item>
                            <Item className='HeroSectionImage'><img src={Image2} alt="" style={{ "objectFit": "cover", "height": "100%", "width": "100%" }} /></Item>
                            <Item className='HeroSectionImage'><img src={Image3} alt="" style={{ "objectFit": "cover", "height": "100%", "width": "100%" }} /></Item>
                            <Item className='HeroSectionImage'><img src={Image1} alt="" style={{ "objectFit": "cover", "height": "100%", "width": "100%" }} /></Item>
                            <Item className='HeroSectionImage'><img src={Image1} alt="" style={{ "objectFit": "cover", "height": "100%", "width": "100%" }} /></Item>
                            <Item className='HeroSectionImage'><img src={Image2} alt="" style={{ "objectFit": "cover", "height": "100%", "width": "100%" }} /></Item>
                        
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default HomeSlider
