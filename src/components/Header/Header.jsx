import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';

import Typography from '@mui/material/Typography';
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
    const {connector, library, chainId, account, activate, deactivate, active, error} = useWeb3React();   
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    async function disconnect() {
        try {
          deactivate()
        } catch (ex) {
          console.log(ex)
        }
    }    
    return (
        <Container maxWidth="xl">
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' ,'justifyContent':'space-around'}}>
            <Link   to="/" style={{"textDecoration":"none","color":"inherit"}}>

                <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 56, height: 56 }}
                />
            </Link>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        style={{"borderRadius":"20px","border":"none","backgroundColor":"rgba(4, 4, 5, 0.07)",'color':'rgb(110, 110, 110)'}}
                    />
                </Search>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center',"cursor":"pointer" }}>
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
                    <Link   to="/item" style={{"textDecoration":"none","color":"inherit"}}>
                        My Profile
                    </Link>
                    </Typography>
                    <Typography sx={{ minWidth: 100 }}>Following</Typography>
                    <Typography sx={{ minWidth: 100 }}>Activity</Typography>
                    <Typography sx={{ minWidth: 100 }}>How it works</Typography>
                    <Typography
                        style={{ "backgroundImage": ButtonColor + " !important","marginLeft":"1rem","cursor":"pointer" }}
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
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                <Link   to="/mint" style={{"textDecoration":"none","color":"inherit"}}>
                    <Button variant="contained" style={{"marginRight":"1rem"}}>Create</Button>
                </Link>
                    <ConnectButtonModal />
                     {active && <Button variant='container' style={{"color":"#fff"}} onClick={()=>disconnect()}>Disconnect</Button>}
                    
                </Box>
            </Box>
        </Container>
    )
}

export default Header
