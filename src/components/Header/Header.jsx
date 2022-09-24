import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled, alpha } from '@mui/material/styles';
import { ButtonColor } from "../../colors/ButtonColor";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import { Container, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

import { TextFields } from '@mui/icons-material';
import ConnectButtonModal from '../ConnectButtonModal';
import { useWeb3React } from '@web3-react/core';
import Disconnect from '../Disconnect';
import { makeStyles } from "@mui/styles"
import { ToastContainer,toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    logoLg: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    logoSm: {
        display: "block",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        }
    },
    menuButton: {
        display: "none !important",
        [theme.breakpoints.down("md")]: {
            display: "block !important",
        }
    },
    searchSm: {
        display: "block !important",
        [theme.breakpoints.down("md")]: {
            display: "none !important",
        }
    },
    menus: {
         display: 'flex', alignItems: 'center', textAlign: 'center', "cursor": "pointer",
        [theme.breakpoints.down("md")]: {
            display: "none !important",
            fontSize:"2rem !important",
        }
    },
    headerResponsive: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center', 'justifyContent': 'space-around', "zIndex": "200",
        padding: "1rem 0",        
        width:"100vw",
        position:"fixed",
        top:"0rem",
        background: "#fff",
        [theme.breakpoints.down("md")]: {
            justifyContent: "space-between !important",
            height:"10vh",                        
        }
    },
    MobileSearch: {
        display: "none !important",
        [theme.breakpoints.down("md")]: {
            display: "block !important",
        }
    },
    MobileHeader: {
        display: "none",
        [theme.breakpoints.down("md")]: {
            display: "block",
            height:"90vh",
            width:"100%",
            background:"#fff",
            position:"fixed",   
            // top:"3rem",
            "zIndex":"30000",
            "textAlign":"left",            
        }
    },
}));

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Header = () => {
    const classes = useStyles();
    const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();
    const [anchorEl, setAnchorEl] = useState(null);
    const [hideMenu, setHideMenu] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const mobileMenu = async () => {
        if(hideMenu){
            setHideMenu(false);
        }else{
            setHideMenu(true);
        }
    }
    return (
        <Box component="div">
        
            <Box className={classes.headerResponsive}>
                <Link to="/" style={{ "textDecoration": "none", "color": "inherit" }}>
                    <Box component="div" className={classes.logoLg}>
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ "height": "56px", "width": "56px" }}
                        />
                    </Box>
                    <Box component="div" className={classes.logoSm}>
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ "height": "36px", "width": "36px" }}
                        />
                    </Box>
                </Link>

                <Search className={classes.searchSm}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        style={{ "borderRadius":
                         "20px", "border": "none", "backgroundColor": "rgba(4, 4, 5, 0.07)", 'color': 'rgb(110, 110, 110)' }}
                    />
                </Search>
                <Box className={classes.menus} >
                    <Typography
                        style={{ "backgroundImage": ButtonColor + " !important" }}
                        id="demo-customized-button"
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}

                        onClick={handleClick}
                        endicon={<KeyboardArrowDownIcon />}
                    >
                        Explore
                    </Typography>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} disableRipple>
                            All
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            Ethereum
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            Flow
                        </MenuItem>
                    </StyledMenu>
                    <Typography sx={{ minWidth: 100 }}>
                        <Link to="/item" style={{ "textDecoration": "none", "color": "inherit" }}>
                            My Profile
                        </Link>
                    </Typography>
                    <Typography sx={{ minWidth: 100 }}>Following</Typography>
                    <Typography sx={{ minWidth: 100 }}>Activity</Typography>
                    <Typography sx={{ minWidth: 100 }}>How it works</Typography>
                    <Typography
                        style={{ "backgroundImage": ButtonColor + " !important", "marginLeft": "1rem", "cursor": "pointer" }}
                        id="demo-customized-button"
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}

                        onClick={handleClick}
                        endicon={<KeyboardArrowDownIcon />}
                    >
                        Community
                    </Typography>
                </Box>
                <Box className={classes.menus} >
                    <Link to="/mint" style={{ "textDecoration": "none", "color": "inherit" }}>
                        <Button variant="contained" style={{ "marginRight": "1rem" }}>Create</Button>
                    </Link>
                    <ConnectButtonModal />
                    {active && <Disconnect/>}

                </Box>

                {/* Mobile Menu */}
                <Box component="div" className={classes.MobileSearch}>
                    {/* <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper> */}
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        style={{ "borderRadius": "20px", "border": "none", "backgroundColor": "rgba(4, 4, 5, 0.07)", 'color': 'rgb(110, 110, 110)' }}
                    />
                </Box>
                <Box component="div" className={classes.menuButton}>
                    <IconButton

                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ "background": "transparent",p:0 }}
                        onClick={()=>mobileMenu()}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
                {/* Mobile Menu */}
            </Box>
            {hideMenu && (
            <Box className={classes.MobileHeader}>
                <Box sx={{ display: 'flex',"cursor": "pointer", "flexDirection": "column" }}>
                    <Typography
                        style={{ "backgroundImage": ButtonColor + " !important" }}
                        id="demo-customized-button"
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}

                        onClick={handleClick}
                        endicon={<KeyboardArrowDownIcon />}
                    >
                        Explore
                    </Typography>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} disableRipple>
                            All
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            Ethereum
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            Flow
                        </MenuItem>
                    </StyledMenu>
                    <Typography sx={{ minWidth: 100 }}>
                        <Link to="/item" style={{ "textDecoration": "none", "color": "inherit" }}>
                            My Profile
                        </Link>
                    </Typography>
                    <Typography sx={{ minWidth: 100 }}>Following</Typography>
                    <Typography sx={{ minWidth: 100 }}>Activity</Typography>
                    <Typography sx={{ minWidth: 100 }}>How it works</Typography>
                    <Typography
                        style={{ "backgroundImage": ButtonColor + " !important", "marginLeft": "1rem", "cursor": "pointer" }}
                        id="demo-customized-button"
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}

                        onClick={handleClick}
                        endicon={<KeyboardArrowDownIcon />}
                    >
                        Community
                    </Typography>
                </Box>
                <Box className={classes.menus} >
                    <Link to="/mint" style={{ "textDecoration": "none", "color": "inherit" }}>
                        <Button variant="contained" style={{ "marginRight": "1rem" }}>Create</Button>
                    </Link>
                    <ConnectButtonModal />
                    {active && <Button variant='container' style={{ "color": "#fff" }} onClick={() => deactivate()}>Sign out</Button>}

                </Box>                
            </Box>
            )}
        </Box>
    )
}

export default Header
