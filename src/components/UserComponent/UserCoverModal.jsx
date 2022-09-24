import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Edit } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import axios, { Axios } from 'axios';
import { API_URL } from '../../utils/Constant';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderStyle: 'solid',
    borderColor: 'rgb(22, 22, 26)',
    border: 'none',
    boxShadow: 'rgb(27 32 50 / 10%) 0px 10px 60px',
    color: 'rgb(22, 22, 26)',   
    backdropFilter: 'blur(20px)',
    background: 'rgba(255, 255, 255, 0.7)',
    p: 4,
  };

const UserCoverModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const accountInfo = useSelector(state => state.accountInfo);
    
    const handleCoverUplaod = async (e) => {
      e.preventDefault(0);
      const image = e.target.image.files[0];
      if(!image){
        toast.warning("Please select a file!");
        return false; 
      }

      try{
        var data = new FormData();
        data.append("image", image);     
        axios.post(`${API_URL}/nft/user/updateCover/${accountInfo.accountId}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
          if(response.data.code == 200){
            toast.success(response.data.message);
            setOpen(false)
          }else{
            toast.warning(response.data.message);
            setOpen(false)
          }
        })  
        .catch(console.log);
      }catch(err){
        toast.error(err.message);
      }

    }
  return (
    <div>      
      <Button onClick={handleOpen} style={{ "textTransform": "none !important", "position": "absolute", "bottom": "10px", "right": "10px" }} variant="contained" endIcon={<Edit />}>Edit Cover</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleCoverUplaod}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{"textAlign":"center","fontWeight":"bold"}}>
            Update Cover Image
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField fullWidth id="fullWidth" type="file" name="image" required/>
          </Typography>
          <Box>
            <Button type="submit" fullWidth sx={{"color":"#fff",mt:"1rem"}}>Upload File</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default UserCoverModal