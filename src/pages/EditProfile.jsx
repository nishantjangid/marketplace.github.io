import { LoadingButton } from '@mui/lab'
import { Container, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useWeb3React } from '@web3-react/core'
import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../utils/Constant'
const inputStyle = {
    "width": "100%",
    "marginBottom": "1rem"
}

const reducer = (state,{type,payload}) => {
    switch(type){
        case "NAME":
            return {...state,name : {value:payload}};
        case "BIO":
            return {...state,bio : {value:payload}};
        case "EMAIL":
            return {...state,email : {value:payload}};
        case "TWITTER":
            return {...state,twitter : {value:payload}};
        case "INSTAGRAM":
            return {...state,instagram : {value:payload}};
        case "FACEBOOK":
            return {...state,facebook : {value:payload}};
    }
};

const initialValues = {
    name:{
        value:""
    },
    bio:{
        value:""
    },
    email:{
        value:""
    },
    twitter:{
        value:""
    },
    instagram:{
        value:""
    },
    facebook:{
        value:""
    }    
}

const EditProfile = () => {
    const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();
    const [state,dispatch] = useReducer(reducer,initialValues);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(state);
        let name = e.target.name.value;
        let bio = e.target.bio.value;
        let email = e.target.email.value;
        let twitter = e.target.twitter.value;
        let insta = e.target.instagram.value;        
        let facebook = e.target.facebook.value;        
        let image = e.target.image.files[0];

        if(active === true){
            setLoading(true);
            var data = new FormData();
            data.append("name",name);
            data.append("bio",bio);
            data.append("email",email);                    
            data.append("twitter",twitter);                    
            data.append("instagram",insta);                    
            data.append("facebook",facebook);                    
            data.append("image",image);                    
            data.append("address",account);                    

            axios.post(`${API_URL}/nft/addUser`,data,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                }
            })
            .then(response=>{
                console.log(response);
                if(response.data.code == 200){    
                    setLoading(false);            
                    toast.success(response.data.message);
                }else{
                    setLoading(false);                    
                    toast.error(response.data.message);
                }
            })  
            .catch(err=>{
                
                toast.error(err.message);
            }); 
        }else{
            toast.warning("Please connect your wallet");
        }

     }

     const handleInput = (e,name) => {
        switch(name){
            case 'name': 
             dispatch({type:"NAME",payload:e.target.value });
             break;
            case 'bio': 
             dispatch({type:"BIO",payload:e.target.value });
             break;
            case 'email': 
             dispatch({type:"EMAIL",payload:e.target.value });
             break;
            case 'twitter': 
             dispatch({type:"TWITTER",payload:e.target.value });
             break;
            case 'instagram': 
             dispatch({type:"INSTAGRAM",payload:e.target.value });
             break;
            case 'facebook': 
             dispatch({type:"FACEBOOK",payload:e.target.value });
             break;
        }
     }

    const userDetails = async () => {
        await axios.get(`${API_URL}/nft/userDetails/${account}`,{
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
        .then(response =>{
            
            if(response.data.code == 200){      
                dispatch({type:"NAME",payload:response.data.message[0].name });          
                dispatch({type:"BIO",payload:response.data.message[0].name });
                dispatch({type:"EMAIL",payload:response.data.message[0].email });
                dispatch({type:"TWITTER",payload:response.data.message[0].twitter });
                dispatch({type:"INSTAGRAM",payload:response.data.message[0].instagram });
                dispatch({type:"FACEBOOK",payload:response.data.message[0].facebook });
                
            }else if(response.data.code == 500){
                console.log(response.data.message)
            }
        })
        .catch((err)=>{
            console.log(err);
        })  
    }

useEffect(async ()=>{
    if(active === true){
        userDetails();
    }
},[account],[]);     

    return (
        <Container maxWidth="md" >
            <ToastContainer />
            <Grid container spacing={2}>
                <Grid item lg={8} md={8} xs={12}>
                    <Box component="form" encType="multipart/form-data" sx={{ "width": "100%", d: "flex", alignItems: "center", justifyContent: "center", margin: "5rem 0rem" }} onSubmit={handleSubmit}>
                        <Typography variant='h3' style={{ "fontWeight": "600" }}>
                            Edit Profile
                        </Typography>
                        <Typography variant='h6' style={{ "margin": "1rem 0", "color": "rgb(110, 110, 110)", "fontWeight": "500" }}>
                            You can set preferred display name, create your branded profile URL and manage other personal settings
                        </Typography>
                        <TextField fullWidth style={inputStyle} type="text" id="standard-basic" label="Display Name" name="name" variant="standard" value={state.name.value} onChange={(e)=>handleInput(e,"name")} required />
                        <TextField fullWidth style={inputStyle} type="text" label="Bio" name="bio" variant="standard" value={state.bio.value} onChange={(e)=>handleInput(e,"bio")} required />
                        <TextField fullWidth style={inputStyle} type="email" label="Email" name="email" variant="standard" value={state.email.value} onChange={(e)=>handleInput(e,"email")} required />
                        <TextField fullWidth style={inputStyle} type="text" label="Twitter" name="twitter" variant="standard" value={state.twitter.value} onChange={(e)=>handleInput(e,"twitter")} required />
                        <TextField fullWidth style={inputStyle} type="text  " label="Instagram" name="instagram" variant="standard" value={state.instagram.value} onChange={(e)=>handleInput(e,"instagram")} required />
                        <TextField fullWidth style={inputStyle} type="text  " label="Facebook" name="facebook" variant="standard" value={state.facebook.value} onChange={(e)=>handleInput(e,"facebook")} required />
                        <TextField fullWidth style={inputStyle} type="file" name="image" />
                        <Box component="div" sx={{ "textAlign": "center", mt: 1 }}>
                            <LoadingButton type="submit" variant="contained" loading={loading} loadingPosition="center">Update Profile</LoadingButton>
                        </Box>
                    </Box>

                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                   
                </Grid>
            </Grid>
        </Container>
    )
}

export default EditProfile