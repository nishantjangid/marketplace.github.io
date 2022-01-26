import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Image1 from "../../images/image1.png";

import AvatarGroup from '@mui/material/AvatarGroup';
import { Favorite, HeartBroken } from '@mui/icons-material';
import { Box } from '@mui/material';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Cards = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ maxWidth: 250 }}>
      <Box sx={{"display":"flex","flexDirection":"row","alignItems":"center","justifyContent":"space-between","padding":"10px 16px"}}>
          <AvatarGroup max={3}>
            <Avatar alt="Remy Sharp" src={Image1} />
            <Avatar alt="Travis Howard" src={Image1} />
            <Avatar alt="Cindy Baker" src={Image1} />
          </AvatarGroup>       
            <MoreHorizIcon />          
        </Box>
      <CardMedia
        component="img"
        height="200"
        image={Image1}
        alt="Paella dish"

      >
      </CardMedia>
      <CardContent sx={{"display":"flex","flexDirection":"column"}}>
        <Typography variant="div" color="text.dark">NAME OF NFT</Typography>
        <Typography variant="div" color="text.dark">Highest Bid 1/1</Typography>
        <Box sx={{"display":"flex","flexDirection":"row","alignItems":"center","justifyContent":"space-between"}}>
          <Typography variant="div" color="text.dark">0.0454 ETH</Typography>
          <Box sx={{"display":"flex","alignItems":"center"}}>
            <Favorite />
            <Typography >0</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Cards;
