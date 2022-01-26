import { AccountBalanceOutlined, AccountBalanceWallet, AccountBalanceWalletOutlined, Edit } from '@mui/icons-material';
import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Image1 from "../images/image1.png";
import Cards from '../components/Cards/Cards';
const EditBanner = { "marginTop": "10px", "width": "100%", "objectFit": "cover", "backgroundColor": "rgb(247 245 245);", "height": "250px", "borderRadius": "20px", "position": "relative", }
const ProfilePic = {
    "width": "200px",
    "height": "200px",
    "objectFit": "cover",
    "zIndex": "22",
    "backgroundColor": "red",
    "position": "absolute",
    "bottom": "-40px",
    "left": "10%",
    "borderRadius": "50%",
    "overflow": "hidden"
}

const userInfo = {
    "paddingLeft": "1rem"
}

const TabStyle = { "border": "none !important", "borderRadius": "0px !important", "background": "transparent", "color": "#000 !important", "fontWeight": "bold !important" }

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
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


const Item = () => {
    const [showBtn, setShowBtn] = useState(false);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Container maxWidth="xl" >
            <Box component="div" sx={EditBanner} onMouseEnter={e => { setShowBtn(true); }} onMouseLeave={e => { setShowBtn(false) }}>
                {showBtn && <Button className='editBtn' style={{ "position": "absolute", "bottom": "10px", "right": "10px" }} variant="contained" endIcon={<Edit />}>Edit Profile</Button>}
                <Box component="div" sx={ProfilePic}>
                    <img src={Image1} style={{ "width": "100%", "height": "100%" }} />
                </Box>
            </Box>
            <Box sx={{ "paddingTop": "4rem" }}>
                <Box component="div" sx={userInfo}>
                    <Typography style={{ "verticalAlign": "center", "alignItems": "center", "borderRadius": "20px", "background": "rgba(4, 4, 5, 0.04)", "padding": "6px 6px 6px 0px", "display": "inline", "fontSize": "0.9rem", "fontWeight": "bolder", "color": "rgb(110, 110, 110)" }}>0xac672e.......C1089f</Typography>
                </Box>
                <Box sx={{ "display": "flex", "alignItems": "center", "margin": "1rem 0" }}>
                    <Box component="span" sx={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between", "width": "90px", "marginRight": "1rem" }}>
                        <Box component="span" style={{ "color": "#000", "fontWeight": "bold" }}>0</Box>
                        <Typography style={{ "color": "rgb(110, 110, 110)", "fontWeight": "bold" }}>followers</Typography>
                    </Box>
                    <Box component="span" sx={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between", "width": "90px" }}>
                        <Box component="span" style={{ "color": "#000", "fontWeight": "bold" }}>0</Box>
                        <Typography style={{ "color": "rgb(110, 110, 110)", "fontWeight": "bold" }}>following</Typography>
                    </Box>
                </Box>

                <Box component="div">
                    <Button variant="outlined" sx={{ "border": "1px solid rgba(4, 4, 5, 0.1) !important", "color": "#000 !important", "background": "transparent", "fontWeight": "bold", "fontSize": "0.8rem", "marginRight": "1rem" }}>Edit Profile</Button>
                    <Button variant="outlined" sx={{ "border": "1px solid rgba(4, 4, 5, 0.1) !important", "color": "#000 !important", "background": "transparent", "fontWeight": "bold", "fontSize": "0.8rem" }}>...</Button>
                </Box>

                <Box sx={{ width: '100%' }}>
                    <Box >
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab sx={TabStyle} label="On Sale" {...a11yProps(0)} />
                            <Tab sx={TabStyle} label="Owned" {...a11yProps(1)} />
                            <Tab sx={TabStyle} label="Created" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Cards/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                </Box>

            </Box>
        </Container>);
};

export default Item;
