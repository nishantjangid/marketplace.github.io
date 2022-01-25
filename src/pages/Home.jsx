
import { Container, Grid, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react'

import { Paper, Button } from '@mui/material'
import Carousel from 'react-material-ui-carousel';
import { styled } from '@mui/material/styles';
import Image1 from "../images/image1.png";
import { Box } from '@mui/system';
const theme = createTheme();
theme.typography.h3 = {
    fontSize: '1.2rem',

    '@media (min-width:600px)': {
        fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '2.4rem',
    },
};
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
    "z-index": "10",
    "whiteSpace": "pre-wrap",
   "textShadow": "0px 0px 2px #000000"
}

const Home = () => {

    return (
        <Container maxWidth="xl">
            <ThemeProvider theme={theme}>
                {/* <Typography variant="h3">Ceate single item on Ethereum</Typography> */}
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={4}>
                        <Item style={{ "width": "100%", "height": "100%", "position": "relative" }}>
                            <Box style={ImageText}>
                                <Typography variant="h5" component="span">Classic NFT</Typography>
                            </Box>
                            <img src={Image1} style={{ "width": "100%", "height": "100%" }} />
                        </Item>
                    </Grid>
                    <Grid item xs={12} lg={8} style={{ "display": "flex", "flexWrap": "wrap", "width": "100%", "height": "100%" }} spacing={3}>
                        <Grid item xs={12} md={12} lg={3}>
                            <Item style={{ "width": "100%", "height": "100%", "position": "relative" }}>
                                <Box style={ImageText}>
                                    <Typography variant="h5" component="span">Classic NFT</Typography>
                                </Box>
                                <img src={Image1} style={{ "width": "100%", "height": "100%" }} />
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={12} lg={3}>
                            <Item style={{ "width": "100%", "height": "100%", "position": "relative" }}>
                                <Box style={ImageText}>
                                    <Typography variant="h5" component="span">Classic NFT</Typography>
                                </Box>
                                <img src={Image1} style={{ "width": "100%", "height": "100%" }} />
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={12} lg={3}>
                            <Item style={{ "width": "100%", "height": "100%", "position": "relative" }}>
                                <Box style={ImageText}>
                                    <Typography variant="h5" component="span">Classic NFT</Typography>
                                </Box>
                                <img src={Image1} style={{ "width": "100%", "height": "100%" }} />
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={12} lg={3}>
                            <Item style={{ "width": "100%", "height": "100%", "position": "relative" }}>
                                <Box style={ImageText}>
                                    <Typography variant="h5" component="span">Classic NFT</Typography>
                                </Box>
                                <img src={Image1} style={{ "width": "100%", "height": "100%" }} />
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={12} lg={3}>
                            <Item style={{ "width": "100%", "height": "100%", "position": "relative" }}>
                                <Box style={ImageText}>
                                    <Typography variant="h5" component="span">Classic NFT</Typography>
                                </Box>
                                <img src={Image1} style={{ "width": "100%", "height": "100%" }} />
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={12} lg={3}>
                            <Item style={{ "width": "100%", "height": "100%", "position": "relative" }}>
                                <Box style={ImageText}>
                                    <Typography variant="h5" component="span">Classic NFT</Typography>
                                </Box>
                                <img src={Image1} style={{ "width": "100%", "height": "100%" }} />
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={12} lg={3}>
                            <Item style={{ "width": "100%", "height": "100%", "position": "relative" }}>
                                <Box style={ImageText}>
                                    <Typography variant="h5" component="span">Classic NFT</Typography>
                                </Box>
                                <img src={Image1} style={{ "width": "100%", "height": "100%" }} />
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={12} lg={3}>
                            <Item style={{ "width": "100%", "height": "100%", "position": "relative" }}>
                                <Box style={ImageText}>
                                    <Typography variant="h5" component="span">Classic NFT</Typography>
                                </Box>
                                <img src={Image1} style={{ "width": "100%", "height": "100%" }} />
                            </Item>
                        </Grid>
                    </Grid>
                </Grid>

            </ThemeProvider>
        </Container>
    )
}

export default Home
