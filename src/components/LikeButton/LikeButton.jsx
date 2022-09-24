import React from 'react'
import { Favorite } from '@mui/icons-material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const LikeButton = () => {
  return (
    <div><Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{"color":"red"}} />} sx={{width:"0.8em !important","margin":"2px"}}/></div>
  )
}

export default LikeButton