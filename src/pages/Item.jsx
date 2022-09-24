
import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Cards from '../components/Cards/Cards';
import { API_URL } from '../utils/Constant';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import Skeleton from '../components/Skeleton/Skeleton';
import { Link } from 'react-router-dom';
import SigninRequest from '../components/SigninRequest';
import { makeStyles } from '@mui/styles';
import UserCoverModal from '../components/UserComponent/UserCoverModal';
import converDemo from "../images/cover-demo.png";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CollectionCard from '../components/Cards/CollectionCard';
const useStyles = makeStyles((theme) => ({
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
    converImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "20px",
        [theme.breakpoints.up("sm")]: {

        },
    }
}));
const EditBanner = { "marginTop": "10px", "width": "100%", "objectFit": "cover", "background": "rgb(34,193,195)", "background": "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)", "height": "250px", "borderRadius": "20px", "position": "relative" }
const ProfilePic = {
    "width": "200px",
    "height": "200px",
    "objectFit": "cover",
    "zIndex": "22",
    "background": "rgb(34,193,195)",
    "background": "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
    "position": "absolute",
    "bottom": "-40px",
    "left": "10%",
    "borderRadius": "50%",
    "overflow": "hidden",
    "border": "5px solid #fff"
}

const userAddress = { "verticalAlign": "center", "alignItems": "center", "borderRadius": "20px", "background": "rgba(4, 4, 5, 0.04)", "padding": "8px", "display": "inline", "fontSize": "0.9rem", "fontWeight": "bolder", "color": "rgb(110, 110, 110)" }

const TabStyle = { "border": "none !important", "borderRadius": "0px !important", "background": "transparent", "color": "#000 !important", "fontWeight": "bold !important" }

const itemCard = {};

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
    const classes = useStyles();
    const [showBtn, setShowBtn] = useState(false);
    const [value, setValue] = React.useState(0);
    const [onSale, setOnSale] = React.useState([]);
    const [owned, setOwned] = React.useState([]);
    const [created, setCreated] = React.useState([]);
    const [collection, setCollection] = React.useState([]);
    const [userDetail, setUserDetail] = React.useState([]);
    const [saleLoading, setSaleLoading] = React.useState(true);
    const [ownedLoading, setOwnedLoading] = React.useState(true);
    const [createdLoading, setCreatedLoading] = React.useState(true);
    const [collectionLoading, setCollectionLoading] = React.useState(true);

    const { account, active } = useWeb3React();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fetchUserNfts = async () => {
        setSaleLoading(true);
        setOwnedLoading(true);
        setCreatedLoading(true);
        setCollectionLoading(true);
        if (active === true) {
            await axios.get(`${API_URL}/nft/user-onsale/${account}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }).then(response => {

                if (response.data.code == 200) {
                    setSaleLoading(false)
                    setOnSale(response.data.message);
                } else if (response.data.code == 500) {
                    console.log(response.data.message)
                }
            })
                .catch((err) => {
                    console.log(err);
                })

            await axios.get(`${API_URL}/nft/user-owned/${account}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            })
                .then(response => {

                    if (response.data.code == 200) {
                        setOwnedLoading(false);
                        setOwned(response.data.message);
                    } else if (response.data.code == 500) {
                        console.log(response.data.message)
                    }
                })
                .catch((err) => {
                    console.log(err);
                })

            await axios.get(`${API_URL}/nft/user-created/${account}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            })
                .then(response => {

                    if (response.data.code == 200) {
                        setCreatedLoading(false);

                        setCreated(response.data.message);
                    } else if (response.data.code == 500) {

                    }
                })
                .catch((err) => {
                    console.log(err);
                })
            // GET USER COLLECTIONS
            await axios.get(`${API_URL}/collection/getUserCollection/${account}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }).then(response => {

                if (response.data.code == 200) {
                    setCollectionLoading(false);
                    setCollection(response.data.message);
                } else if (response.data.code == 500) {
                    setCollectionLoading(false);
                }
            })
                .catch((err) => {
                    console.log(err);
                })


        } else {
            // window.location.href = "./";
        }
    }

    const userDetails = async () => {
        if (active) {
            await axios.get(`${API_URL}/nft/userDetails/${account}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            })
                .then(response => {

                    if (response.data.code == 200) {

                        setUserDetail(response.data.message);
                    } else if (response.data.code == 500) {
                        console.log(response.data.message)
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    useEffect(() => {
        fetchUserNfts();
        userDetails();
    }, [active, account], []);

    return (
        <>
            {
                active === true ?
                    <Container maxWidth="xl">
                        <ToastContainer />
                        {
                            userDetail.length > 0 ?
                                userDetail.map((e) =>
                                    <>
                                        <Box component="div" sx={EditBanner} onMouseEnter={e => { setShowBtn(true); }} onMouseLeave={e => { setShowBtn(false) }}>
                                            <img src={`${e.coverImage != "" ? API_URL + '/' + e.coverImage : converDemo}`} className={classes.converImage} />
                                            {showBtn && <UserCoverModal />}
                                            <Box component="div" sx={ProfilePic}>
                                                <img src={`${API_URL + '/' + e.image}`} style={{ "width": "100%", "height": "100%" }} />
                                            </Box>
                                        </Box>
                                        <Box sx={{ "paddingTop": "4rem" }}>
                                            <Box component="div" sx={{ "paddingLeft": "1rem" }}>
                                                <Typography style={userAddress}>{account}</Typography>
                                            </Box>
                                            <Box sx={{ "display": "flex", "alignItems": "center", "margin": "1rem 0", "paddingLeft": "1rem" }}>
                                                <Box component="span" sx={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between", "width": "90px", "marginRight": "1rem" }}>
                                                    <Box component="span" style={{ "color": "#000", "fontWeight": "bold" }}>0</Box>
                                                    <Typography style={{ "color": "rgb(110, 110, 110)", "fontWeight": "bold" }}>followers</Typography>
                                                </Box>
                                                <Box component="span" sx={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between", "width": "90px" }}>
                                                    <Box component="span" style={{ "color": "#000", "fontWeight": "bold" }}>0</Box>
                                                    <Typography style={{ "color": "rgb(110, 110, 110)", "fontWeight": "bold" }}>following</Typography>
                                                </Box>
                                            </Box>

                                            <Box component="div" sx={{ "paddingLeft": "1rem" }}>
                                                <Link to={`/EditProfile`}>
                                                    <Button component="a" variant="outlined" sx={{ "border": "1px solid rgba(4, 4, 5, 0.1) !important", "color": "#000 !important", "background": "transparent", "fontWeight": "bold", "fontSize": "0.8rem", "marginRight": "1rem", "textTransform": "none !important", "textDecoration": "none !important" }}>Edit</Button>
                                                </Link>
                                                <Button variant="outlined" sx={{ "border": "1px solid rgba(4, 4, 5, 0.1) !important", "color": "#000 !important", "background": "transparent", "fontWeight": "bold", "fontSize": "0.8rem" }}>...</Button>
                                            </Box>

                                            <Box sx={{ width: '100%', "margin": "1rem 0px" }}>
                                                <Box >
                                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                                        <Tab sx={TabStyle} label="On Sale" {...a11yProps(0)} />
                                                        <Tab sx={TabStyle} label="Owned" {...a11yProps(1)} />
                                                        <Tab sx={TabStyle} label="Created" {...a11yProps(2)} />
                                                        <Tab sx={TabStyle} label="Collection" {...a11yProps(3)} />
                                                        <Tab sx={TabStyle} label="Activity" {...a11yProps(4)} />
                                                    </Tabs>
                                                </Box>
                                                <TabPanel value={value} index={0}>
                                                    <Box component="div" className={classes.itemCard}>
                                                        {saleLoading ? Array(8).fill(<Skeleton />)
                                                            :
                                                            onSale.map(e => <Cards data={e} key={e._id} type={"onsale"} />)
                                                        }
                                                    </Box>
                                                </TabPanel>
                                                <TabPanel value={value} index={1}>
                                                    <Box component="div" className={classes.itemCard}>
                                                        {ownedLoading ? Array(8).fill(<Skeleton />)
                                                            :
                                                            owned.map(e => <Cards data={e} key={e._id} type={"owned"} />)
                                                        }
                                                    </Box>
                                                </TabPanel>
                                                <TabPanel value={value} index={2}>
                                                    <Box component="div" className={classes.itemCard}>
                                                        {createdLoading ? Array(8).fill(<Skeleton />)
                                                            :
                                                            created.map(e => <Cards data={e} key={e._id} type={"onsale"} />)
                                                        }

                                                    </Box>
                                                </TabPanel>
                                                <TabPanel value={value} index={3}>
                                                    <Box component="div" className={classes.itemCard}>
                                                        {collectionLoading ? Array(8).fill(<Skeleton />)
                                                            :
                                                            collection.map(e => <CollectionCard data={e} key={e._id} type={"collection"} />)
                                                        }
                                                    </Box>
                                                </TabPanel>
                                                <TabPanel value={value} index={4}>
                                                    <Box component="div" className={classes.itemCard}>
                                                        {/* <Cards />
                                        <Cards />
                                        <Cards />
                                        <Cards />
                                        <Cards />
                                        <Cards /> */}
                                                    </Box>
                                                </TabPanel>
                                            </Box>

                                        </Box>
                                    </>
                                )
                                : ''
                        }
                    </Container>
                    :
                    <><SigninRequest /></>

            }
        </>
    );
};

export default Item;
